type BreadcrumbItem = {
    label: string
    to: string
    current: boolean
}

export const useBreadcrumbs = () => {
    const route = useRoute()

    const formatSegment = (segment: string) => {
        const text = decodeURIComponent(segment)
            .replace(/-/g, ' ')
            .replace(/\s+/g, ' ')
            .trim()
            .toLowerCase()

        if (!text) return ''
        return text.charAt(0).toUpperCase() + text.slice(1)
    }

    const breadcrumbs = computed<BreadcrumbItem[]>(() => {
        if (route.meta.breadcrumb === false) return []

        const path = route.path.replace(/\/+$/, '')
        const segments = path.split('/').filter(Boolean)

        if (!segments.length) return []

        return segments.map((segment, index) => {
            const to = `/${segments.slice(0, index + 1).join('/')}`

            return {
                label: formatSegment(segment),
                to,
                current: index === segments.length - 1,
            }
        })
    })

    return {
        breadcrumbs,
    }
}