export default defineNuxtPlugin(() => {
    const theme = useCookie<'dark' | 'light'>('theme', {
        sameSite: 'lax',
        default: () => 'dark',
    })

    const applyTheme = () => {
        const value = theme.value || 'dark'
        document.documentElement.dataset.theme = value
        document.documentElement.classList.toggle('dark', value === 'dark')
    }

    applyTheme()
    watch(theme, applyTheme)
})