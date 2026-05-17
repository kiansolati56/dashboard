export const useAuthStore = defineStore('auth', {
    state: () => ({
        user: null,
        token: null
    }),

    actions: {
        async login(data) {
            const { $api } = useNuxtApp()

            const res = await $api('/login', {
                method: 'POST',
                body: data
            })

            this.user = res.user
            this.token = res.token

            localStorage.setItem('token', res.token)
        },

        async register(data) {
            const { $api } = useNuxtApp()

            const res = await $api('/register', {
                method: 'POST',
                body: data
            })

            this.user = res.user
            this.token = res.token

            localStorage.setItem('token', res.token)
        },

        logout() {
            this.user = null
            this.token = null
            localStorage.removeItem('token')
        }
    }
})