import { z } from 'zod';
export const CardInfoSchema = z.object({
    number: z.string().min(1),
    holder_name: z.string().min(1),
    exp_month: z.number().int(),
    exp_year: z.number().int(),
    cvv: z.string().min(1)
});
export const SubscriptionCustomerSchema = z.object({
    name: z.string().optional(),
    email: z.string().email().optional(),
    document: z.string().optional(),
    type: z.string().optional(),
    phones: z.record(z.unknown()).optional()
});
export const CreateSubscriptionSchema = z.object({
    customer: SubscriptionCustomerSchema,
    payment_method: z.enum(['credit_card', 'pix', 'boleto']),
    card: CardInfoSchema.optional(),
    amount: z.number().optional(),
    plan: z.object({ name: z.string().optional() }).optional(),
    plan_slug: z.string().optional(),
    affiliate_slug: z.string().optional(),
    affiliate_code: z.string().optional(),
    coupon: z.string().optional(),
    metadata: z.record(z.unknown()).optional()
});
