export const WEBSOCKET_CHANNELS = {
  ROULETTE_RESULTS: 'roulette_results',
  AI_SIGNALS: 'ai_signals',
  SYSTEM_STATUS: 'system_status',
  USER_NOTIFICATIONS: 'user_notifications',
  LIVE_METRICS: 'live_metrics',
  AUTOMATION_NOTIFICATIONS: 'automation_notifications',
  BETTING_UPDATES: 'betting_updates',
  SESSION_EVENTS: 'session_events',
  CASINO_BALANCE: 'casino_balance'
} as const

export type WebSocketChannel = typeof WEBSOCKET_CHANNELS[keyof typeof WEBSOCKET_CHANNELS]

export type WebSocketClientEvent =
  | { type: 'ping'; timestamp?: number }
  | { type: 'auth'; token: string }
  | { type: 'subscribe'; channel: WebSocketChannel | string }
  | { type: 'unsubscribe'; channel: WebSocketChannel | string }
  | { type: 'automation_command'; command: string; data?: unknown }

export type WebSocketServerEvent =
  | { type: 'pong'; timestamp: number }
  | { type: 'ack'; data: { subscribed?: string; unsubscribed?: string; received?: boolean; timestamp?: string } }
  | { type: 'error'; data: { message: string } }
  | { type: 'data'; channel: string; data: unknown }
  | { type: 'signal'; data: unknown }
  | { type: 'kpi'; data: unknown }
  | { type: 'roulette_status'; data: unknown }

export type WebSocketMessage = WebSocketClientEvent | WebSocketServerEvent
