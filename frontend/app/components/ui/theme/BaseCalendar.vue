<script setup lang="ts">
import { ref, computed } from 'vue'
import type { DayCell } from '~/composables/useCalendar'
import { useCalendar } from '~/composables/useCalendar'

interface Plan {
    id: number
    title: string
    description: string
    date: string
}

const props = defineProps<{
    plans: Plan[]
}>()

const emit = defineEmits<{
    (e: 'deletePlan', id: number): void
}>()

const today = new Date()
const minYear = today.getFullYear()
const maxYear = minYear + 2

const currentYear = ref(today.getFullYear())
const currentMonth = ref(today.getMonth())

const selectedPlan = ref<Plan | null>(null)
const isModalOpen = ref(false)

const { generateMonthDays, monthNames } = useCalendar()

const allWeeks = computed(() => {
    return generateMonthDays(currentYear.value, currentMonth.value)
})

const weeks = computed(() => {
    return allWeeks.value.slice(0, 5)
})

const canGoPrev = computed(() => {
    return !(currentYear.value === minYear && currentMonth.value === 0)
})

const canGoNext = computed(() => {
    return !(currentYear.value === maxYear && currentMonth.value === 11)
})

const goPrevMonth = () => {
    if (!canGoPrev.value) return
    if (currentMonth.value === 0) {
        currentMonth.value = 11
        currentYear.value--
    } else {
        currentMonth.value--
    }
}

const goNextMonth = () => {
    if (!canGoNext.value) return
    if (currentMonth.value === 11) {
        currentMonth.value = 0
        currentYear.value++
    } else {
        currentMonth.value++
    }
}

const getPlanForDate = (date: Date): Plan | undefined => {
    const dateStr = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
    return props.plans.find(p => p.date === dateStr)
}

const isToday = (date: Date): boolean => {
    return date.getDate() === today.getDate() &&
        date.getMonth() === today.getMonth() &&
        date.getFullYear() === today.getFullYear()
}

const openPlanModal = (plan: Plan) => {
    selectedPlan.value = plan
    isModalOpen.value = true
}

const handleDelete = () => {
    if (selectedPlan.value) {
        emit('deletePlan', selectedPlan.value.id)
        isModalOpen.value = false
        selectedPlan.value = null
    }
}

const handleConfirm = () => {
    isModalOpen.value = false
    selectedPlan.value = null
}
</script>

<template>
    <div class="space-y-4">
        <div class="flex justify-between items-center">
            <span class="text-thprimary text-lg font-medium">{{ monthNames[currentMonth] }} {{ currentYear }}</span>
            <div class="flex items-center gap-2">
                <button :disabled="!canGoPrev"
                    class="size-8 rounded-full bg-thprimary/5 hover:bg-thprimary/8 active:bg-thprimary/10 border border-thgray-200/50 center text-thprimary transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed!"
                    @click="goPrevMonth">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" class="size-4">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                    </svg>
                </button>

                <button :disabled="!canGoNext"
                    class="size-8 rounded-full bg-thprimary/5 hover:bg-thprimary/8 active:bg-thprimary/10 border border-thgray-200/50 center text-thprimary transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed!"
                    @click="goNextMonth">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" class="size-4 rotate-180">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                    </svg>
                </button>
            </div>
        </div>

        <div class="bg-thprimary/5 border border-thgray-200/50 rounded-2xl p-6">
            <div class="w-full grid grid-cols-7 gap-4 text-thprimary/80 font-mono mb-0.5">
                <span>Mon</span>
                <span>Tue</span>
                <span>Wed</span>
                <span>Thu</span>
                <span>Fri</span>
                <span>Sat</span>
                <span>Sun</span>
            </div>

            <div
                class="grid grid-cols-7 gap-4 mt-7 text-thprimary/60 font-mono [&_button]:center [&_button]:size-7 [&_button]:rounded-full [&_button]:border [&_button]:border-transparent [&_button]:hover:bg-thprimary/8 [&_button]:active:bg-thprimary/10 [&_button]:transition-colors [&_button]:duration-200 [&_button]:shrink-0 [&_button]:pb-0.5">
                <template v-for="(week, weekIdx) in weeks" :key="weekIdx">
                    <button v-for="(day, dayIdx) in week" :key="dayIdx" :class="[
                        !day.isCurrentMonth && 'text-thprimary/15',
                        day.isCurrentMonth && getPlanForDate(day.date) && 'bg-thprimary/4',
                        isToday(day.date) && 'bg-thprimary/5 border-thgray-200/50!'
                    ]" @click="() => {
            const plan = getPlanForDate(day.date)
            if (plan && day.isCurrentMonth) openPlanModal(plan)
        }">
                        {{ day.dayNumber }}
                    </button>
                </template>
            </div>
        </div>
    </div>

    <ModalsBaseModal v-model="isModalOpen" :overlay="true">
        <div v-if="selectedPlan" class="bg-thprimarybackground rounded-2xl border border-thgray-200 p-6 w-96 space-y-4">
            <h3 class="text-xl font-medium text-thprimary">{{ selectedPlan.title }}</h3>
            <p class="text-thprimary/70">{{ selectedPlan.description }}</p>
            <p class="text-sm font-mono text-thprimary/50">{{ selectedPlan.date }}</p>
            <div class="flex justify-end gap-3 pt-4">
                <button class="px-4 py-2 rounded-full bg-thprimary/10 hover:bg-thprimary/15 text-thprimary transition"
                    @click="handleConfirm">
                    Confirm
                </button>
                <button class="px-4 py-2 rounded-full bg-red-500/20 hover:bg-red-500/30 text-red-400 transition"
                    @click="handleDelete">
                    Delete
                </button>
            </div>
        </div>
    </ModalsBaseModal>
</template>