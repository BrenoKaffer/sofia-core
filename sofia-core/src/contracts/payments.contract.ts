import type { ApiResponse } from './base'

export interface PixCustomer {
  name?: string
  email?: string
  document?: string
  type?: string
  phones?: Record<string, unknown>
}

export interface CreatePixRequest {
  customer: PixCustomer
  amount?: number
  plan?: { name?: string }
  plan_slug?: string
  affiliate_slug?: string
  affiliate_code?: string
  coupon?: string
  pix_expiration_date?: string
  metadata?: Record<string, unknown>
}

export type CreatePixResponse = ApiResponse<{
  qr_code?: string
  qr_code_url?: string
  expires_at?: string
  amount?: number
  order_id?: string
}>

export interface VerifyPixRequest {
  order_id: string
}

export type VerifyPixResponse = ApiResponse<{
  status?: string
}>

export interface CardInfo {
  number: string
  holder_name: string
  exp_month: number
  exp_year: number
  cvv: string
}

export interface CreateSubscriptionRequest {
  customer: PixCustomer
  payment_method: 'credit_card' | 'pix' | 'boleto'
  card?: CardInfo
  amount?: number
  plan?: { name?: string }
  plan_slug?: string
  affiliate_slug?: string
  affiliate_code?: string
  coupon?: string
  metadata?: Record<string, unknown>
}

export type CreateSubscriptionResponse = ApiResponse<{
  status?: string
  order_id?: string
  order?: Record<string, unknown>
}>
