import type { AuthSession, AuthUser } from '../auth/session'
import type { ApiResponse } from './base'

export interface LoginRequest {
  email: string
  password: string
}

export type LoginResponse = ApiResponse<{
  session: AuthSession
  user: AuthUser
  gamification: unknown | null
}>

export interface RegisterRequest {
  email: string
  password: string
  name?: string
  fullName?: string
  cpf?: string
}

export type RegisterResponse = ApiResponse<{
  message: string
  user_id?: string | null
}>

export interface PasswordRecoveryRequest {
  email: string
}

export type PasswordRecoveryResponse = ApiResponse<{
  message: string
}>
