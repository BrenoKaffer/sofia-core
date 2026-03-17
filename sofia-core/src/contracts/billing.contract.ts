import type { ApiResponse } from './base'

export type AcceptedPaymentMethod = 'credit_card' | 'boleto' | 'pix'

export interface CheckoutLinkItem {
  amount: number
  name: string
  default_quantity?: number
}

export interface CheckoutLinkRequest {
  name?: string
  items: CheckoutLinkItem[]
  accepted_payment_methods?: AcceptedPaymentMethod[]
  success_url?: string
  cancel_url?: string
  idempotency_key?: string
  request_id?: string
  metadata?: Record<string, unknown>
  customer?: Record<string, unknown>
}

export type CheckoutLinkResponse = ApiResponse<{
  id: string | null
  url: string | null
  status: string | null
  success_url: string | null
  cancel_url: string | null
  created_at?: string | null
  expires_in?: number | null
  request_id?: string | null
}>

export type CheckoutLinkStatusResponse = ApiResponse<{
  id: string
  status: string
  amount?: number | null
  updated_at?: string | null
  request_id?: string | null
}>
