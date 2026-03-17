import { z } from 'zod'

export const AcceptPolicySchema = z.object({
  version_id: z.string().optional()
})

export type AcceptPolicyInput = z.infer<typeof AcceptPolicySchema>
