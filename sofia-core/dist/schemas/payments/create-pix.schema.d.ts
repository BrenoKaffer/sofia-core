import { z } from 'zod';
export declare const PixCustomerSchema: z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    email: z.ZodOptional<z.ZodString>;
    document: z.ZodOptional<z.ZodString>;
    type: z.ZodOptional<z.ZodString>;
    phones: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
}, "strip", z.ZodTypeAny, {
    type?: string | undefined;
    name?: string | undefined;
    email?: string | undefined;
    document?: string | undefined;
    phones?: Record<string, unknown> | undefined;
}, {
    type?: string | undefined;
    name?: string | undefined;
    email?: string | undefined;
    document?: string | undefined;
    phones?: Record<string, unknown> | undefined;
}>;
export declare const CreatePixSchema: z.ZodObject<{
    customer: z.ZodObject<{
        name: z.ZodOptional<z.ZodString>;
        email: z.ZodOptional<z.ZodString>;
        document: z.ZodOptional<z.ZodString>;
        type: z.ZodOptional<z.ZodString>;
        phones: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
    }, "strip", z.ZodTypeAny, {
        type?: string | undefined;
        name?: string | undefined;
        email?: string | undefined;
        document?: string | undefined;
        phones?: Record<string, unknown> | undefined;
    }, {
        type?: string | undefined;
        name?: string | undefined;
        email?: string | undefined;
        document?: string | undefined;
        phones?: Record<string, unknown> | undefined;
    }>;
    amount: z.ZodOptional<z.ZodNumber>;
    plan: z.ZodOptional<z.ZodObject<{
        name: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        name?: string | undefined;
    }, {
        name?: string | undefined;
    }>>;
    plan_slug: z.ZodOptional<z.ZodString>;
    affiliate_slug: z.ZodOptional<z.ZodString>;
    affiliate_code: z.ZodOptional<z.ZodString>;
    coupon: z.ZodOptional<z.ZodString>;
    pix_expiration_date: z.ZodOptional<z.ZodString>;
    metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
}, "strip", z.ZodTypeAny, {
    customer: {
        type?: string | undefined;
        name?: string | undefined;
        email?: string | undefined;
        document?: string | undefined;
        phones?: Record<string, unknown> | undefined;
    };
    amount?: number | undefined;
    plan?: {
        name?: string | undefined;
    } | undefined;
    plan_slug?: string | undefined;
    affiliate_slug?: string | undefined;
    affiliate_code?: string | undefined;
    coupon?: string | undefined;
    pix_expiration_date?: string | undefined;
    metadata?: Record<string, unknown> | undefined;
}, {
    customer: {
        type?: string | undefined;
        name?: string | undefined;
        email?: string | undefined;
        document?: string | undefined;
        phones?: Record<string, unknown> | undefined;
    };
    amount?: number | undefined;
    plan?: {
        name?: string | undefined;
    } | undefined;
    plan_slug?: string | undefined;
    affiliate_slug?: string | undefined;
    affiliate_code?: string | undefined;
    coupon?: string | undefined;
    pix_expiration_date?: string | undefined;
    metadata?: Record<string, unknown> | undefined;
}>;
export type CreatePixInput = z.infer<typeof CreatePixSchema>;
