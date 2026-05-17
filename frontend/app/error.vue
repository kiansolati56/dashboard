<script setup>
import layoutWithoutSidebarHeader from './layouts/layout-without-sidebar-header.vue';

useHead({
    title: 'Oops! We ran into a problem...',
})

defineProps({
    error: {
        type: Object,
        required: true,
    },
})
</script>

<template>
    <layoutWithoutSidebarHeader>
        <div v-if="error.statusCode === 404" class="h-screen w-full center flex-col text-2xl text-thprimary font-mono">
            <div class="flex items-center gap-3">
                <span>404</span>
                <span>|</span>
                <span>Not found</span>
            </div>

            <div class="mt-6">
                <nuxt-link to="/dashboard" class="flex justify-center items-center gap-2 text-sm hover:underline">
                    <span>Dashboard</span>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" class="size-4">
                        <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                    </svg>
                </nuxt-link>
            </div>
        </div>

        <div v-else class="h-screen w-full center flex-col text-2xl text-thprimary font-mono">
            <div class="flex items-center gap-3">
                <span>{{ error.statusCode }}</span>
                <span>|</span>
                <span>Error</span>
            </div>

            <div class="mt-6">
                <nuxt-link to="/dashboard" class="flex justify-center items-center gap-2 text-sm hover:underline">
                    <span>Dashboard</span>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" class="size-4">
                        <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                    </svg>
                </nuxt-link>
            </div>
        </div>
    </layoutWithoutSidebarHeader>
</template>