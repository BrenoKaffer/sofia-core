import { z } from 'zod';
export declare const AcceptPolicySchema: z.ZodObject<{
    version_id: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    version_id?: string | undefined;
}, {
    version_id?: string | undefined;
}>;
export type AcceptPolicyInput = z.infer<typeof AcceptPolicySchema>;
