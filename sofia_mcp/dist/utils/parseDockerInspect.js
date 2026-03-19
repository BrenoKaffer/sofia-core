export const parseDockerInspect = (raw) => {
    const trimmed = raw.trim();
    if (!trimmed) {
        return null;
    }
    const data = JSON.parse(trimmed);
    return data[0] ?? null;
};
