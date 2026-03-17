import { z } from 'zod';
export declare const RegisterSchema: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
    name: z.ZodOptional<z.ZodString>;
    fullName: z.ZodOptional<z.ZodString>;
    cpf: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    email: string;
    password: string;
    name?: string | undefined;
    fullName?: string | undefined;
    cpf?: string | undefined;
}, {
    email: string;
    password: string;
    name?: string | undefined;
    fullName?: string | undefined;
    cpf?: string | undefined;
}>;
export type RegisterInput = z.infer<typeof RegisterSchema>;
