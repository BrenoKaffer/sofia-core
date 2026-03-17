import { z } from 'zod';
export declare const CardInfoSchema: z.ZodObject<{
    number: z.ZodString;
    holder_name: z.ZodString;
    exp_month: z.ZodNumber;
    exp_year: z.ZodNumber;
    cvv: z.ZodString;
}, "strip", z.ZodTypeAny, {
    number: string;
    holder_name: string;
    exp_month: number;
    exp_year: number;
    cvv: string;
}, {
    number: string;
    holder_name: string;
    exp_month: number;
    exp_year: number;
    cvv: string;
}>;
export declare const SubscriptionCustomerSchema: z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    email: z.ZodOptional<z.ZodString>;
    document: z.ZodOptional<z.ZodString>;
    type: z.ZodOptional<z.ZodString>;
    phones: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
}, "strip", z.ZodTypeAny, {
    email?: string | undefined;
    type?: string | undefined;
    name?: string | undefined;
    document?: string | undefined;
    phones?: Record<string, unknown> | undefined;
}, {
    email?: string | undefined;
    type?: string | undefined;
    name?: string | undefined;
    document?: string | undefined;
    phones?: Record<string, unknown> | undefined;
}>;
export declare const CreateSubscriptionSchema: z.ZodObject<{
    customer: z.ZodObject<{
        name: z.ZodOptional<z.ZodString>;
        email: z.ZodOptional<z.ZodString>;
        document: z.ZodOptional<z.ZodString>;
        type: z.ZodOptional<z.ZodString>;
        phones: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
    }, "strip", z.ZodTypeAny, {
        email?: string | undefined;
        type?: string | undefined;
        name?: string | undefined;
        document?: string | undefined;
        phones?: Record<string, unknown> | undefined;
    }, {
        email?: string | undefined;
        type?: string | undefined;
        name?: string | undefined;
        document?: string | undefined;
        phones?: Record<string, unknown> | undefined;
    }>;
    payment_method: z.ZodEnum<["credit_card", "pix", "boleto"]>;
    card: z.ZodOptional<z.ZodObject<{
        number: z.ZodString;
        holder_name: z.ZodString;
        exp_month: z.ZodNumber;
        exp_year: z.ZodNumber;
        cvv: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        number: string;
        holder_name: string;
        exp_month: number;
        exp_year: number;
        cvv: string;
    }, {
        number: string;
        holder_name: string;
        exp_month: number;
        exp_year: number;
        cvv: string;
    }>>;
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
    metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
}, "strip", z.ZodTypeAny, {
    customer: {
        email?: string | undefined;
        type?: string | undefined;
        name?: string | undefined;
        document?: string | undefined;
        phones?: Record<string, unknown> | undefined;
    };
    payment_method: "credit_card" | "boleto" | "pix";
    amount?: number | undefined;
    plan?: {
        name?: string | undefined;
    } | undefined;
    plan_slug?: string | undefined;
    affiliate_slug?: string | undefined;
    affiliate_code?: string | undefined;
    coupon?: string | undefined;
    metadata?: Record<string, unknown> | undefined;
    card?: {
        number: string;
        holder_name: string;
        exp_month: number;
        exp_year: number;
        cvv: string;
    } | undefined;
}, {
    customer: {
        email?: string | undefined;
        type?: string | undefined;
        name?: string | undefined;
        document?: string | undefined;
        phones?: Record<string, unknown> | undefined;
    };
    payment_method: "credit_card" | "boleto" | "pix";
    amount?: number | undefined;
    plan?: {
        name?: string | undefined;
    } | undefined;
    plan_slug?: string | undefined;
    affiliate_slug?: string | undefined;
    affiliate_code?: string | undefined;
    coupon?: string | undefined;
    metadata?: Record<string, unknown> | undefined;
    card?: {
        number: string;
        holder_name: string;
        exp_month: number;
        exp_year: number;
        cvv: string;
    } | undefined;
}>;
export type CreateSubscriptionInput = z.infer<typeof CreateSubscriptionSchema>;
