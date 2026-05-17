<script setup>
definePageMeta({
    layout: 'auth-layout'
})
</script>

<template>
    <nuxt-link to="/auth/log-in"
        class="text-sm text-thprimary/50 hover:text-thprimary/70 transition-all duration-200 absolute top-4 right-6">
        Already have an account?
    </nuxt-link>
    <div class="size-full center">
        <div class="flex flex-col items-start w-full sm:w-sm gap-y-4">
            <h1 class="text-thprimary text-4xl font-medium">Create your account</h1>
            <p class="text-thprimary/60 font-mono -mt-2">Join us! Create an account</p>

            <div class="w-full h-10 relative">
                <input type="text" placeholder="Your name..."
                    class="w-full h-10 bg-thprimary/5 rounded-4xl border border-thgray-200/50 pt-1 hover:border-thgray-200 focus:border-thgray-200 transition-all duration-200 outline-none px-4 placeholder:text-sm font-mono pl-11 pb-0.5">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                    stroke="currentColor" class="size-5 absolute left-4 top-1/2 -translate-y-1/2 text-thprimary/50">
                    <path stroke-linecap="round" stroke-linejoin="round"
                        d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                </svg>
            </div>

            <div class="w-full h-10 relative -mt-2">
                <input type="text" placeholder="Your username..."
                    class="w-full h-10 bg-thprimary/5 rounded-4xl border border-thgray-200/50 pt-1 hover:border-thgray-200 focus:border-thgray-200 transition-all duration-200 outline-none px-4 placeholder:text-sm font-mono pl-11 pb-0.5">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                    stroke="currentColor" class="size-5 absolute left-4 top-1/2 -translate-y-1/2 text-thprimary/50">
                    <path stroke-linecap="round" stroke-linejoin="round"
                        d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                </svg>
            </div>

            <div class="w-full h-10 relative -mt-2">
                <input type="text" placeholder="Your password..."
                    class="w-full h-10 bg-thprimary/5 rounded-4xl border border-thgray-200/50 pt-1 hover:border-thgray-200 focus:border-thgray-200 transition-all duration-200 outline-none px-4 placeholder:text-sm font-mono pl-11 pb-0.5">
                <button class="absolute left-4 top-1/2 -translate-y-1/2 text-thprimary/50">
                    <!-- eye without line -->
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" class="size-5">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                        <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                    </svg>
                    <!-- eye with line -->
                    <!-- <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" class="size-6">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
                    </svg> -->
                </button>
            </div>

            <div class="w-full h-10 relative -mt-2">
                <input type="text" placeholder="Confirm your password..."
                    class="w-full h-10 bg-thprimary/5 rounded-4xl border border-thgray-200/50 pt-1 hover:border-thgray-200 focus:border-thgray-200 transition-all duration-200 outline-none px-4 placeholder:text-sm font-mono pl-11 pb-0.5">
                <button class="absolute left-4 top-1/2 -translate-y-1/2 text-thprimary/50">
                    <!-- eye without line -->
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" class="size-5">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                        <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                    </svg>
                    <!-- eye with line -->
                    <!-- <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" class="size-6">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
                    </svg> -->
                </button>
            </div>

            <button
                class="-mt-1 h-10 w-full flex justify-center items-center bg-thprimary/8 hover:bg-thprimary/10 active:bg-thprimary/12 transition-all duration-300 rounded-full text-sm border border-thgray-200/50">
                Create your account
            </button>
        </div>
    </div>
</template>