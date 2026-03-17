import { buildApiUrl } from '../utils/api';
function createRequestId() {
    if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
        return crypto.randomUUID();
    }
    return `req_${Math.random().toString(36).slice(2)}${Date.now().toString(36)}`;
}
async function safeJson(res) {
    try {
        const ct = res.headers.get('content-type') || '';
        if (ct.includes('application/json'))
            return await res.json();
        const text = await res.text();
        try {
            return JSON.parse(text);
        }
        catch {
            return text ? { message: text } : null;
        }
    }
    catch {
        return null;
    }
}
export function createSofiaClient(options = {}) {
    const fetcher = options.fetcher || fetch;
    const request = async (pathOrUrl, init = {}) => {
        const url = buildApiUrl(pathOrUrl, options.baseUrl);
        const headers = new Headers(init.headers);
        const body = init.body;
        const isFormDataBody = typeof FormData !== 'undefined' && body instanceof FormData;
        if (!headers.has('Content-Type') && !isFormDataBody)
            headers.set('Content-Type', 'application/json');
        const reqId = options.requestId || headers.get('X-Request-Id') || createRequestId();
        headers.set('X-Request-Id', reqId);
        headers.set('X-Correlation-Id', reqId);
        if (options.headers) {
            Object.entries(options.headers).forEach(([key, value]) => {
                if (!headers.has(key))
                    headers.set(key, value);
            });
        }
        if (!headers.has('Authorization') && options.getToken) {
            const token = await options.getToken();
            if (token)
                headers.set('Authorization', `Bearer ${token}`);
        }
        const controller = !init.signal && typeof AbortController !== 'undefined' ? new AbortController() : null;
        const timeoutMs = typeof options.timeoutMs === 'number' ? options.timeoutMs : 15000;
        const timer = controller ? setTimeout(() => controller.abort(), timeoutMs) : null;
        try {
            return await fetcher(url, { ...init, headers, signal: init.signal || controller?.signal });
        }
        finally {
            if (timer)
                clearTimeout(timer);
        }
    };
    const requestJson = async (pathOrUrl, init = {}) => {
        try {
            const res = await request(pathOrUrl, init);
            const data = (await safeJson(res));
            return {
                ok: res.ok,
                status: res.status,
                data,
                request_id: res.headers.get('x-request-id') || res.headers.get('request-id') || null
            };
        }
        catch (error) {
            return {
                ok: false,
                status: 0,
                data: error?.message ? { message: error.message } : null,
                request_id: null
            };
        }
    };
    return {
        request,
        requestJson,
        auth: {
            login: (body) => requestJson('/auth/login', {
                method: 'POST',
                body: JSON.stringify(body)
            }),
            register: (body) => requestJson('/auth/register', {
                method: 'POST',
                body: JSON.stringify(body)
            }),
            recoverPassword: (body) => requestJson('/auth/recover-password', {
                method: 'POST',
                body: JSON.stringify(body)
            })
        },
        billing: {
            createCheckoutLink: (body) => requestJson('/billing/checkout-link', {
                method: 'POST',
                body: JSON.stringify(body)
            }),
            getCheckoutLinkStatus: (linkId) => requestJson(`/billing/checkout-link-status/${encodeURIComponent(linkId)}`)
        },
        payments: {
            createPix: (body) => requestJson('/payments/create-pix', {
                method: 'POST',
                body: JSON.stringify(body)
            }),
            verifyPix: (params) => requestJson(`/payments/create-pix?order_id=${encodeURIComponent(params.order_id)}`, {
                method: 'PUT'
            }),
            createSubscription: (body) => requestJson('/payments/create-subscription', {
                method: 'POST',
                body: JSON.stringify(body)
            })
        },
        partners: {
            me: () => requestJson('/partners/me'),
            links: () => requestJson('/partners/me/links'),
            quickLinks: () => requestJson('/partners/me/quick-links')
        },
        automation: {
            listStrategies: (query = {}) => {
                const search = new URLSearchParams();
                if (query.table_id)
                    search.set('table_id', query.table_id);
                if (query.status)
                    search.set('status', query.status);
                const suffix = search.toString();
                const path = suffix ? `/strategies?${suffix}` : '/strategies';
                return requestJson(path);
            },
            createStrategy: (body) => requestJson('/strategies', {
                method: 'POST',
                body: JSON.stringify(body)
            }),
            updateStrategyStatus: (id, body) => requestJson(`/strategies/${encodeURIComponent(id)}/status`, {
                method: 'PUT',
                body: JSON.stringify(body)
            })
        },
        system: {
            health: () => requestJson('/health')
        }
    };
}
