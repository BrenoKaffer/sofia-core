import { Client, type ClientChannel } from "ssh2";
import fs from "node:fs";

type SshResult = {
  stdout: string;
  stderr: string;
  exitCode: number | null;
};

const getRequiredEnv = (key: string): string => {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Missing env ${key}`);
  }
  return value;
};

const getPrivateKey = (): Buffer | string | null => {
  const directKey = process.env.SOFIA_SSH_PRIVATE_KEY;
  if (directKey) {
    return directKey;
  }
  const keyPath = process.env.SOFIA_SSH_PRIVATE_KEY_PATH;
  if (!keyPath) {
    return null;
  }
  try {
    return fs.readFileSync(keyPath);
  } catch {
    return null;
  }
};

const getPassword = (): string | null => {
  return process.env.SOFIA_SSH_PASSWORD || null;
};

export const runSshCommand = async (command: string, timeoutMs?: number): Promise<SshResult> => {
  const host = getRequiredEnv("SOFIA_SSH_HOST");
  const username = getRequiredEnv("SOFIA_SSH_USER");
  const port = Number(process.env.SOFIA_SSH_PORT || 22);
  const effectiveTimeout = timeoutMs ?? Number(process.env.SOFIA_SSH_TIMEOUT_MS || 10000);

  return await new Promise<SshResult>((resolve, reject) => {
    const client = new Client();
    let resolved = false;
    let stdout = "";
    let stderr = "";
    let exitCode: number | null = null;

    const finish = () => {
      if (resolved) {
        return;
      }
      resolved = true;
      client.end();
      resolve({ stdout, stderr, exitCode });
    };

    const timer = setTimeout(() => {
      if (resolved) {
        return;
      }
      resolved = true;
      client.end();
      reject(new Error("SSH command timeout"));
    }, effectiveTimeout);

    const privateKey = getPrivateKey();
    const password = getPassword();

    if (!privateKey && !password) {
      clearTimeout(timer);
      reject(new Error("Missing SSH auth: private key or password"));
      return;
    }

    client
      .on("ready", () => {
        client.exec(command, (err: Error | undefined, stream: ClientChannel) => {
          if (err) {
            clearTimeout(timer);
            reject(err);
            return;
          }

          stream
            .on("close", (code: number | null) => {
              exitCode = code;
              clearTimeout(timer);
              finish();
            })
            .on("data", (data: Buffer) => {
              stdout += data.toString("utf-8");
            })
            .stderr.on("data", (data: Buffer) => {
              stderr += data.toString("utf-8");
            });
        });
      })
      .on("error", (err: Error) => {
        clearTimeout(timer);
        reject(err);
      })
      .connect({
        host,
        port,
        username,
        privateKey: privateKey ?? undefined,
        passphrase: process.env.SOFIA_SSH_PRIVATE_KEY_PASSPHRASE,
        password: password ?? undefined
      });
  });
};
