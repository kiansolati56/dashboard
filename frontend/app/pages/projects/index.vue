<script setup>
definePageMeta({
    middleware: 'auth',
    title: 'Projects'
})

const router = useRouter()
const route = useRoute()

const projects = ref([
    { id: 1, creator: 'Kian', title: 'E-commerce Dashboard', description: 'Modern dashboard for online store with analytics and inventory management', status: 'Active', category: 'Development', created_at: '2025-03-15', assigned_to: 'Alex Morgan', thumbnail: 'https://picsum.photos/id/1/200/150', priority: 'High' },
    { id: 2, creator: 'Kian', title: 'Brand Identity Design', description: 'Complete brand identity including logo, typography, color palette and guidelines', status: 'Completed', category: 'Design', created_at: '2025-02-10', assigned_to: 'Sarah Chen', thumbnail: 'https://picsum.photos/id/20/200/150', priority: 'Medium' },
    { id: 3, creator: 'Kian', title: 'Mobile App UI/UX', description: 'User interface and experience design for fitness tracking mobile app', status: 'Active', category: 'Design', created_at: '2025-03-20', assigned_to: 'Michael Brown', thumbnail: 'https://picsum.photos/id/26/200/150', priority: 'High' },
    { id: 4, creator: 'Kian', title: 'API Integration', description: 'Integrate third-party payment gateway and notification services', status: 'On Hold', category: 'Development', created_at: '2025-01-05', assigned_to: 'Jessica Lee', thumbnail: 'https://picsum.photos/id/29/200/150', priority: 'Low' },
    { id: 5, creator: 'Kian', title: 'Marketing Campaign', description: 'Digital marketing campaign for product launch across social media', status: 'Active', category: 'Marketing', created_at: '2025-03-25', assigned_to: 'David Kim', thumbnail: 'https://picsum.photos/id/36/200/150', priority: 'Medium' },
    { id: 6, creator: 'Kian', title: 'Backend Refactoring', description: 'Optimize database queries and restructure API endpoints', status: 'Active', category: 'Development', created_at: '2025-03-18', assigned_to: 'Emily Watson', thumbnail: 'https://picsum.photos/id/42/200/150', priority: 'High' },
    { id: 7, creator: 'Kian', title: 'SEO Optimization', description: 'Improve search engine ranking and website performance', status: 'Completed', category: 'Marketing', created_at: '2025-02-28', assigned_to: 'Chris Evans', thumbnail: 'https://picsum.photos/id/47/200/150', priority: 'Medium' }
])

const sortField = ref('created_at')
const sortDirection = ref('desc')
const itemsPerPage = 5
const searchQuery = ref('')
const searchInputRef = ref(null)

const filteredProjects = computed(() => {
    if (!searchQuery.value.trim()) return projects.value
    const q = searchQuery.value.toLowerCase()
    return projects.value.filter(p =>
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.assigned_to.toLowerCase().includes(q)
    )
})

const sortedProjects = computed(() => {
    const sorted = [...filteredProjects.value].sort((a, b) => {
        let aVal = a[sortField.value]
        let bVal = b[sortField.value]
        if (sortField.value === 'created_at') {
            aVal = new Date(aVal).getTime()
            bVal = new Date(bVal).getTime()
        }
        if (aVal < bVal) return sortDirection.value === 'asc' ? -1 : 1
        if (aVal > bVal) return sortDirection.value === 'asc' ? 1 : -1
        return 0
    })
    return sorted
})

const totalItems = computed(() => sortedProjects.value.length)
const totalPages = computed(() => Math.ceil(totalItems.value / itemsPerPage))

const currentPage = ref(parseInt(route.query.page) || 1)
watch(currentPage, (newPage) => {
    if (newPage < 1) currentPage.value = 1
    if (newPage > totalPages.value) currentPage.value = totalPages.value
    router.push({
        path: '/projects',
        query: { page: currentPage.value > 1 ? currentPage.value : undefined }
    })
})

const paginatedProjects = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage
    const end = start + itemsPerPage
    return sortedProjects.value.slice(start, end)
})

const changeSort = (field) => {
    if (sortField.value === field) {
        sortDirection.value = sortDirection.value === 'asc' ? 'desc' : 'asc'
    } else {
        sortField.value = field
        sortDirection.value = 'asc'
    }
    currentPage.value = 1
}

const getSortIcon = (field) => {
    if (sortField.value !== field) return '↕'
    return sortDirection.value === 'asc' ? '↑' : '↓'
}

const statusBadgeClass = (status) => {
    switch (status) {
        case 'Active': return 'text-green-400 bg-green-400/10 border border-green-400/20'
        case 'Completed': return 'text-blue-400 bg-blue-400/10 border border-blue-400/20'
        case 'On Hold': return 'text-yellow-400 bg-yellow-400/10 border border-yellow-400/20'
        default: return 'text-gray-400 bg-gray-400/10 border border-gray-400/20'
    }
}

const paginationRange = computed(() => {
    if (totalPages.value <= 4) {
        return Array.from({ length: totalPages.value }, (_, i) => i + 1)
    }
    return [1, 2, 3, '...', totalPages.value]
})

