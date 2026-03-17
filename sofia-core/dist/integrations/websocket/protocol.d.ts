export declare const WEBSOCKET_CHANNELS: {
    readonly ROULETTE_RESULTS: "roulette_results";
    readonly AI_SIGNALS: "ai_signals";
    readonly SYSTEM_STATUS: "system_status";
    readonly USER_NOTIFICATIONS: "user_notifications";
    readonly LIVE_METRICS: "live_metrics";
    readonly AUTOMATION_NOTIFICATIONS: "automation_notifications";
    readonly BETTING_UPDATES: "betting_updates";
    readonly SESSION_EVENTS: "session_events";
    readonly CASINO_BALANCE: "casino_balance";
};
export type WebSocketChannel = typeof WEBSOCKET_CHANNELS[keyof typeof WEBSOCKET_CHANNELS];
export type WebSocketClientEvent = {
    type: 'ping';
    timestamp?: number;
} | {
    type: 'auth';
    token: string;
} | {
    type: 'subscribe';
    channel: WebSocketChannel | string;
} | {
    type: 'unsubscribe';
    channel: WebSocketChannel | string;
} | {
    type: 'automation_command';
    command: string;
    data?: unknown;
};
export type WebSocketServerEvent = {
    type: 'pong';
    timestamp: number;
} | {
    type: 'ack';
    data: {
        subscribed?: string;
        unsubscribed?: string;
        received?: boolean;
        timestamp?: string;
    };
} | {
    type: 'error';
    data: {
        message: string;
    };
} | {
    type: 'data';
    channel: string;
    data: unknown;
} | {
    type: 'signal';
    data: unknown;
} | {
    type: 'kpi';
    data: unknown;
} | {
    type: 'roulette_status';
    data: unknown;
};
export type WebSocketMessage = WebSocketClientEvent | WebSocketServerEvent;
