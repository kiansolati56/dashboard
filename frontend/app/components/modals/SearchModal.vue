// components/SearchModal.vue
<script setup>
import { ref, computed, watch, nextTick, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useModals } from '~/composables/useModals'

const emit = defineEmits(['logout'])
const router = useRouter()
const modals = useModals()

const query = ref('')
const selectedIndex = ref(0)
const searchInput = ref(null)
const itemRefs = ref([])

const items = [
    { label: 'Dashboard', to: '/dashboard', icon: '<path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z" />' },
    { label: 'Projects', to: '/projects', icon: '<path stroke-linecap="round" stroke-linejoin="round" d="M2.25 12.75V12A2.25 2.25 0 0 1 4.5 9.75h15A2.25 2.25 0 0 1 21.75 12v.75m-8.69-6.44-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z" />' },
    { label: 'Notes', to: '/notes', icon: '<path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />' },
    { label: 'Files', to: '/files', icon: '<path stroke-linecap="round" stroke-linejoin="round" d="M2.25 15a4.5 4.5 0 0 0 4.5 4.5H18a3.75 3.75 0 0 0 1.332-7.257 3 3 0 0 0-3.758-3.848 5.25 5.25 0 0 0-10.233 2.33A4.502 4.502 0 0 0 2.25 15Z" />' },
    { label: 'Tasks', to: '/tasks', icon: '<path stroke-linecap="round" stroke-linejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z" />' },
    { label: 'Settings', to: '/settings', icon: '<path stroke-linecap="round" stroke-linejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z" /><path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />' },
    { label: 'Profile', to: '/settings/profile', icon: '<path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />' },
    { label: 'Logout', action: 'logout', icon: '<path stroke-linecap="round" stroke-linejoin="round" d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15" />' }
]

const filteredItems = computed(() => {
    if (!query.value.trim()) return items
    const q = query.value.toLowerCase()
    return items.filter(item => item.label.toLowerCase().includes(q))
})

const setItemRef = (el, index) => {
    if (el) itemRefs.value[index] = el
}

const navigateToItem = (item) => {
    if (item.action === 'logout') {
        emit('logout')
    } else if (item.to) {
        router.push(item.to)
    }
    modals.closeSearch()
}

const handleKeydown = (e) => {
    if (e.key === 'Escape') {
        modals.closeSearch()
        return
    }
    if (e.key === 'ArrowDown') {
        e.preventDefault()
        selectedIndex.value = Math.min(selectedIndex.value + 1, filteredItems.value.length - 1)
        scrollToSelected()
    } else if (e.key === 'ArrowUp') {
        e.preventDefault()
        selectedIndex.value = Math.max(selectedIndex.value - 1, 0)
        scrollToSelected()
    } else if (e.key === 'Enter') {
        e.preventDefault()
        if (filteredItems.value.length > 0) {
            navigateToItem(filteredItems.value[selectedIndex.value])
        }
    }
}

const scrollToSelected = () => {
    nextTick(() => {
        const el = itemRefs.value[selectedIndex.value]
        if (el) el.scrollIntoView({ block: 'nearest', behavior: 'smooth' })
    })
}

watch(() => modals.searchOpen.value, async (val) => {
    if (val) {
        query.value = ''
        selectedIndex.value = 0
        await nextTick()
        searchInput.value?.focus()
    }
})

watch(filteredItems, () => {
    itemRefs.value = []
    selectedIndex.value = 0
})

let shortcutHandler = null

onMounted(() => {
    shortcutHandler = (e) => {
        if ((e.ctrlKey || e.metaKey) && e.code === 'Space' && !modals.searchOpen.value && !modals.quickOpen.value && !modals.uploadOpen.value) {
            e.preventDefault()
            modals.openSearch()
        }
    }
    window.addEventListener('keydown', shortcutHandler)
})

onUnmounted(() => {
    if (shortcutHandler) {
        window.removeEventListener('keydown', shortcutHandler)
        shortcutHandler = null
    }
})
</script>

<template>
    <ModalsBaseModal v-model="modals.searchOpen.value" :overlay="false">
        <div
            class="w-full max-w-2xl h-68 sm:h-100 overflow-hidden bg-thprimarybackground pt-4 px-4 relative rounded-3xl border border-thgray-200/50 shadow-2xl shadow-thprimary/8">
            <div class="w-[calc(100%-16px)] h-12 absolute left-1/2 -translate-x-1/2 top-2 z-30">
                <div class="relative w-full h-10 mb-4">
                    <input ref="searchInput" v-model="query" type="text"
                        class="w-full h-10 outline-none px-4 placeholder:text-sm font-mono pl-11 pb-0.5"
                        placeholder="What do you need?" @keydown="handleKeydown" />
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" class="size-4 text-thprimary/50 absolute top-1/2 -translate-y-1/2 left-4">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                    </svg>
                    <div
                        class="h-5 px-1 border border-thgray-200/50 rounded-md center absolute top-1/2 -translate-y-1/2 right-4 text-xs font-mono bg-thgray-100">
                        esc
                    </div>
                </div>
            </div>

            <div class="size-full pt-11">
                <div v-if="filteredItems.length === 0"
                    class="text-sm text-thprimary/50 italic mt-35 font-mono text-center">
                    Nothing found. try search something else
                </div>
                <ul v-else class="w-full space-y-1 overflow-y-auto max-h-[calc(100%-1.125rem)] hide-scrollbar">
                    <li v-for="(item, index) in filteredItems" :key="item.label" :ref="el => setItemRef(el, index)"
                        class="flex items-center gap-2 px-2 h-9 rounded-xl transition-all duration-200 cursor-pointer"
                        :class="{
                            'bg-thprimary/8': index === selectedIndex,
                            'hover:bg-thprimary/10': index !== selectedIndex
                        }" @click="navigateToItem(item)" @mouseenter="selectedIndex = index">
                        <svg v-if="item.icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                            stroke-width="1.5" stroke="currentColor" class="size-5" v-html="item.icon"></svg>
                        <span class="text-sm mt-0.5 text-thprimary font-mono">{{ item.label }}</span>
                    </li>
                </ul>
            </div>
        </div>
    </ModalsBaseModal>
</template>