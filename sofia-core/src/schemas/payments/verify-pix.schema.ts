import { z } from 'zod'

export const VerifyPixSchema = z.object({
  order_id: z.string().min(1)
})

export type VerifyPixInput = z.infer<typeof VerifyPixSchema>
