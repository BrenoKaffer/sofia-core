import { z } from 'zod'

const AddressSchema = z.object({
  street: z.string().min(1),
  street_number: z.string().min(1),
  neighborhood: z.string().min(1),
  city: z.string().min(1),
  state: z.string().min(2),
  zip_code: z.string().min(5),
  complementary: z.string().optional(),
  reference_point: z.string().optional()
})

const PhoneSchema = z.object({
  ddd: z.string().min(2),
  number: z.string().min(8),
  type: z.enum(['mobile', 'landline']).optional()
})

const CompanySchema = z.object({
  legal_name: z.string().min(1),
  trade_name: z.string().min(1),
  email: z.string().email(),
  cnpj: z.string().min(11),
  site_url: z.string().min(1).optional(),
  annual_revenue: z.number().optional(),
  opening_date: z.string().min(1).optional(),
  cnae: z.string().min(1).optional(),
  address: AddressSchema,
  phone: PhoneSchema
})

const RepresentativeSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  cpf: z.string().min(11),
  mother_name: z.string().min(1),
  birthdate: z.string().min(1),
  monthly_income: z.number().optional(),
  professional_occupation: z.string().min(1),
  address: AddressSchema,
  phone: PhoneSchema
})

const BankAccountSchema = z.object({
  holder_name: z.string().min(1),
  bank: z.string().min(1),
  branch_number: z.string().min(1),
  branch_check_digit: z.string().optional(),
  account_number: z.string().min(1),
  account_check_digit: z.string().min(1),
  type: z.enum(['checking', 'savings'])
})

export const PartnerRecipientSchema = z.object({
  company: CompanySchema,
  representative: RepresentativeSchema,
  bank_account: BankAccountSchema,
  code: z.string().optional()
})

export type PartnerRecipientInput = z.infer<typeof PartnerRecipientSchema>
