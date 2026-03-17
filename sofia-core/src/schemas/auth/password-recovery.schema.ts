import { z } from 'zod'

export const PasswordRecoverySchema = z.object({
  email: z.string().email()
})

export type PasswordRecoveryInput = z.infer<typeof PasswordRecoverySchema>
