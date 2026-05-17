<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useModals } from '~/composables/useModals'

definePageMeta({
    breadcrumb: false,
    title: 'Dashboard'
})

const modals = useModals()

const currentDate = computed(() => {
    const date = new Date()
    return date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
})

const currentTime = computed(() => {
    const date = new Date()
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
})

const hrRef = ref(null)
const minRef = ref(null)
const secRef = ref(null)

let intervalId = null

onMounted(() => {
    function updateClock() {
        const date = new Date()
        const hr = date.getHours() % 12
        const min = date.getMinutes()
        const sec = date.getSeconds()

        const hrDeg = hr * 30 + min * 0.5
        const minDeg = min * 6 + sec * 0.1
        const secDeg = sec * 6

        if (hrRef.value) hrRef.value.style.transform = `rotate(${hrDeg}deg)`
        if (minRef.value) minRef.value.style.transform = `rotate(${minDeg}deg)`
        if (secRef.value) secRef.value.style.transform = `rotate(${secDeg}deg)`
    }

    updateClock()
    intervalId = setInterval(updateClock, 1000)
})

onUnmounted(() => {
    if (intervalId) clearInterval(intervalId)
})

const samplePlans = ref([
    {
        id: 1,
        title: 'Team Sync',
        description: 'Weekly sync with the development team to discuss progress and blockers.',
        date: '2026-05-11'
    },
    {
        id: 2,
        title: 'Client Call',
        description: 'Presentation of new features to the client.',
        date: '2026-05-15'
    },
    {
        id: 3,
        title: 'Design Review',
        description: 'Review UI mockups for the upcoming release.',
        date: '2026-05-20'
    }
])
</script>

