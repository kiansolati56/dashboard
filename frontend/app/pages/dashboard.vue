<script setup lang="ts">
definePageMeta({
    middleware: 'auth',
})

const auth = useAuth()
</script>

<template>
    <div class="p-6">
        <div v-if="auth.user?.id" class="flex items-center gap-3">
            <img :src="auth.user?.avatar_url" :alt="auth.user.name"
                class="size-12 rounded-full object-cover">
            <div>
                <h1 class="text-xl font-semibold text-thprimary">
                    {{ auth.user.name }}
                </h1>
                <p class="text-sm text-thprimary/60">
                    @{{ auth.user.username }}
                </p>
            </div>
        </div>

        <div v-else class="text-sm text-thprimary/60">
            Loading profile...
        </div>
    </div>
</template>