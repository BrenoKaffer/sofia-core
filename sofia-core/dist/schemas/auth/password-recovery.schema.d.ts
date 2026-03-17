import { z } from 'zod';
export declare const PasswordRecoverySchema: z.ZodObject<{
    email: z.ZodString;
}, "strip", z.ZodTypeAny, {
    email: string;
}, {
    email: string;
}>;
export type PasswordRecoveryInput = z.infer<typeof PasswordRecoverySchema>;
