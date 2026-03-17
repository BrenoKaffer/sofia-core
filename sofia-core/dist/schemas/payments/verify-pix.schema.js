import { z } from 'zod';
export const VerifyPixSchema = z.object({
    order_id: z.string().min(1)
});
