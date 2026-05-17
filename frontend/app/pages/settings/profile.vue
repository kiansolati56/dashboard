<script setup lang="ts">
definePageMeta({
    middleware: 'auth',
    title: 'Profile'
})

const auth = useAuth()

const isSaving = ref(false)
const errorMessage = ref('')
const avatarFile = ref < File | null > (null)

const form = reactive({
    name: '',
    username: '',
    bio: '',
    theme_preference: 'dark' as ThemePreference,
})

watch(
    () => auth.user,
    (value) => {
        if (!value) return

        form.name = value.name || ''
        form.username = value.username || ''
        form.bio = value.bio || ''
        form.theme_preference = value.theme_preference || 'dark'
    },
    { immediate: true }
)

const onAvatarChange = (event: Event) => {
    const input = event.target as HTMLInputElement
    avatarFile.value = input.files?.[0] ?? null
}

const saveProfile = async () => {
    errorMessage.value = ''
    isSaving.value = true

    try {
        await auth.updateProfile({
            name: form.name,
            username: form.username,
            bio: form.bio,
            theme_preference: form.theme_preference,
            avatar: avatarFile.value,
        })

        avatarFile.value = null
    } catch (error: any) {
        const errors = error?.data?.errors || {}

        errorMessage.value =
            error?.data?.message ||
            errors.name?.[0] ||
            errors.username?.[0] ||
            errors.bio?.[0] ||
            errors.avatar?.[0] ||
            'Profile update failed.'
    } finally {
        isSaving.value = false
    }
}
</script>

<template>
    <div class="p-6">
        <div class="max-w-xl space-y-4">
            <h1 class="text-2xl font-semibold text-thprimary">Profile settings</h1>

            <div class="space-y-3">
                <input v-model="form.name" type="text" placeholder="Name"
                    class="h-10 w-full rounded-2xl border border-thgray-200/50 bg-thprimary/5 px-4 outline-none">

                <input v-model="form.username" type="text" placeholder="Username"
                    class="h-10 w-full rounded-2xl border border-thgray-200/50 bg-thprimary/5 px-4 outline-none">

                <textarea v-model="form.bio" rows="4" placeholder="Bio"
                    class="w-full rounded-2xl border border-thgray-200/50 bg-thprimary/5 px-4 py-3 outline-none" />

                <select v-model="form.theme_preference"
                    class="h-10 w-full rounded-2xl border border-thgray-200/50 bg-thprimary/5 px-4 outline-none">
                    <option value="dark">Dark</option>
                    <option value="light">Light</option>
                </select>

                <input type="file" accept="image/*" @change="onAvatarChange" class="w-full">
            </div>

            <p v-if="errorMessage" class="text-sm text-red-500">
                {{ errorMessage }}
            </p>

            <button class="h-10 rounded-full border border-thgray-200/50 bg-thprimary/8 px-5 text-sm"
                :disabled="isSaving" @click="saveProfile">
                {{ isSaving ? 'Saving...' : 'Save changes' }}
            </button>
        </div>
    </div>
</template>