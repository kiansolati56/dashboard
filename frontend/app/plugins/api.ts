export default defineNuxtPlugin(() => {
    const config = useRuntimeConfig()

    const api = $fetch.create({
        baseURL: config.public.apiBase,
        credentials: 'include',
        headers: {
            Accept: 'application/json',
            'X-Requested-With': 'XMLHttpRequest',
        },
        onRequest({ options }) {
            const headers = new Headers(options.headers || {})

            if (process.server) {
                const requestHeaders = useRequestHeaders([
                    'cookie',
                    'origin',
                    'referer',
                    'host',
                    'user-agent',
                    'accept-language',
                ])

                if (requestHeaders.cookie) {
                    headers.set('cookie', requestHeaders.cookie)
                }

                if (requestHeaders.origin) {
                    headers.set('origin', requestHeaders.origin)
                }

                if (requestHeaders.referer) {
                    headers.set('referer', requestHeaders.referer)
                }

                if (requestHeaders.host) {
                    headers.set('host', requestHeaders.host)
                }

                if (requestHeaders['user-agent']) {
                    headers.set('user-agent', requestHeaders['user-agent'])
                }

                if (requestHeaders['accept-language']) {
                    headers.set('accept-language', requestHeaders['accept-language'])
                }
            }

            if (process.client) {
                const xsrf = useCookie<string | null>('XSRF-TOKEN')

                if (xsrf.value) {
                    headers.set('X-XSRF-TOKEN', decodeURIComponent(xsrf.value))
                }
            }

            options.headers = headers
        },
    })

    return {
        provide: {
            api,
        },
    }
})