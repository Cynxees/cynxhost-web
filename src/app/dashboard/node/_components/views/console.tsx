"use client";

import {
  CreateSession,
  SendCommand,
} from "@/app/_lib/services/node/consoleService";
import { PersistentNode } from "@/types/entity/entity";
import { Button, Divider, Input } from "@heroui/react";
import { useEffect, useState } from "react";

type Props = {
  node: PersistentNode;
};

export default function ConsoleView({ node }: Props) {
  const [logs, setLogs] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  const [sessionId, setSessionId] = useState<string | null>(null);
  const [command, setCommand] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      console.log("Creating session for node", node.ServerAlias);
      const sessionResponse = await CreateSession(node.ServerAlias);

      if (!sessionResponse.data) {
        console.error("Failed to create session");
        return;
      }

      setSessionId(sessionResponse.data?.SessionId);

      const cleanup = connectToWebsocket(sessionResponse.data?.SessionId);

      return () => {
        cleanup();
      };
    };

    fetchData();
  }, []);

  const connectToWebsocket = (sessionId: string) => {
    const socket = new WebSocket(
      `wss://${node.ServerAlias}.cynx.buzz/ws/api/v1/persistent-node/logs?id=${sessionId}`
    );

    socket.onopen = () => {
      console.log("WebSocket connected");
    };

    socket.onmessage = (event) => {
      console.log("Message from server:", event.data);
      setLogs((prevLogs) => [...prevLogs, event.data]);
    };

    socket.onclose = () => {
      console.log("WebSocket closed");
    };

    return () => {
      socket.close();
    };
  };

  const onClickSendCommand = async () => {
    console.log("Sending command", command);

    setLogs((prevLogs) => [...prevLogs, `> ${command}`]); 

    if (!sessionId) {
      console.error("Session ID is not set");
      return;
    }

    // Send command to server
    const response = await SendCommand(node.ServerAlias, {
      command: command,
      sessionId: sessionId,
      isBase64Encoded: false,
    });
  };

  return (
    <div>
      <p>Node ID: {node.Id}</p>
      <p>Node Name: {node.Name}</p>

      <h2>Logs</h2>
      <div>
        {logs.map((log, index) => (
          <div key={index}>{log}</div>
        ))}
      </div>

      <Divider></Divider>
      <Input
        type="text"
        value={command}
        onChange={(e) => setCommand(e.target.value)}
        onKeyPress={(e) => {
          if (e.key === "Enter") {
            onClickSendCommand();
          }
        }}
      />
      <Button onPress={onClickSendCommand}>Send Command</Button>
    </div>
  );
}
