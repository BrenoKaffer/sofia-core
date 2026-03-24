import { z } from 'zod';
export const WEBSOCKET_CONTRACT_VERSION = '1.0.0';
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
};
export const SignalPredictionSchema = z.object({
    number: z.number().int().min(0).max(36),
    color: z.enum(['red', 'black', 'green']),
    confidence: z.number().min(0).max(100)
});
export const SignalItemSchema = z.object({
    id: z.union([z.string(), z.number()]),
    strategy: z.string().min(1),
    table: z.string().min(1),
    prediction: SignalPredictionSchema,
    timestamp: z.string().min(1),
    status: z.string().min(1)
});
export const SignalsRecentSchema = z.object({
    signals: z.array(SignalItemSchema),
    total: z.number().optional()
});
export const LiveMetricsSchema = z.object({
    totalSignals: z.number(),
    successRate: z.number(),
    activeStrategies: z.number(),
    dailyProfit: z.union([z.string(), z.number()]),
    timestamp: z.string().min(1)
});
export const TableSpinSchema = z.object({
    number: z.number().int().min(0).max(36),
    color: z.enum(['red', 'black', 'green']),
    timestamp: z.string().min(1)
});
export const TableStatusItemSchema = z.object({
    id: z.string().min(1),
    name: z.string().min(1),
    status: z.string().min(1),
    players: z.number().optional(),
    lastSpin: TableSpinSchema.optional()
});
export const TableStatusSchema = z.array(TableStatusItemSchema);