const focusSearchInput = () => {
    if (searchInputRef.value) {
        searchInputRef.value.focus()
    }
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

        <nuxt-link to="/projects/create-new"
            class="size-9 shrink-0 center bg-thprimary/8 hover:bg-thprimary/10 active:bg-thprimary/12 transition-all duration-300 rounded-lg border border-thgray-200/50">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                stroke="currentColor" class="size-5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
        </nuxt-link>

    </div>

    <div v-if="projects.length == 0" class="h-30 sm:h-60 center text-thprimary/50 italic font-mono">
        There's no project yet
    </div>

    <div v-else>
        <div class="overflow-x-auto rounded-xl border border-thgray-200/50 overflow-hidden">
            <table class="min-w-full divide-y divide-thgray-200/50">
                <thead class="bg-thprimary/5">
                    <tr>
                        <th class="px-6 py-3 text-left text-xs font-mono text-thprimary/70 uppercase tracking-wider">
                            <div class="flex items-center gap-1">Creator</div>
                        </th>
                        <th @click="changeSort('title')"
                            class="px-6 py-3 text-left text-xs font-mono text-thprimary/70 uppercase tracking-wider cursor-pointer hover:bg-thprimary/8 transition">
                            <div class="flex items-center gap-1">Title {{ getSortIcon('title') }}</div>
                        </th>
                        <th @click="changeSort('status')"
                            class="px-6 py-3 text-left text-xs font-mono text-thprimary/70 uppercase tracking-wider cursor-pointer hover:bg-thprimary/8 transition">
                            <div class="flex items-center gap-1">Status {{ getSortIcon('status') }}</div>
                        </th>
                        <th @click="changeSort('category')"
                            class="px-6 py-3 text-left text-xs font-mono text-thprimary/70 uppercase tracking-wider cursor-pointer hover:bg-thprimary/8 transition">
                            <div class="flex items-center gap-1">Category {{ getSortIcon('category') }}</div>
                        </th>
                        <th @click="changeSort('assigned_to')"
                            class="px-6 py-3 text-left text-xs font-mono text-thprimary/70 uppercase tracking-wider cursor-pointer hover:bg-thprimary/8 transition">
                            <div class="flex items-center gap-1">Developer {{ getSortIcon('assigned_to') }}</div>
                        </th>
                        <th @click="changeSort('created_at')"
                            class="px-6 py-3 text-left text-xs font-mono text-thprimary/70 uppercase tracking-wider cursor-pointer hover:bg-thprimary/8 transition">
                            <div class="flex items-center gap-1">Created {{ getSortIcon('created_at') }}</div>
                        </th>
                        <th class="px-6 py-3 text-right text-xs font-mono text-thprimary/70 uppercase tracking-wider">
                            Details</th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-thgray-200/50 bg-thprimary/5">
                    <tr v-for="project in paginatedProjects" :key="project.id" class="hover:bg-thprimary/8 transition">
                        <td class="px-5 py-3 whitespace-nowrap text-sm text-green-300">{{ project.creator }}</td>
                        <td class="px-5 py-3 whitespace-nowrap text-sm font-medium text-thprimary">{{ project.title
                        }}</td>
                        <td class="px-5 py-3 whitespace-nowrap">
                            <span
                                :class="['px-2 py-1 rounded-full text-xs font-mono', statusBadgeClass(project.status)]">{{
                                    project.status }}</span>
                        </td>
                        <td class="px-5 py-3 whitespace-nowrap text-sm text-thprimary/70">{{ project.category }}
                        </td>
                        <td class="px-5 py-3 whitespace-nowrap text-sm text-thprimary/70">{{ project.assigned_to }}
                        </td>
                        <td class="px-5 py-3 whitespace-nowrap text-sm text-thprimary/70">{{ project.created_at }}
                        </td>
                        <td class="px-5 py-3 whitespace-nowrap text-right text-sm">
                            <nuxt-link to="/projects/sample-project"
                                class="px-3 py-1.5 rounded-lg bg-thprimary/10 text-thprimary text-sm hover:bg-thprimary/20 transition">
                                Details
                            </nuxt-link>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <div class="flex flex-col sm:flex-row sm:justify-between items-start sm:items-center mt-6 gap-y-5 sm:gap-0">
            <div class="flex gap-2 sm:gap-4">
                <button @click="currentPage--" :disabled="currentPage === 1"
                    class="size-10 rounded-full bg-thprimary/5 hover:bg-thprimary/8 active:bg-thprimary/10 border border-thgray-200/50 center text-thprimary transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed!">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" class="size-4.5">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                    </svg>
                </button>

                <button v-for="p in paginationRange" :key="p" @click="typeof p === 'number' ? currentPage = p : null"
                    class="size-10 rounded-full bg-thprimary/5 hover:bg-thprimary/8 active:bg-thprimary/10 border border-thgray-200/50 center text-thprimary transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed! text-sm font-mono">
                    {{ p }}
                </button>
            </div>

            <div class="text-sm text-thprimary/60 font-mono">
                <span class="font-roboto">Showing</span> {{ (currentPage - 1) * itemsPerPage + 1 }}
                <span class="font-roboto">to</span> {{ Math.min(currentPage * itemsPerPage, totalItems) }}
                <span class="font-roboto">of</span> {{ totalItems }}
            </div>
        </div>
    </div>
</template>