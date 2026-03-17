import { z } from 'zod';
export declare const CreateStrategySchema: z.ZodObject<{
    strategy_name: z.ZodString;
    entry_conditions: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
    exit_conditions: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
    config: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
    table_id: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    status: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    strategy_name: string;
    status?: string | undefined;
    entry_conditions?: Record<string, unknown> | undefined;
    exit_conditions?: Record<string, unknown> | undefined;
    config?: Record<string, unknown> | undefined;
    table_id?: string | null | undefined;
}, {
    strategy_name: string;
    status?: string | undefined;
    entry_conditions?: Record<string, unknown> | undefined;
    exit_conditions?: Record<string, unknown> | undefined;
    config?: Record<string, unknown> | undefined;
    table_id?: string | null | undefined;
}>;
export type CreateStrategyInput = z.infer<typeof CreateStrategySchema>;
