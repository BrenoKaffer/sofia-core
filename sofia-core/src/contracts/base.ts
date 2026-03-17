export type ApiSuccess<T> = { success: true } & T

export type ApiError = {
  success: false
  error?: string
  message?: string
  error_code?: string
  error_type?: string
  field_errors?: Record<string, string[]>
  retryable?: boolean
  request_id?: string | null
}

export type ApiResponse<T> = ApiSuccess<T> | ApiError

export type ApiMessageError = {
  message: string
  error?: string
}
