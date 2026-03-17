import { z } from 'zod'

export const PixCustomerSchema = z.object({
  name: z.string().optional(),
  email: z.string().email().optional(),
  document: z.string().optional(),
  type: z.string().optional(),
  phones: z.record(z.unknown()).optional()
})

export const CreatePixSchema = z.object({
  customer: PixCustomerSchema,
  amount: z.number().optional(),
  plan: z.object({ name: z.string().optional() }).optional(),
  plan_slug: z.string().optional(),
  affiliate_slug: z.string().optional(),
  affiliate_code: z.string().optional(),
  coupon: z.string().optional(),
  pix_expiration_date: z.string().optional(),
  metadata: z.record(z.unknown()).optional()
})

export type CreatePixInput = z.infer<typeof CreatePixSchema>
