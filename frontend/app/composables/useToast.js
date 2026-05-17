import { ref, shallowRef } from 'vue'

const toasts = ref([])
let nextId = 0

export function useToast() {
    const removeToast = (id) => {
        const index = toasts.value.findIndex(t => t.value.id === id)
        if (index !== -1) {
            toasts.value.splice(index, 1)
        }
    }

    const addToast = (message, options = {}) => {
        const id = nextId++
        const type = options.type || 'info'
        const duration = options.duration ?? 3000
        const position = options.position || 'top-center'
        const closable = options.closable ?? true

        const toast = shallowRef({
            id,
            message,
            type,
            duration,
            position,
            closable,
            createdAt: Date.now()
        })

        toasts.value.push(toast)

        if (duration > 0) {
            setTimeout(() => {
                removeToast(id)
            }, duration)
        }

        return id
    }

    const success = (message, options = {}) => addToast(message, { ...options, type: 'success' })
    const error = (message, options = {}) => addToast(message, { ...options, type: 'error' })
    const warning = (message, options = {}) => addToast(message, { ...options, type: 'warning' })
    const info = (message, options = {}) => addToast(message, { ...options, type: 'info' })

    return {
        toasts,
        addToast,
        removeToast,
        success,
        error,
        warning,
        info
    }
}