<template>
    <div
        class="w-full p-5 md:p-6 rounded-2xl border border-thgray-200/50 bg-linear-to-br from-[#d7dde830] to-[#757f9a30] overflow-hidden relative flex items-center justify-between mb-6 md:mb-10">
        <div>
            <h1 class="text-thprimary text-2xl font-medium">Welcome back, Kian!</h1>
            <p class="text-thprimary/50 mt-2">Ready when you are...</p>
        </div>

        <div class="hidden md:block">
            <button
                class="h-10 px-4 flex justify-center items-center gap-1.5 bg-thprimary/90 hover:bg-thprimary transition-all duration-200 rounded-full border border-thgray-200/50 text-thblack text-sm font-mono">
                <span>Projects</span>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                    stroke="currentColor" class="size-4.5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                </svg>
            </button>
        </div>

        <svg class="opacity-1 absolute inset-0 -z-10" viewBox="0 0 200 200" xmlns='http://www.w3.org/2000/svg'>

            <filter id='noiseFilter'>
                <feTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch' />
            </filter>

            <rect width='100%' height='100%' filter='url(#noiseFilter)' />
        </svg>
    </div>

    <div class="flex flex-col md:flex-row md:items-start">
        <div class="w-full md:w-90 shrink-0 md:pr-8 md:border-r border-thgray-200/50">
            <h2 class="text-thprimary flex items-center gap-2 w-full">
                <small class="text-lg md:text-2xl font-medium">•</small>
                <small class="text-xl">Date & Time</small>
            </h2>

            <div class="flex flex-col sm:flex-row-reverse md:flex-col items-start gap-y-6 sm:gap-4 mt-4 md:mt-0">
                <div
                    class="w-full sm:w-70 shrink-0 md:w-full p-4 bg-thprimary/5 border border-thgray-200/50 rounded-2xl flex items-end gap-3 sm:mt-12 md:mb-8 md:mt-4">
                    <div class="relative size-24">
                        <div class="size-24 rounded-full center bg-thgray-200/40 border border-thgray-200">
                            <div class="absolute size-1 bg-thprimary rounded-full z-10 border border-thprimary"></div>
                            <div ref="hrRef"
                                class="absolute bottom-1/2 left-1/2 -translate-x-1/2 origin-bottom w-0.5 h-6 bg-thprimary/8 rounded-full">
                            </div>
                            <div ref="minRef"
                                class="absolute bottom-1/2 left-1/2 -translate-x-1/2 origin-bottom w-0.5 h-8 bg-thprimary/10 rounded-full">
                            </div>
                            <div ref="secRef"
                                class="absolute bottom-1/2 left-1/2 -translate-x-1/2 origin-bottom w-0.5 h-10 bg-thprimary rounded-full">
                            </div>
                        </div>
                    </div>

                    <div class="flex flex-col">
                        <span class="font-medium text-thprimary">{{ currentTime }}</span>
                        <span class="text-sm text-thprimary/50">{{ currentDate }}</span>
                    </div>
                </div>

                <div class="w-full grow">
                    <UiThemeBaseCalendar :plans="samplePlans" @deletePlan="handleDeletePlan" />
                </div>
            </div>
        </div>
        <div class="md:grow w-full md:pl-8 mt-12 md:mt-0">
            <div>
                <h2 class="text-thprimary flex items-center gap-2">
                    <small class="text-lg md:text-2xl font-medium">•</small>
                    <small class="text-xl">Statistics Overview</small>
                </h2>
                <div class="grid sm:grid-cols-2 xl:grid-cols-3 gap-3 mt-4">
                    <div class="w-full p-4 bg-thprimary/5 rounded-2xl border border-thgray-200/50">
                        <div class="flex items-center gap-3">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                stroke="currentColor" class="size-8">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="M2.25 12.75V12A2.25 2.25 0 0 1 4.5 9.75h15A2.25 2.25 0 0 1 21.75 12v.75m-8.69-6.44-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z" />
                            </svg>
                            <h3 class="font-mono mt-1 text-xl">10</h3>
                        </div>
                        <div class="pl-1 mt-1">
                            <p class="text-sm text-thprimary/50 mb-2">Active Projects</p>
                            <p class="text-thprimary/40 font-light -mt-1 text-sm">16 completed</p>
                        </div>
                    </div>

                    <div class="w-full p-4 bg-thprimary/5 rounded-2xl border border-thgray-200/50">
                        <div class="flex items-center gap-3">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                stroke="currentColor" class="size-8">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                            </svg>
                            <h3 class="font-mono mt-1 text-xl">14</h3>
                        </div>
                        <div class="pl-1 mt-1">
                            <p class="text-sm text-thprimary/50 mb-2">Active Tasks</p>
                            <p class="text-thprimary/40 font-light -mt-1 text-sm">34 completed</p>
                        </div>
                    </div>

                    <div class="w-full p-4 bg-thprimary/5 rounded-2xl border border-thgray-200/50">
                        <div class="flex items-center gap-3">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                stroke="currentColor" class="size-8">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                            </svg>
                            <h3 class="font-mono mt-1 text-xl">3</h3>
                        </div>
                        <div class="pl-1 mt-1">
                            <p class="text-sm text-thprimary/50 mb-2">Deadlines</p>
                            <p class="text-thprimary/40 font-light -mt-1 text-sm">4 completed</p>
                        </div>
                    </div>
                </div>
            </div>

            <div class="grid md:grid-cols-12 gap-3 md:gap-4 items-start mt-10 sm:mt-3 md:mt-10">
                <div class="col-span-full 2xl:col-span-7 w-full">
                    <h2 class="text-thprimary flex items-center gap-2">
                        <small class="text-lg md:text-2xl font-medium">•</small>
                        <small class="text-xl">Recent Projects</small>
                    </h2>
                    <div class="space-y-3 mt-4">
                        <nuxt-link to="/dashboard"
                            class="flex justify-between items-center p-4 bg-thprimary/5 rounded-2xl border border-thgray-200/50 hover:bg-thprimary/8 active:bg-thprimary/10 transition-all duration-200">
                            <div class="flex items-center gap-2">
                                <div class="size-1.5 rounded-full bg-sky-400"></div>
                                <div class="flex flex-col">
                                    <h3 class="text-xs sm:text-sm text-thprimary">MVP Bargee</h3>
                                    <span class="text-xs text-thprimary/50 font-mono">Bargee</span>
                                </div>
                            </div>
                            <div class="w-24 sm:w-42 relative">
                                <div class="bg-thprimary/8 h-1 sm:h-1.5 rounded-full"></div>
                                <div class="bg-thprimary absolute inset-0 rounded-full w-12 sm:w-26"></div>
                            </div>
                        </nuxt-link>
                        <nuxt-link to="/dashboard"
                            class="flex justify-between items-center p-4 bg-thprimary/5 rounded-2xl border border-thgray-200/50 hover:bg-thprimary/8 active:bg-thprimary/10 transition-all duration-200">
                            <div class="flex items-center gap-2">
                                <div class="size-1.5 rounded-full bg-yellow-400"></div>
                                <div class="flex flex-col">
                                    <h3 class="text-xs sm:text-sm text-thprimary">MVP Dashboard</h3>
                                    <span class="text-xs text-thprimary/50 font-mono">Dashboard</span>
                                </div>
                            </div>
                            <div class="w-24 sm:w-42 relative">
                                <div class="bg-thprimary/8 h-1 sm:h-1.5 rounded-full"></div>
                                <div class="bg-thprimary absolute inset-0 rounded-full w-5 sm:w-16"></div>
                            </div>
                        </nuxt-link>
                    </div>
                </div>

                <div class="col-span-full 2xl:col-span-5 w-full mt-10 sm:mt-0">
                    <h2 class="text-thprimary flex items-center gap-2">
                        <small class="text-lg md:text-2xl font-medium">•</small>
                        <small class="text-xl">Activity Feed</small>
                    </h2>
                    <div class="space-y-4 mt-4">
                        <div
                            class="flex justify-start items-center p-4 bg-thprimary/5 rounded-2xl border border-thgray-200/50">
                            <div class="flex items-center gap-2">
                                <div class="size-1.5 rounded-full bg-thprimary/60"></div>
                                <div
                                    class="size-8 sm:size-10 rounded-full border border-thgray-200/50 overflow-hidden shrink-0">
                                    <nuxt-img class="size-full object-cover" src="/images/kian-profile.png" />
                                </div>
                                <div class="flex flex-col">
                                    <h3 class="text-xs sm:text-sm text-thprimary">Kian Completed task "Design header"
                                    </h3>
                                    <span class="text-xs text-thprimary/50 font-mono">Bargee</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.fade-slide-enter-active,
.fade-slide-leave-active {
    transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.fade-slide-enter-from {
    opacity: 0;
    transform: translateY(8px) scale(0.98);
}

.fade-slide-leave-to {
    opacity: 0;
    transform: translateY(-8px) scale(0.98);
}

.fade-slide-enter-to,
.fade-slide-leave-from {
    opacity: 1;
    transform: translateY(0) scale(1);
}
</style>