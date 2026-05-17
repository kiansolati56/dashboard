<script setup>
definePageMeta({
    middleware: 'auth',
    title: 'Users'
})

const router = useRouter()
const route = useRoute()

const members = ref([
    {
        id: 1,
        avatar_url: '/images/kian-profile.png',
        name: 'Kian',
        username: 'mrcrowlley',
        email: 'kiansolati56@gmail.com',
        last_online_at: '2 minutes ago'
    },
    {
        id: 2,
        avatar_url: '/images/kevin-profile.jpg',
        name: 'Mohammadreza',
        username: 'mohammadreza',
        email: 'mohammadreza@gmail.com',
        last_online_at: '4 minutes ago'
    }
])

const searchQuery = ref('')
const searchInputRef = ref(null)

const itemsPerPage = 5
const currentPage = ref(Number(route.query.page) || 1)

const filteredMembers = computed(() => {
    const q = searchQuery.value.trim().toLowerCase()
    if (!q) return members.value

    return members.value.filter(m =>
        m.name.toLowerCase().includes(q) ||
        m.username.toLowerCase().includes(q) ||
        m.email.toLowerCase().includes(q)
    )
})

const sortedMembers = computed(() => {
    return [...filteredMembers.value].sort((a, b) => a.id - b.id)
})

const totalItems = computed(() => sortedMembers.value.length)

const totalPages = computed(() =>
    Math.max(1, Math.ceil(totalItems.value / itemsPerPage))
)

const paginatedMembers = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage
    return sortedMembers.value.slice(start, start + itemsPerPage)
})

watch([totalPages], () => {
    if (currentPage.value > totalPages.value) {
        currentPage.value = totalPages.value
    }
    if (currentPage.value < 1) {
        currentPage.value = 1
    }
})

watch(currentPage, (val) => {
    router.push({
        path: '/users',
        query: val > 1 ? { page: val } : {}
    })
})

const paginationRange = computed(() => {
    if (totalPages.value <= 4) {
        return Array.from({ length: totalPages.value }, (_, i) => i + 1)
    }
    return [1, 2, '...', totalPages.value]
})

const focusSearchInput = () => {
    searchInputRef.value?.focus()
}

const handleKeydown = (event) => {
    if (event.key === '/' && document.activeElement !== searchInputRef.value) {
        event.preventDefault()
        focusSearchInput()
    }
}

onMounted(() => {
    document.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
    document.removeEventListener('keydown', handleKeydown)
})
</script>

<template>
    <div class="flex justify-between w-full mb-6">
        <div class="relative group">
            <input ref="searchInputRef" v-model="searchQuery" type="text" placeholder="Search..."
                class="h-9 w-55 focus:w-60 px-4 pl-10 pt-px font-mono rounded-lg bg-thprimary/8 border border-thgray-200/50 text-sm text-thprimary placeholder-thprimary/40 focus:outline-none hover:border-thgray-200 focus:border-thgray-200 transition-all duration-200">
            <svg class="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-thprimary/40"
                xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round"
                    d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
            </svg>

            <button @click="focusSearchInput"
                class="h-5 px-1 border border-thgray-200/50 rounded-md center text-xs font-mono bg-thgray-100 absolute right-4 top-1/2 -translate-y-1/2 hover:bg-thgray-200 transition">
                /
            </button>
        </div>

        <nuxt-link to="/users/create-new"
            class="size-9 shrink-0 center bg-thprimary/8 hover:bg-thprimary/10 active:bg-thprimary/12 transition-all duration-300 rounded-lg border border-thgray-200/50">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                stroke="currentColor" class="size-5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
        </nuxt-link>

    </div>
    <div>
        <div class="overflow-x-auto rounded-xl border border-thgray-200/50 overflow-hidden">
            <table class="min-w-full divide-y divide-thgray-200/50">
                <thead class="bg-thprimary/5">
                    <tr>
                        <th class="px-6 py-3 text-left text-xs font-mono text-thprimary/70 uppercase tracking-wider">
                            <div class="flex items-center gap-1">ID</div>
                        </th>
                        <th
                            class="px-6 py-3 text-left text-xs font-mono text-thprimary/70 uppercase tracking-wider cursor-pointer hover:bg-thprimary/8 transition">
                            <div class="flex items-center gap-1">Profile</div>
                        </th>
                        <th
                            class="px-6 py-3 text-left text-xs font-mono text-thprimary/70 uppercase tracking-wider cursor-pointer hover:bg-thprimary/8 transition">
                            <div class="flex items-center gap-1">Name</div>
                        </th>
                        <th
                            class="px-6 py-3 text-left text-xs font-mono text-thprimary/70 uppercase tracking-wider cursor-pointer hover:bg-thprimary/8 transition">
                            <div class="flex items-center gap-1">Username</div>
                        </th>
                        <th
                            class="px-6 py-3 text-left text-xs font-mono text-thprimary/70 uppercase tracking-wider cursor-pointer hover:bg-thprimary/8 transition">
                            <div class="flex items-center gap-1">Email</div>
                        </th>
                        <th @click="changeSort('created_at')"
                            class="px-6 py-3 text-left text-xs font-mono text-thprimary/70 uppercase tracking-wider cursor-pointer hover:bg-thprimary/8 transition">
                            <div class="flex items-center gap-1">Last online at</div>
                        </th>
                        <th class="px-6 py-3 text-right text-xs font-mono text-thprimary/70 uppercase tracking-wider">
                            Details</th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-thgray-200/50 bg-thprimary/5">
                    <tr v-for="item in paginatedMembers" :key="item.id" class="hover:bg-thprimary/8 transition">
                        <td class="px-5 py-3 whitespace-nowrap text-sm">{{ item.id }}</td>
                        <td class="px-5 py-3 whitespace-nowrap text-sm font-medium text-thprimary">
                            <div
                                class="size-10 rounded-full overflow-hidden transition-all duration-200 border border-thgray-200/50 p-0.5 relative">
                                <nuxt-img class="size-full object-cover rounded-full" :src="item.avatar_url" />
                            </div>
                        </td>
                        <td class="px-5 py-3 whitespace-nowrap text-sm text-thprimary/70">{{ item.name }}
                        </td>
                        <td class="px-5 py-3 whitespace-nowrap text-sm text-thprimary/70">{{ item.username }}
                        </td>
                        <td class="px-5 py-3 whitespace-nowrap text-sm text-thprimary/70">{{ item.email }}
                        </td>
                        <td class="px-5 py-3 whitespace-nowrap text-sm text-thprimary/70">{{ item.last_online_at }}
                        </td>
                        <td class="px-5 py-3 whitespace-nowrap text-right text-sm">
                            <nuxt-link to="/users/@mrcrowlley"
                                class="px-3 py-1.5 rounded-lg bg-thprimary/10 text-thprimary text-sm hover:bg-thprimary/20 transition">
                                Details
                            </nuxt-link>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>