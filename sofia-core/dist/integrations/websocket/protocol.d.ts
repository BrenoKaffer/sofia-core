import { z } from 'zod';
export declare const WEBSOCKET_CONTRACT_VERSION = "1.0.0";
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
    contract_version?: string;
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
export declare const SignalPredictionSchema: z.ZodObject<{
    number: z.ZodNumber;
    color: z.ZodEnum<["red", "black", "green"]>;
    confidence: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    number: number;
    color: "red" | "black" | "green";
    confidence: number;
}, {
    number: number;
    color: "red" | "black" | "green";
    confidence: number;
}>;
export declare const SignalItemSchema: z.ZodObject<{
    id: z.ZodUnion<[z.ZodString, z.ZodNumber]>;
    strategy: z.ZodString;
    table: z.ZodString;
    prediction: z.ZodObject<{
        number: z.ZodNumber;
        color: z.ZodEnum<["red", "black", "green"]>;
        confidence: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        number: number;
        color: "red" | "black" | "green";
        confidence: number;
    }, {
        number: number;
        color: "red" | "black" | "green";
        confidence: number;
    }>;
    timestamp: z.ZodString;
    status: z.ZodString;
}, "strip", z.ZodTypeAny, {
    status: string;
    id: string | number;
    strategy: string;
    table: string;
    prediction: {
        number: number;
        color: "red" | "black" | "green";
        confidence: number;
    };
    timestamp: string;
}, {
    status: string;
    id: string | number;
    strategy: string;
    table: string;
    prediction: {
        number: number;
        color: "red" | "black" | "green";
        confidence: number;
    };
    timestamp: string;
}>;
export declare const SignalsRecentSchema: z.ZodObject<{
    signals: z.ZodArray<z.ZodObject<{
        id: z.ZodUnion<[z.ZodString, z.ZodNumber]>;
        strategy: z.ZodString;
        table: z.ZodString;
        prediction: z.ZodObject<{
            number: z.ZodNumber;
            color: z.ZodEnum<["red", "black", "green"]>;
            confidence: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            number: number;
            color: "red" | "black" | "green";
            confidence: number;
        }, {
            number: number;
            color: "red" | "black" | "green";
            confidence: number;
        }>;
        timestamp: z.ZodString;
        status: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        status: string;
        id: string | number;
        strategy: string;
        table: string;
        prediction: {
            number: number;
            color: "red" | "black" | "green";
            confidence: number;
        };
        timestamp: string;
    }, {
        status: string;
        id: string | number;
        strategy: string;
        table: string;
        prediction: {
            number: number;
            color: "red" | "black" | "green";
            confidence: number;
        };
        timestamp: string;
    }>, "many">;
    total: z.ZodOptional<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    signals: {
        status: string;
        id: string | number;
        strategy: string;
        table: string;
        prediction: {
            number: number;
            color: "red" | "black" | "green";
            confidence: number;
        };
        timestamp: string;
    }[];
    total?: number | undefined;
}, {
    signals: {
        status: string;
        id: string | number;
        strategy: string;
        table: string;
        prediction: {
            number: number;
            color: "red" | "black" | "green";
            confidence: number;
        };
        timestamp: string;
    }[];
    total?: number | undefined;
}>;
export declare const LiveMetricsSchema: z.ZodObject<{
    totalSignals: z.ZodNumber;
    successRate: z.ZodNumber;
    activeStrategies: z.ZodNumber;
    dailyProfit: z.ZodUnion<[z.ZodString, z.ZodNumber]>;
    timestamp: z.ZodString;
}, "strip", z.ZodTypeAny, {
    timestamp: string;
    totalSignals: number;
    successRate: number;
    activeStrategies: number;
    dailyProfit: string | number;
}, {
    timestamp: string;
    totalSignals: number;
    successRate: number;
    activeStrategies: number;
    dailyProfit: string | number;
}>;
export declare const TableSpinSchema: z.ZodObject<{
    number: z.ZodNumber;
    color: z.ZodEnum<["red", "black", "green"]>;
    timestamp: z.ZodString;
}, "strip", z.ZodTypeAny, {
    number: number;
    color: "red" | "black" | "green";
    timestamp: string;
}, {
    number: number;
    color: "red" | "black" | "green";
    timestamp: string;
}>;
export declare const TableStatusItemSchema: z.ZodObject<{
    id: z.ZodString;
    name: z.ZodString;
    status: z.ZodString;
    players: z.ZodOptional<z.ZodNumber>;
    lastSpin: z.ZodOptional<z.ZodObject<{
        number: z.ZodNumber;
        color: z.ZodEnum<["red", "black", "green"]>;
        timestamp: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        number: number;
        color: "red" | "black" | "green";
        timestamp: string;
    }, {
        number: number;
        color: "red" | "black" | "green";
        timestamp: string;
    }>>;
}, "strip", z.ZodTypeAny, {
    status: string;
    id: string;
    name: string;
    players?: number | undefined;
    lastSpin?: {
        number: number;
        color: "red" | "black" | "green";
        timestamp: string;
    } | undefined;
}, {
    status: string;
    id: string;
    name: string;
    players?: number | undefined;
    lastSpin?: {
        number: number;
        color: "red" | "black" | "green";
        timestamp: string;
    } | undefined;
}>;
export declare const TableStatusSchema: z.ZodArray<z.ZodObject<{
    id: z.ZodString;
    name: z.ZodString;
    status: z.ZodString;
    players: z.ZodOptional<z.ZodNumber>;
    lastSpin: z.ZodOptional<z.ZodObject<{
        number: z.ZodNumber;
        color: z.ZodEnum<["red", "black", "green"]>;
        timestamp: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        number: number;
        color: "red" | "black" | "green";
        timestamp: string;
    }, {
        number: number;
        color: "red" | "black" | "green";
        timestamp: string;
    }>>;
}, "strip", z.ZodTypeAny, {
    status: string;
    id: string;
    name: string;
    players?: number | undefined;
    lastSpin?: {
        number: number;
        color: "red" | "black" | "green";
        timestamp: string;
    } | undefined;
}, {
    status: string;
    id: string;
    name: string;
    players?: number | undefined;
    lastSpin?: {
        number: number;
        color: "red" | "black" | "green";
        timestamp: string;
    } | undefined;
}>, "many">;
export type SignalPrediction = z.infer<typeof SignalPredictionSchema>;
export type SignalItem = z.infer<typeof SignalItemSchema>;
export type SignalsRecent = z.infer<typeof SignalsRecentSchema>;
export type LiveMetrics = z.infer<typeof LiveMetricsSchema>;
export type TableStatusItem = z.infer<typeof TableStatusItemSchema>;
export type TableStatus = z.infer<typeof TableStatusSchema>;
