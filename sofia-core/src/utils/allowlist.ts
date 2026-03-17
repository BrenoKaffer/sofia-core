export function parseAllowlist(value?: string | null): string[] {
  if (!value) return []
  return value
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean)
}

export function isAllowedByAllowlist(params: {
  userId?: string | null
  email?: string | null
  allowlistUserIds?: string | null
  allowlistEmails?: string | null
}): boolean {
  const userId = String(params.userId || '').trim()
  const email = String(params.email || '').trim().toLowerCase()

  const allowedUserIds = parseAllowlist(params.allowlistUserIds)
  const allowedEmails = parseAllowlist(params.allowlistEmails).map((item) => item.toLowerCase())

  if (allowedUserIds.length === 0 && allowedEmails.length === 0) return false
  if (userId && allowedUserIds.includes(userId)) return true
  if (email && allowedEmails.includes(email)) return true
  return false
}
