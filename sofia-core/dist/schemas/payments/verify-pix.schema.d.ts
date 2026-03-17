import { z } from 'zod';
export declare const VerifyPixSchema: z.ZodObject<{
    order_id: z.ZodString;
}, "strip", z.ZodTypeAny, {
    order_id: string;
}, {
    order_id: string;
}>;
export type VerifyPixInput = z.infer<typeof VerifyPixSchema>;
