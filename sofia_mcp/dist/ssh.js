import { Client } from "ssh2";
import fs from "node:fs";
const getRequiredEnv = (key) => {
    const value = process.env[key];
    if (!value) {
        throw new Error(`Missing env ${key}`);
    }
    return value;
};
const getPrivateKey = () => {
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
    }
    catch {
        return null;
    }
};
const getPassword = () => {
    return process.env.SOFIA_SSH_PASSWORD || null;
};
export const runSshCommand = async (command, timeoutMs) => {
    const host = getRequiredEnv("SOFIA_SSH_HOST");
    const username = getRequiredEnv("SOFIA_SSH_USER");
    const port = Number(process.env.SOFIA_SSH_PORT || 22);
    const effectiveTimeout = timeoutMs ?? Number(process.env.SOFIA_SSH_TIMEOUT_MS || 10000);
    return await new Promise((resolve, reject) => {
        const client = new Client();
        let resolved = false;
        let stdout = "";
        let stderr = "";
        let exitCode = null;
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
            client.exec(command, (err, stream) => {
                if (err) {
                    clearTimeout(timer);
                    reject(err);
                    return;
                }
                stream
                    .on("close", (code) => {
                    exitCode = code;
                    clearTimeout(timer);
                    finish();
                })
                    .on("data", (data) => {
                    stdout += data.toString("utf-8");
                })
                    .stderr.on("data", (data) => {
                    stderr += data.toString("utf-8");
                });
            });
        })
            .on("error", (err) => {
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
