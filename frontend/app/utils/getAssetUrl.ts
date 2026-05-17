export const getAssetUrl = (path: string | null | undefined) => {
    if (!path) return '/avatar-placeholder.png'

    const baseUrl = useRuntimeConfig().public.apiBase

    return `${baseUrl}/storage/${path.replace(/^\/?storage\/?/, '')}`
}