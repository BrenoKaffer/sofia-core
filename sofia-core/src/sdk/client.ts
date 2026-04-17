import {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
  PasswordRecoveryRequest,
  PasswordRecoveryResponse,
  CreateSubscriptionRequest,
  CreateSubscriptionResponse,
  PartnerMeResponse,
  PartnerLinksResponse,
  PartnerQuickLinksResponse,
  StrategyListQuery,
  StrategyListResponse,
  CreateStrategyRequest,
  CreateStrategyResponse,
  UpdateStrategyStatusRequest,
  UpdateStrategyStatusResponse,
} from '../contracts'
import { buildApiUrl } from '../utils/api'

export type SofiaClientFetcher = typeof fetch

export interface SofiaClientOptions {
  baseUrl?: string
  timeoutMs?: number
  requestId?: string
  headers?: Record<string, string>
  fetcher?: SofiaClientFetcher
  getToken?: () => string | null | Promise<string | null>
}

export interface SofiaClientResult<T> {
  ok: boolean
  status: number
  data: T | null
  request_id: string | null
}

function createRequestId() {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return crypto.randomUUID()
  }
  return `req_${Math.random().toString(36).slice(2)}${Date.now().toString(36)}`
}

async function safeJson(res: Response) {
  try {
    const ct = res.headers.get('content-type') || ''
    if (ct.includes('application/json')) return await res.json()
    const text = await res.text()
    try {
      return JSON.parse(text)
    } catch {
      return text ? { message: text } : null
    }
  } catch {
    return null
  }
}

export function createSofiaClient(options: SofiaClientOptions = {}) {
  const fetcher = options.fetcher || fetch

  const request = async (pathOrUrl: string, init: RequestInit = {}): Promise<Response> => {
    const url = buildApiUrl(pathOrUrl, options.baseUrl)
    const headers = new Headers(init.headers as HeadersInit | undefined)
    const body = init.body as any
    const isFormDataBody = typeof FormData !== 'undefined' && body instanceof FormData
    if (!headers.has('Content-Type') && !isFormDataBody) headers.set('Content-Type', 'application/json')
    const reqId = options.requestId || headers.get('X-Request-Id') || createRequestId()
    headers.set('X-Request-Id', reqId)
    headers.set('X-Correlation-Id', reqId)
    if (options.headers) {
      Object.entries(options.headers).forEach(([key, value]) => {
        if (!headers.has(key)) headers.set(key, value)
      })
    }
    if (!headers.has('Authorization') && options.getToken) {
      const token = await options.getToken()
      if (token) headers.set('Authorization', `Bearer ${token}`)
    }
    const controller = !init.signal && typeof AbortController !== 'undefined' ? new AbortController() : null
    const timeoutMs = typeof options.timeoutMs === 'number' ? options.timeoutMs : 15000
    const timer = controller ? setTimeout(() => controller.abort(), timeoutMs) : null
    try {
      return await fetcher(url, { ...init, headers, signal: init.signal || controller?.signal })
    } finally {
      if (timer) clearTimeout(timer)
    }
  }

  const requestJson = async <T>(pathOrUrl: string, init: RequestInit = {}): Promise<SofiaClientResult<T>> => {
    try {
      const res = await request(pathOrUrl, init)
      const data = (await safeJson(res)) as T | null
      return {
        ok: res.ok,
        status: res.status,
        data,
        request_id: res.headers.get('x-request-id') || res.headers.get('request-id') || null
      }
    } catch (error: any) {
      return {
        ok: false,
        status: 0,
        data: error?.message ? ({ message: error.message } as T) : null,
        request_id: null
      }
    }
  }

  return {
    request,
    requestJson,
    auth: {
      login: (body: LoginRequest) =>
        requestJson<LoginResponse>('/auth/login', {
          method: 'POST',
          body: JSON.stringify(body)
        }),
      register: (body: RegisterRequest) =>
        requestJson<RegisterResponse>('/auth/register', {
          method: 'POST',
          body: JSON.stringify(body)
        }),
      recoverPassword: (body: PasswordRecoveryRequest) =>
        requestJson<PasswordRecoveryResponse>('/auth/recover-password', {
          method: 'POST',
          body: JSON.stringify(body)
        })
    },
    payments: {
      createSubscription: (body: CreateSubscriptionRequest) =>
        requestJson<CreateSubscriptionResponse>('/payments/create-subscription', {
          method: 'POST',
          body: JSON.stringify(body)
        })
    },
    partners: {
      me: () => requestJson<PartnerMeResponse>('/partners/me'),
      links: () => requestJson<PartnerLinksResponse>('/partners/me/links'),
      quickLinks: () => requestJson<PartnerQuickLinksResponse>('/partners/me/quick-links')
    },
    automation: {
      listStrategies: (query: StrategyListQuery = {}) => {
        const search = new URLSearchParams()
        if (query.table_id) search.set('table_id', query.table_id)
        if (query.status) search.set('status', query.status)
        const suffix = search.toString()
        const path = suffix ? `/strategies?${suffix}` : '/strategies'
        return requestJson<StrategyListResponse>(path)
      },
      createStrategy: (body: CreateStrategyRequest) =>
        requestJson<CreateStrategyResponse>('/strategies', {
          method: 'POST',
          body: JSON.stringify(body)
        }),
      updateStrategyStatus: (id: string, body: UpdateStrategyStatusRequest) =>
        requestJson<UpdateStrategyStatusResponse>(`/strategies/${encodeURIComponent(id)}/status`, {
          method: 'PUT',
          body: JSON.stringify(body)
        })
    },
    system: {
      health: () => requestJson<Record<string, any>>('/health')
    }
  }
}
