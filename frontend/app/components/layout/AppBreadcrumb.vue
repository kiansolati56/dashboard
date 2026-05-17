<script setup>
const { breadcrumbs } = useBreadcrumbs()
</script>

<template>
    <div v-if="breadcrumbs.length" aria-label="Breadcrumb" class="flex items-center gap-2">
        <template v-for="(item, index) in breadcrumbs" :key="item.to">
            <NuxtLink v-if="!item.current" :to="item.to"
                class="text-thprimary/80 transition-colors hover:text-thprimary">
                {{ item.label }}
            </NuxtLink>

            <span v-else class="text-thprimary font-medium">
                {{ item.label }}
            </span>

            <svg v-if="index !== breadcrumbs.length - 1" xmlns="http://www.w3.org/2000/svg" fill="none"
                viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-4 shrink-0 text-thprimary/50">
                <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
            </svg>
        </template>
    </div>
</template>