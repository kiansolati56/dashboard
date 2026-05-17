<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const isDropdownOpen = ref(false)
const themeButtonRef = ref(null)
const dropdownRef = ref(null)
const currentTheme = ref('dark')

definePageMeta({
    title: 'Settings'
})

const toggleDropdown = () => {
    isDropdownOpen.value = !isDropdownOpen.value
}

const setTheme = (theme) => {
    currentTheme.value = theme

    if (theme === 'light') {
        document.body.classList.add('light-theme')
    } else {
        document.body.classList.remove('light-theme')
    }

    localStorage.setItem('theme', theme)
    isDropdownOpen.value = false
}

const handleClickOutside = (event) => {
    if (
        isDropdownOpen.value &&
        dropdownRef.value &&
        themeButtonRef.value &&
        !dropdownRef.value.contains(event.target) &&
        !themeButtonRef.value.contains(event.target)
    ) {
        isDropdownOpen.value = false
    }
}

onMounted(() => {
    document.addEventListener('click', handleClickOutside)

    const savedTheme = localStorage.getItem('theme')
    if (savedTheme === 'light') {
        currentTheme.value = 'light'
        document.body.classList.add('light-theme')
    } else {
        currentTheme.value = 'dark'
        document.body.classList.remove('light-theme')
    }
})

onUnmounted(() => {
    document.removeEventListener('click', handleClickOutside)
})
</script>

<template>
    <div class="space-y-6 max-w-xl mx-auto">
        <div class="space-y-4">
            <h2 class="text-xl">General</h2>
            <div class="flex items-center justify-between">
                <div class="flex items-center gap-1.5">
                    <span class="font-mono">1.</span>
                    <span>Theme</span>
                </div>

                <div class="relative">
                    <Transition enter-active-class="transition duration-200 ease-out"
                        enter-from-class="opacity-0 scale-95" enter-to-class="opacity-100 scale-100"
                        leave-active-class="transition duration-150 ease-in" leave-from-class="opacity-100 scale-100"
                        leave-to-class="opacity-0 scale-95">
                        <div v-if="isDropdownOpen" ref="dropdownRef"
                            class="absolute top-0 right-0 mb-2 w-full min-w-30 bg-thprimary/8 backdrop-blur-2xl border border-thgray-200/50 rounded-2xl overflow-hidden shadow-lg z-50">
                            <button @click="setTheme('dark')"
                                class="flex items-center gap-2 text-sm hover:bg-thprimary/10 active:bg-thprimary/12 transition-all duration-200 h-10 px-4 w-full"
                                :class="{ 'bg-thprimary/10 text-thprimary': currentTheme === 'dark' }">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                    stroke-width="1.5" stroke="currentColor" class="size-4">
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                        d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
                                </svg>
                                <span>Dark</span>
                                <svg v-if="currentTheme === 'dark'" xmlns="http://www.w3.org/2000/svg" fill="none"
                                    viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-4 ml-auto">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                                </svg>
                            </button>
                            <button @click="setTheme('light')"
                                class="flex items-center gap-2 text-sm hover:bg-thprimary/10 active:bg-thprimary/12 transition-all duration-200 h-10 px-4 w-full"
                                :class="{ 'bg-thprimary/10 text-thprimary': currentTheme === 'light' }">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                    stroke-width="1.5" stroke="currentColor" class="size-4">
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                        d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
                                </svg>
                                <span>Light</span>
                                <svg v-if="currentTheme === 'light'" xmlns="http://www.w3.org/2000/svg" fill="none"
                                    viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-4 ml-auto">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                                </svg>
                            </button>
                        </div>
                    </Transition>

                    <button ref="themeButtonRef" @click="toggleDropdown"
                        class="bg-thprimary/8 hover:bg-thprimary/10 active:bg-thprimary/12 border border-thgray-200/50 h-10 px-4 rounded-full text-thprimary text-sm transition-all duration-200 center gap-2"
                        :class="{ 'bg-thprimary/10': isDropdownOpen }">
                        <span>{{ currentTheme === 'dark' ? 'Dark' : 'Light' }}</span>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                            stroke="currentColor" class="size-4 transition-transform duration-200"
                            :class="{ 'rotate-180': isDropdownOpen, 'rotate-0': !isDropdownOpen }">
                            <path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>

        <div class="w-full h-px bg-thprimary/50"></div>

        <div class="flex items-center justify-between">
            <div class="flex items-center gap-1.5">
                <span class="font-mono">1.</span>
                <span>Keyboard shortcuts</span>
            </div>

            <nuxt-link to="/settings/keyboard-shortcuts"
                class="h-10 px-4 pt-px flex justify-center items-center gap-2 text-sm bg-thprimary/8 hover:bg-thprimary/10 active:bg-thprimary/12 transition-all duration-200 border border-thgray-200/50 rounded-full">
                <span>More details</span>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                    stroke="currentColor" class="size-4">
                    <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                </svg>
            </nuxt-link>
        </div>
    </div>
</template>