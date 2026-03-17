export function normalizeApiBase(value) {
    const trimmed = String(value ?? '').trim().replace(/\/+$/, '');
    if (!trimmed)
        return '';
    return trimmed.endsWith('/api') ? trimmed.slice(0, -4) : trimmed;
}
export function getApiBase(envOverride) {
    const raw = envOverride ??
        process.env.NEXT_PUBLIC_API_URL ??
        process.env.INTERNAL_API_BASE_URL ??
        process.env.SOFIA_BACKEND_URL ??
        process.env.BACKEND_URL;
    return normalizeApiBase(raw);
}
export function ensureLeadingSlash(value) {
    if (!value)
        return '';
    return value.startsWith('/') ? value : `/${value}`;
}
export function buildApiUrl(pathOrUrl, baseOverride) {
    const input = String(pathOrUrl ?? '').trim();
    if (!input)
        return input;
    if (/^https?:\/\//i.test(input))
        return input;
    const base = getApiBase(baseOverride);
    const path = ensureLeadingSlash(input);
    if (!base)
        return path;
    return `${base}${path}`;
}
