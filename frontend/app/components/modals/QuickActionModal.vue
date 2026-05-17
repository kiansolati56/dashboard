<script setup>
import { useRouter } from 'vue-router'
import { useModals } from '~/composables/useModals'

const emit = defineEmits(['upload'])
const router = useRouter()
const modals = useModals()

const actions = [
    { label: 'Create a project', to: '/projects/create-new', icon: 'M2.25 12.75V12A2.25 2.25 0 0 1 4.5 9.75h15A2.25 2.25 0 0 1 21.75 12v.75m-8.69-6.44-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z' },
    { label: 'Create a task', to: '/tasks/new', icon: 'M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z' },
    { label: 'Upload a file', action: 'upload', icon: 'M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z' },
    { label: 'Add a note', to: '/notes/new', icon: 'm16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10' }
]

const handleAction = (item) => {
    if (item.action === 'upload') {
        emit('upload')
        modals.closeQuick()
        return
    }
    if (item.to) {
        router.push(item.to)
        modals.closeQuick()
    }
}

const shortcutHandler = (e) => {
    if (e.altKey && e.key === 'q' && !modals.quickOpen.value && !modals.searchOpen.value && !modals.uploadOpen.value) {
        e.preventDefault()
        modals.openQuick()
    }
}

onMounted(() => {
    window.addEventListener('keydown', shortcutHandler)
})

onUnmounted(() => {
    window.removeEventListener('keydown', shortcutHandler)
})
</script>

<template>
    <ModalsBaseModal v-model="modals.quickOpen.value" :overlay="false">
        <div
            class="w-full max-w-xl overflow-hidden bg-thprimarybackground p-4 relative rounded-3xl border border-thgray-200/50 shadow-2xl shadow-thprimary/8">
            <h2 class="font-mono text-lg text-center">Quick Actions</h2>
            <div class="grid grid-cols-2 md:grid-cols-4 gap-2 mt-3">
                <button v-for="item in actions" :key="item.label"
                    class="size-full center border border-thgray-200/50 rounded-xl flex flex-col items-center py-5 bg-thprimary/5 hover:bg-thprimary/8 active:bg-thprimary/10 transition-all duration-200"
                    @click="handleAction(item)">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" class="size-8">
                        <path stroke-linecap="round" stroke-linejoin="round" :d="item.icon" />
                    </svg>
                    <h3 class="text-thprimary/50 mt-5 text-sm">
                        <span>{{ item.label }}</span>
                    </h3>
                </button>
            </div>
        </div>
    </ModalsBaseModal>
</template>