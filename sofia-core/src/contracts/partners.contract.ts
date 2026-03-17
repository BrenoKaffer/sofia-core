export interface PartnerProfile {
  id: string
  user_id: string
  name: string
  document: string
  ref_code: string
  slug: string
  recipient_id?: string | null
  status?: string | null
  commission_percentage?: number | null
  payout_balance?: number | null
  pix_key?: string | null
  slug_updated_at?: string | null
}

export type PartnerMeResponse = PartnerProfile | { error: string }

export interface PartnerLinkItem {
  url: string
  label?: string
}

export interface PartnerLinksResponse {
  items: PartnerLinkItem[]
  affiliate_slug: string
}

export interface PartnerQuickLinksResponse {
  checkout: { items: PartnerLinkItem[]; label?: string }
  sportsbook?: { items: PartnerLinkItem[]; label?: string }
  affiliate_slug: string
}
