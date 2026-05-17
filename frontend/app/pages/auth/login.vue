<script setup lang="ts">
import { useAuthStore } from '~/stores/auth'

definePageMeta({
    layout: 'auth-layout'
})

const auth = useAuthStore()

const form = reactive({
    email: '',
    password: ''
})

const showPassword = ref(false)
const isLoading = ref(false)
const errorMessage = ref('')

const togglePassword = () => {
    showPassword.value = !showPassword.value
}

const handleLogin = async () => {
    errorMessage.value = ''
    isLoading.value = true

    try {
        await auth.login({
            email: form.email,
            password: form.password
        })

        await navigateTo('/dashboard')

        console.log('login was success')
    } catch (error: any) {
        errorMessage.value =
            error?.data?.message ||
            error?.data?.email?.[0] ||
            'Login failed. Please check your credentials.'
    } finally {
        isLoading.value = false
    }
}
</script>

<template>
    <div class="relative size-full">
        <NuxtLink to="/auth/create-account"
            class="absolute right-6 top-4 text-sm text-thprimary/50 transition-all duration-200 hover:text-thprimary/70">
            Create an account
        </NuxtLink>

        <div class="center size-full">
            <form class="flex w-full flex-col items-start gap-y-4 sm:w-sm" @submit.prevent="handleLogin">
                <div>
                    <h1 class="text-4xl font-medium text-thprimary">Login</h1>
                    <p class="-mt-2 font-mono text-thprimary/60">Welcome back! Please login</p>
                </div>

                <div class="relative h-10 w-full">
                    <input v-model="form.email" type="email" name="email" autocomplete="email"
                        placeholder="Your email..."
                        class="h-10 w-full rounded-4xl border border-thgray-200/50 bg-thprimary/5 px-4 pl-11 pt-1 pb-0.5 font-mono text-sm outline-none transition-all duration-200 placeholder:text-sm hover:border-thgray-200 focus:border-thgray-200">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" class="absolute left-4 top-1/2 size-5 -translate-y-1/2 text-thprimary/50">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                    </svg>
                </div>

                <div class="relative -mt-2 h-10 w-full">
                    <input v-model="form.password" :type="showPassword ? 'text' : 'password'" name="password"
                        autocomplete="current-password" placeholder="Your password..."
                        class="h-10 w-full rounded-4xl border border-thgray-200/50 bg-thprimary/5 px-4 pl-11 pr-11 pt-1 pb-0.5 font-mono text-sm outline-none transition-all duration-200 placeholder:text-sm hover:border-thgray-200 focus:border-thgray-200">

                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" class="absolute left-4 top-1/2 size-5 -translate-y-1/2 text-thprimary/50">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 0h10.5A2.25 2.25 0 0 1 19.5 12.75v4.5A2.25 2.25 0 0 1 17.25 19.5H6.75A2.25 2.25 0 0 1 4.5 17.25v-4.5A2.25 2.25 0 0 1 6.75 10.5Z" />
                    </svg>

                    <button type="button"
                        class="absolute right-4 top-1/2 -translate-y-1/2 text-thprimary/50 transition-colors duration-200 hover:text-thprimary/80"
                        @click="togglePassword" :aria-label="showPassword ? 'Hide password' : 'Show password'">
                        <svg v-if="!showPassword" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                            stroke-width="1.5" stroke="currentColor" class="size-5">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                        </svg>

                        <svg v-else xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                            stroke-width="1.5" stroke="currentColor" class="size-5">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
                        </svg>
                    </button>
                </div>

                <p v-if="errorMessage" class="-mt-1 text-sm text-red-500">
                    {{ errorMessage }}
                </p>

                <button type="submit"
                    class="-mt-1 flex h-10 w-full items-center justify-center rounded-full border border-thgray-200/50 bg-thprimary/8 text-sm transition-all duration-300 hover:bg-thprimary/10 active:bg-thprimary/12 disabled:cursor-not-allowed disabled:opacity-60"
                    :disabled="isLoading">
                    {{ isLoading ? 'Logging in...' : 'Login' }}
                </button>
            </form>
        </div>
    </div>
</template>