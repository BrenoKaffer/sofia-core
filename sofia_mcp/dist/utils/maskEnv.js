const SENSITIVE_KEYS = ["PASSWORD", "SECRET", "TOKEN", "KEY", "PASS", "PRIVATE"];
export const maskEnv = (envList) => {
    if (!envList || envList.length === 0) {
        return {};
    }
    return envList.reduce((acc, entry) => {
        const [rawKey, ...rest] = entry.split("=");
        const key = (rawKey || "").trim();
        const value = rest.join("=");
        if (!key) {
            return acc;
        }
        const upperKey = key.toUpperCase();
        const isSensitive = SENSITIVE_KEYS.some((token) => upperKey.includes(token));
        acc[key] = isSensitive ? "****" : value;
        return acc;
    }, {});
};
