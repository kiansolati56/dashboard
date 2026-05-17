export default defineNuxtRouteMiddleware(async () => {
    const auth = useAuth()

    await auth.ensureReady()

    if (process.server) return

    if (!auth.user?.id) {
        return navigateTo('/auth/login')
    }
})