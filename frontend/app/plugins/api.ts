export default defineNuxtPlugin(() => {
    const config = useRuntimeConfig()

    const api = $fetch.create({
        baseURL: config.public.apiBase,

        onRequest({ options }) {
            const token = localStorage.getItem('token')

            if (token) {
                options.headers = {
                    ...options.headers,
                    Authorization: `Bearer ${token}`
                }
            }
        }
    })

    return {
        provide: {
            api
        }
    }
})