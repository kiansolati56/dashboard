<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'

const props = defineProps({
    modelValue: Boolean,
    overlay: {
        type: Boolean,
        default: true
    }
})
const emit = defineEmits(['update:modelValue'])

const close = () => {
    emit('update:modelValue', false)
}

const handleKeydown = (e: KeyboardEvent) => {
    if (e.key === 'Escape' && props.modelValue) {
        close()
    }
}

onMounted(() => {
    window.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
    window.removeEventListener('keydown', handleKeydown)
})
</script>

<template>
    <Teleport to="body">
        <Transition enter-active-class="transition-transform transition-opacity duration-200 ease-out"
            enter-from-class="opacity-0 translate-y-2" enter-to-class="opacity-100 translate-y-0"
            leave-active-class="transition duration-150 ease-in" leave-from-class="opacity-100 translate-y-0"
            leave-to-class="opacity-0 translate-y-2">
            <div v-if="modelValue" class="fixed inset-0 z-150 flex justify-center items-start pt-[10vh] px-10"
                :class="overlay ? 'bg-thsecondary/60' : ''" @click.self="close">
                <slot />
            </div>
        </Transition>
    </Teleport>
</template>