"use client";

import { useEffect, useRef, useState } from "react";
import { Terminal } from "@xterm/xterm";
import { FitAddon } from "xterm-addon-fit";
import "xterm/css/xterm.css"; // Add xterm CSS for styling
import { Button } from "@heroui/react";
import {
  CreateSession,
  SendCommand,
} from "@/app/_lib/services/node/consoleService";
import { useNode } from "@/app/_lib/hooks/useNode";

type Props = {};

export default function ConsolePage({}: Props) {
  const [sessionId, setSessionId] = useState<string | null>(null);

  const wsRef = useRef<WebSocket | null>(null);
  const xtermRef = useRef<HTMLDivElement | null>(null);
  const xterm = useRef<Terminal | null>(null);
  const inputRef = useRef<string>("");

  const node = useNode().state.node;

  // Initialize the terminal
  useEffect(() => {
    if (!xtermRef.current) return;

    xterm.current = new Terminal({
      cursorBlink: true,
      theme: {
        background: "#000000",
        foreground: "#ffffff",
      },
      convertEol: true,
      allowTransparency: true,
    });

    const fitAddon = new FitAddon();
    xterm.current.loadAddon(fitAddon);
    xterm.current.open(xtermRef.current);
    fitAddon.fit();

    // Handle user input
    xterm.current.onData(async (data) => {
      if (!sessionId) return;

      console.log("Sending command:", data);
      await SendCommand(node.ServerAlias, {
        command: data,
        sessionId,
        isBase64Encoded: true,
      });
    });

    return () => {
      xterm.current?.dispose();
    };
  }, [sessionId]);

  // Function to initialize session
  const initializeSession = async () => {
    console.log("Creating session for node", node.ServerAlias);
    const sessionResponse = await CreateSession(node.ServerAlias, {
      shell: "bash",
    });

    if (!sessionResponse.data) {
      console.error("Failed to create session");
      return;
    }

    const newSessionId = sessionResponse.data.SessionId;
    setSessionId(newSessionId);
    connectToWebsocket(newSessionId);
  };

  // Connect to WebSocket
  const connectToWebsocket = (sessionId: string) => {
    if (wsRef.current) {
      wsRef.current.close();
    }

    const socket = new WebSocket(
      `wss://${node.ServerAlias}.cynx.buzz/ws/api/v1/persistent-node/logs?id=${sessionId}`
    );

    socket.onopen = () => console.log("WebSocket connected");
    socket.onmessage = (event) => {
      try {
        const decodedData = atob(event.data); // Decode base64
        xterm.current?.write(decodedData);
      } catch (error) {
        console.error("Failed to decode base64 data:", error);
      }
    };

    socket.onclose = () => console.log("WebSocket closed");

    wsRef.current = socket;
  };

  // Cleanup WebSocket on unmount
  useEffect(() => {
    return () => {
      wsRef.current?.close();
    };
  }, []);

  return (
    <div>
      <p>Node ID: {node.Id}</p>
      <p>Node Name: {node.Name}</p>
      <Button onPress={initializeSession} disabled={!!sessionId}>
        Start Session
      </Button>

      <div
        ref={xtermRef}
        style={{ height: "400px", width: "100%", background: "black" }}
      />
    </div>
  );
}
