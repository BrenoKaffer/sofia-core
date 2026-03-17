import { z } from 'zod'

export const CreateStrategySchema = z.object({
  strategy_name: z.string().min(1),
  entry_conditions: z.record(z.unknown()).optional(),
  exit_conditions: z.record(z.unknown()).optional(),
  config: z.record(z.unknown()).optional(),
  table_id: z.string().min(1).nullable().optional(),
  status: z.string().min(1).optional()
})

export type CreateStrategyInput = z.infer<typeof CreateStrategySchema>
