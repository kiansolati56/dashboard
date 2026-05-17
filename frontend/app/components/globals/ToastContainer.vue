<script setup>
import { useToast } from '~/composables/useToast'

const { toasts } = useToast()

const typeClasses = {
    success: 'bg-emerald-950/70 border-emerald-500/50 text-emerald-100',
    error: 'bg-rose-950/70 border-rose-500/50 text-rose-100',
    warning: 'bg-amber-950/70 border-amber-500/50 text-amber-100',
    info: 'bg-sky-950/70 border-sky-500/50 text-sky-100'
}
</script>

<template>
    <div class="fixed top-5 left-1/2 -translate-x-1/2 z-300 flex flex-col items-center gap-3 pointer-events-none">
        <TransitionGroup name="toast" tag="div"
            class="flex flex-col items-center gap-3 w-full max-w-md pointer-events-auto">
            <div v-for="toast in toasts" :key="toast.value.id" :class="['gap-2 h-10 px-4 rounded-full backdrop-blur-md shadow-2xl border w-full transition-all center',
                typeClasses[toast.value.type]]" role="alert">
                <div class="shrink-0">
                    <!-- <UiIconSuccess v-if="toast.value.type === 'success'" class="size-5 text-emerald-400" />
                    <UiIconError v-else-if="toast.value.type === 'error'" class="size-5 text-rose-400" />
                    <UiIconWarning v-else-if="toast.value.type === 'warning'" class="size-5 text-amber-400" />
                    <UiIconInfo v-else class="size-5 text-sky-400" /> -->
                </div>

                <div class="flex-1 text-sm font-medium leading-relaxed mt-0.5">
                    {{ toast.value.message }}
                </div>
            </div>
        </TransitionGroup>
    </div>
</template>

<style scoped>
.toast-enter-active,
.toast-leave-active {
    transition: all 0.4s cubic-bezier(0.34, 1.3, 0.55, 1);
}

.toast-enter-from {
    opacity: 0;
    transform: translateY(-40px) scale(0.85);
}

.toast-enter-to {
    opacity: 1;
    transform: translateY(0) scale(1);
}

.toast-leave-from {
    opacity: 1;
    transform: translateY(0) scale(1);
}

.toast-leave-to {
    opacity: 0;
    transform: translateY(-30px) scale(0.9);
}

.toast-move {
    transition: all 0.3s ease;
}
</style>