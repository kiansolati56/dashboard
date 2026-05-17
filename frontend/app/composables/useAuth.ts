export const useAuth = () => {
    const service = useAuthService()
    const config = useRuntimeConfig()

    let initPromise: Promise<AuthUser | null> | null = null

    const user = useState<AuthUser | null>('auth.user', () => null)
    const ready = useState<boolean>('auth.ready', () => false)
    const booting = useState<boolean>('auth.booting', () => false)

    const theme = useCookie<ThemePreference>('theme', {
        sameSite: 'lax',
        default: () => 'dark',
    })

    const applyTheme = (value: ThemePreference) => {
        theme.value = value

        if (process.client) {
            document.documentElement.dataset.theme = value
            document.documentElement.classList.toggle('dark', value === 'dark')
        }
    }

    const resolveAssetUrl = (path?: string | null) => {
        if (!path) return null
        return `${config.public.apiBase}/storage/${path.replace(/^\/?storage\/?/, '')}`
    }

    const normalizeUser = (nextUser: AuthUser | null): AuthUser | null => {
        if (!nextUser) return null

        return {
            ...nextUser,
            avatar_url: resolveAssetUrl(nextUser.avatar),
        }
    }

    const syncUser = (nextUser: AuthUser | null) => {
        const normalizedUser = normalizeUser(nextUser)
        user.value = normalizedUser
        applyTheme(normalizedUser?.theme_preference ?? theme.value ?? 'dark')
    }

    const toProfileFormData = (payload: ProfileUpdatePayload) => {
        const formData = new FormData()

        formData.append('_method', 'PATCH')
        formData.append('name', payload.name)
        formData.append('username', payload.username)
        formData.append('bio', payload.bio ?? '')
        formData.append('theme_preference', payload.theme_preference ?? 'dark')

        if (payload.avatar) {
            formData.append('avatar', payload.avatar)
        }

        return formData
    }

    const init = async ({ force = false } = {}) => {
        if (booting.value) return user.value

        if (ready.value && !force) {
            return user.value
        }

        booting.value = true

        try {
            const res = await service.me()
            syncUser(res.user)
        } catch {
            syncUser(null)
        } finally {
            ready.value = true
            booting.value = false
        }

        return user.value
    }

    const ensureReady = async ({ force = false } = {}) => {
        if ((ready.value && !force) || booting.value) {
            return user.value
        }

        if (!initPromise) {
            initPromise = init({ force }).finally(() => {
                initPromise = null
            })
        }

        await initPromise

        return user.value
    }

    const refresh = async () => {
        ready.value = false
        return init({ force: true })
    }

    const login = async (payload: LoginPayload) => {
        await service.csrf()

        const res = await service.login(payload)

        syncUser(res.user)
        ready.value = true
        booting.value = false

        return res.user
    }

    const register = async (payload: RegisterPayload) => {
        await service.csrf()

        const res = await service.register(payload)

        syncUser(res.user)
        ready.value = true
        booting.value = false

        return res.user
    }

    const logout = async () => {
        if (process.server) return

        try {
            await service.logout()
        } finally {
            syncUser(null)
            ready.value = true
            await navigateTo('/auth/login')
        }
    }

    const updateTheme = async (value: ThemePreference) => {
        const res = await service.updateTheme(value)

        syncUser(res.user)
        ready.value = true

        return res.user
    }

    const updateProfile = async (payload: ProfileUpdatePayload) => {
        const body = payload.avatar ? toProfileFormData(payload) : payload
        const res = await service.updateProfile(body)

        syncUser(res.user)
        ready.value = true

        return res.user
    }

    const isAuthenticated = computed(() => Boolean(user.value?.id))

    return reactive({
        user,
        ready,
        booting,
        theme,
        isAuthenticated,
        init,
        ensureReady,
        refresh,
        login,
        register,
        logout,
        updateTheme,
        updateProfile,
    })
}