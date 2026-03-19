export const LOGICAL_CONTAINERS = ["backend", "worker", "websocket"];
const envMap = {
    backend: "SOFIA_CONTAINER_BACKEND",
    worker: "SOFIA_CONTAINER_WORKER",
    websocket: "SOFIA_CONTAINER_WEBSOCKET"
};
const defaultAliases = {
    backend: ["sofia-backend", "estruturas_sofia-backend"],
    worker: ["sofia-worker", "estruturas_sofia-worker"],
    websocket: ["sofia-websocket", "estruturas_sofia-websocket"]
};
const normalizeAliases = (container) => {
    const envAlias = process.env[envMap[container]];
    const aliases = envAlias ? [envAlias, ...defaultAliases[container]] : defaultAliases[container];
    const unique = new Set(aliases.map((alias) => alias.trim()).filter(Boolean));
    return Array.from(unique);
};
export const CONTAINER_ALIASES = {
    backend: normalizeAliases("backend"),
    worker: normalizeAliases("worker"),
    websocket: normalizeAliases("websocket")
};
export const LOGICAL_CONTAINER_SET = new Set(LOGICAL_CONTAINERS);
