export type ThemePreference = 'dark' | 'light'

export interface AuthUser {
    id: number
    name: string
    username: string
    email: string
    avatar: string | null
    avatar_url: string | null
    bio: string | null
    theme_preference: ThemePreference
    last_login_at: string | null
    email_verified_at: string | null
    created_at: string | null
    updated_at: string | null
}

export interface LoginPayload {
    email: string
    password: string
    remember?: boolean
}

export interface RegisterPayload {
    name: string
    username: string
    email: string
    password: string
    password_confirmation: string
    theme_preference?: ThemePreference
}

export interface ProfileUpdatePayload {
    name: string
    username: string
    bio?: string | null
    theme_preference?: ThemePreference
    avatar?: File | null
}

interface AuthResponse {
    message: string
    user: AuthUser
}

export const useAuthService = () => {
    const { $api } = useNuxtApp()

    return {
        csrf: () =>
            $api('/sanctum/csrf-cookie', {
                method: 'GET',
                credentials: 'include',
            }),

        login: (payload: LoginPayload) =>
            $api<AuthResponse>('/api/auth/login', {
                method: 'POST',
                body: payload,
                credentials: 'include',
            }),

        register: (payload: RegisterPayload) =>
            $api<AuthResponse>('/api/auth/register', {
                method: 'POST',
                body: payload,
                credentials: 'include',
            }),

        me: () =>
            $api<{ user: AuthUser }>('/api/auth/me', {
                credentials: 'include',
            }),

        logout: () =>
            $api<{ message: string }>('/api/auth/logout', {
                method: 'POST',
                credentials: 'include',
            }),

        updateTheme: (theme_preference: ThemePreference) =>
            $api<AuthResponse>('/api/auth/theme', {
                method: 'PATCH',
                body: { theme_preference },
                credentials: 'include',
            }),

        updateProfile: (payload: ProfileUpdatePayload | FormData) =>
            payload instanceof FormData
                ? $api<AuthResponse>('/api/auth/profile', {
                    method: 'POST',
                    body: payload,
                    credentials: 'include',
                })
                : $api<AuthResponse>('/api/auth/profile', {
                    method: 'PATCH',
                    body: payload,
                    credentials: 'include',
                }),
    }
}