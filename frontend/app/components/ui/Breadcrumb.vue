<script setup>
import { computed, defineAsyncComponent } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const formatName = (name) => {
    const specialCases = {
        'settings': 'Settings',
        'projects': 'Projects',
    }

    if (specialCases[name.toLowerCase()]) {
        return specialCases[name.toLowerCase()]
    }

    let formatted = name.charAt(0).toUpperCase() + name.slice(1)
    formatted = formatted.replace(/-/g, ' ')

    return formatted
}

const iconCache = new Map()

const getIconComponent = (pathName) => {
    if (!pathName) return null

    const name = pathName.charAt(0).toUpperCase() + pathName.slice(1)

    if (iconCache.has(name)) {
        return iconCache.get(name)
    }

    try {
        const component = defineAsyncComponent(() => import(`~/components/ui/icons/pages/${name}.vue`))
        iconCache.set(name, component)
        return component
    } catch (error) {
        console.warn(`Icon not found: ${name}`)
        return null
    }
}

const breadcrumbs = computed(() => {
    const paths = route.path.split('/').filter(p => p && p !== '')

    if (paths.length === 0 || route.meta.hideBreadcrumb) {
        return []
    }

    const crumbs = []
    let currentPath = ''

    for (let i = 0; i < paths.length; i++) {
        const path = paths[i]
        currentPath += `/${path}`

        crumbs.push({
            name: formatName(path),
            path: currentPath,
            isLast: i === paths.length - 1,
            iconComponent: i === 0 ? getIconComponent(paths[0]) : null,
            showIcon: i === 0
        })
    }

    return crumbs
})
</script>

<template>
    <div v-if="breadcrumbs.length > 0" class="w-full">
        <div v-if="!$slots['custom-hero']" class="mb-6 md:mb-12 pb-6 border-b border-thgray-200/50">
            <div class="flex items-center gap-3 flex-wrap">
                <template v-for="(crumb, index) in breadcrumbs" :key="crumb.path">
                    <component :is="crumb.iconComponent" v-if="crumb.showIcon && crumb.iconComponent"
                        class="size-8 shrink-0" />

                    <nuxt-link v-if="!crumb.isLast" :to="crumb.path"
                        class="text-2xl font-semibold text-thprimary/70 hover:text-thprimary transition-all duration-200">
                        {{ crumb.name }}
                    </nuxt-link>

                    <span v-else class="text-thprimary font-semibold text-2xl">
                        {{ crumb.name }}
                    </span>

                    <span v-if="!crumb.isLast" class="shrink-0">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                            stroke="currentColor" class="size-5 mt-1">
                            <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                        </svg>
                    </span>
                </template>
            </div>
        </div>

        <slot name="custom-hero" />
    </div>
</template>