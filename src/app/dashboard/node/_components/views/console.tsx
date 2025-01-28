"use client";

import { PersistentNode } from "@/types/entity/entity";
import { useState } from "react";

type Props = {
  node: PersistentNode;
};

export default function ConsoleView({ node }: Props) {
  const [output, setOutput] = useState<string>("");
  const [command, setCommand] = useState<string>("");
  const [connected, setConnected] = useState<boolean>(false);

  const connectToSSH = async () => {
    try {
      const response = await fetch(`/api/ssh/connect`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nodeId: node.Id }),
      });

      if (response.ok) {
        setConnected(true);
        setOutput("Connected to SSH server.");
      } else {
        const data = await response.json();
        setOutput(`Failed to connect: ${data.message}`);
      }
    } catch (error) {
      setOutput(`Connection error: ${error}`);
    }
  };

  const disconnectSSH = async () => {
    try {
      const response = await fetch(`/api/ssh/disconnect`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nodeId: node.Id }),
      });

      if (response.ok) {
        setConnected(false);
        setOutput("Disconnected from SSH server.");
      } else {
        const data = await response.json();
        setOutput(`Failed to disconnect: ${data.message}`);
      }
    } catch (error) {
      setOutput(`Disconnection error: ${error}`);
    }
  };

  const executeCommand = async () => {
    try {
      const response = await fetch(`/api/ssh/execute`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nodeId: node.Id, command }),
      });

      const data = await response.json();
      if (response.ok) {
        setOutput(data.output || "Command executed with no output.");
      } else {
        setOutput(`Command failed: ${data.message}`);
      }
    } catch (error) {
      setOutput(`Execution error: ${error}`);
    }
  };

  return (
    <div>
      <h2>Console</h2>
      {connected ? <p>Status: Connected</p> : <p>Status: Disconnected</p>}
      <button onClick={connectToSSH} disabled={connected}>
        Connect
      </button>
      <button onClick={disconnectSSH} disabled={!connected}>
        Disconnect
      </button>
      <br />
      <input
        type="text"
        value={command}
        onChange={(e) => setCommand(e.target.value)}
        placeholder="Enter command"
        disabled={!connected}
      />
      <button onClick={executeCommand} disabled={!connected}>
        Execute
      </button>
      <div>
        <h3>Output:</h3>
        <pre>{output}</pre>
      </div>
    </div>
  );
}
