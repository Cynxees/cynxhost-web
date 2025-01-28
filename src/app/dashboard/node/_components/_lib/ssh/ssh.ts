import { Client } from "ssh2";

let sshClient: Client | null = null;

export function getSSH() {
  return sshClient;
}

export async function connectSSH() {
  if (!sshClient) {
    sshClient = new Client();
    sshClient.connect({
      host: "your-host",
      port: 22,
      username: "user",
      password: "password",
    });
  }
  return sshClient;
}

export async function disconnectSSH() {
  if (sshClient) {
    sshClient.end();
    sshClient = null;
  }
}
