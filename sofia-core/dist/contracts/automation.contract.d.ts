import type { ApiMessageError } from './base';
export interface ActiveStrategy {
    id: string;
    user_id: string;
    strategy_name: string;
    entry_conditions: Record<string, unknown>;
    exit_conditions: Record<string, unknown>;
    config: Record<string, unknown>;
    table_id: string | null;
    status: string;
    created_at?: string | null;
    updated_at?: string | null;
}
export interface StrategyListQuery {
    table_id?: string;
    status?: string;
}
export type StrategyListResponse = ActiveStrategy[] | ApiMessageError;
export interface CreateStrategyRequest {
    strategy_name: string;
    entry_conditions?: Record<string, unknown>;
    exit_conditions?: Record<string, unknown>;
    config?: Record<string, unknown>;
    table_id?: string | null;
    status?: string;
}
export type CreateStrategyResponse = ActiveStrategy | ApiMessageError;
export interface UpdateStrategyStatusRequest {
    status: string;
}
export type UpdateStrategyStatusResponse = ActiveStrategy | {
    id: string;
    status: string;
} | ApiMessageError;
