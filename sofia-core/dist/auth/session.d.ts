export interface AuthUser {
    id: string;
    email?: string;
    user_metadata?: {
        full_name?: string;
        avatar_url?: string;
    };
    app_metadata?: {
        provider?: string;
        providers?: string[];
    };
}
export interface AuthSession {
    access_token: string;
    refresh_token: string;
    expires_in: number;
    expires_at?: number;
    token_type: string;
    user: AuthUser;
}
