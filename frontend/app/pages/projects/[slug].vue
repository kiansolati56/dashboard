<script setup>
import { ref } from 'vue'

definePageMeta({
    title: 'Project'
})

const project = ref({
    id: 1,
    title: 'E-commerce Dashboard',
    slug: 'ecommerce-dashboard',
    description: 'Modern dashboard for online store with analytics and inventory management',
    status: 'Active',
    category: 'Development',
    created_at: '2025-03-15',
    assigned_to: 'Kian',
    thumbnail: '/images/project.jpg',
    priority: 'High',
    startDate: '2025-03-15',
    endDate: '2025-06-15',
    features: [
        'Real‑time sales analytics with interactive charts',
        'Inventory management with low‑stock alerts',
        'Customer segmentation and behavior tracking',
        'Marketing campaign ROI dashboard',
        'Customizable report generation (PDF/CSV)',
        'Role‑based access control for team members'
    ],
    technologies: [
        'Vue 3 / Nuxt 3 frontend',
        'TailwindCSS for styling',
        'Chart.js for data visualisation',
        'Express.js backend API',
        'MongoDB database',
        'JWT authentication'
    ],
    tasks: {
        total: 6,
        completed: 3
    },
    team: [
        { name: 'Kian', role: 'Developer', avatar: '/images/kian-profile.png' },
        { name: 'Mohammadreza', role: 'Designer', avatar: '/images/kevin-profile.jpg' }
    ],
    attachments: [
        { name: 'project_requirements.pdf', type: 'pdf', size: '2.4 MB' },
        { name: 'wireframes.sketch', type: 'sketch', size: '4.1 MB' },
        { name: 'api_documentation.docx', type: 'docx', size: '1.2 MB' }
    ]
})

const statusBadgeClass = (status) => {
    switch (status) {
        case 'Active': return 'text-green-400 bg-green-400/10 border border-green-400/20'
        case 'Completed': return 'text-blue-400 bg-blue-400/10 border border-blue-400/20'
        case 'On Hold': return 'text-yellow-400 bg-yellow-400/10 border border-yellow-400/20'
        default: return 'text-gray-400 bg-gray-400/10 border border-gray-400/20'
    }
}

const progressPercent = computed(() => {
    return Math.round((project.value.tasks.completed / project.value.tasks.total) * 100)
})
</script>

<template>
    <div class="max-w-5xl mx-auto px-4 md:px-6 py-6 md:py-10">
        <!-- Header -->
        <div class="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
            <div>
                <h1 class="text-xl sm:text-3xl md:text-4xl font-bold text-thprimary mb-2">{{ project.title }}</h1>
                <div class="flex flex-wrap items-center gap-3 text-sm">
                    <span :class="['px-2 py-0.5 rounded-full text-xs font-mono', statusBadgeClass(project.status)]">
                        {{ project.status }}
                    </span>
                    <span class="text-xs sm:text-sm md:text-base text-thprimary/50">•</span>
                    <span class="text-xs sm:text-sm md:text-base text-thprimary/70 font-mono">{{ project.category
                        }}</span>
                    <span class="text-xs sm:text-sm md:text-base text-thprimary/50">•</span>
                    <span class="text-xs sm:text-sm md:text-base text-thprimary/70">Created: {{ project.created_at
                        }}</span>
                </div>
            </div>
            <div class="flex gap-3">
                <button
                    class="px-4 h-10 rounded-full bg-thprimary/10 hover:bg-thprimary/15 text-thprimary text-sm transition flex items-center gap-2">
                    <svg class="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                            d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                    </svg>
                    <span>Edit</span>
                </button>
            </div>
        </div>

        <!-- Main image -->
        <div class="rounded-2xl overflow-hidden border border-thgray-200/50 mb-4 h-60 sm:h-120">
            <nuxt-img :src="project.thumbnail" :alt="project.title" class="size-full object-cover" />
        </div>

        <!-- Info cards -->
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-8">
            <div class="p-4 rounded-xl border border-thgray-200/50 bg-thprimary/5">
                <div class="flex items-center gap-2 text-thprimary/60 mb-1">
                    <svg class="size-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                            d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                    </svg>
                    <span class="text-sm font-mono">Developer</span>
                </div>
                <p class="text-thprimary font-medium">{{ project.assigned_to }}</p>
            </div>
            <div class="p-4 rounded-xl border border-thgray-200/50 bg-thprimary/5">
                <div class="flex items-center gap-2 text-thprimary/60 mb-1">
                    <svg class="size-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                            d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span class="text-sm font-mono">Priority</span>
                </div>
                <p class="text-thprimary font-medium">{{ project.priority }}</p>
            </div>
            <div class="p-4 rounded-xl border border-thgray-200/50 bg-thprimary/5">
                <div class="flex items-center gap-2 text-thprimary/60 mb-1">
                    <svg class="size-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                            d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25z" />
                    </svg>
                    <span class="text-sm font-mono">Last update</span>
                </div>
                <p class="text-thprimary font-medium">{{ project.created_at }}</p>
            </div>
        </div>

        <!-- Key Features -->
        <div class="mb-8">
            <h3 class="text-xl font-semibold text-thprimary mb-3">Key Features</h3>
            <ul class="list-disc pl-5 space-y-2 text-thprimary/80">
                <li v-for="feature in project.features" :key="feature">{{ feature }}</li>
            </ul>
        </div>

        <!-- Technologies Used -->
        <div class="mb-8">
            <h3 class="text-xl font-semibold text-thprimary mb-3">Technologies Used</h3>
            <ul class="list-disc pl-5 space-y-2 text-thprimary/80">
                <li v-for="tech in project.technologies" :key="tech">{{ tech }}</li>
            </ul>
        </div>

        <!-- Project Timeline -->
        <div class="mb-8">
            <h3 class="text-xl font-semibold text-thprimary mb-3">Project Timeline</h3>
            <div class="space-y-2">
                <p class="text-thprimary"><span class="font-mono text-thprimary/60">Started:</span> {{ project.startDate
                }}</p>
                <p class="text-thprimary"><span class="font-mono text-thprimary/60">Expected delivery:</span> {{
                    project.endDate }}</p>
                <div class="mt-3">
                    <div class="flex justify-between text-sm text-thprimary/60 mb-1">
                        <span>Progress</span>
                        <span>{{ progressPercent }}% ({{ project.tasks.completed }}/{{ project.tasks.total }} tasks
                            completed)</span>
                    </div>
                    <div class="w-full bg-thgray-200/30 rounded-full h-2">
                        <div class="bg-thprimary h-2 rounded-full" :style="{ width: progressPercent + '%' }"></div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Team & Assignees -->
        <div class="mb-8">
            <h3 class="text-xl font-semibold text-thprimary mb-3">Team & Assignees</h3>
            <div class="space-y-3">
                <div v-for="member in project.team" :key="member.name" class="flex items-center gap-3">
                    <div class="size-10 rounded-full overflow-hidden bg-thgray-600">
                        <img :src="member.avatar" class="w-full h-full object-cover">
                    </div>
                    <div>
                        <p class="text-thprimary font-medium">{{ member.name }}</p>
                        <p class="text-xs text-thprimary/60">{{ member.role }}</p>
                    </div>
                </div>
            </div>
        </div>

        <!-- Attachments -->
        <div class="mb-8">
            <h3 class="text-xl font-semibold text-thprimary mb-3">Attachments</h3>
            <div class="flex flex-wrap gap-3">
                <button v-for="file in project.attachments" :key="file.name"
                    class="flex items-center gap-2 px-3 py-2 rounded-lg bg-thprimary/5 border border-thgray-200/50 hover:bg-thprimary/8 active:bg-thprimary/10 transition-all duration-200">
                    <svg class="size-5 text-thprimary/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <div>
                        <span class="text-sm text-thprimary/80">{{ file.name }}</span>
                        <span class="text-xs text-thprimary/40 ml-2">{{ file.size }}</span>
                    </div>
                </button>
            </div>
        </div>
    </div>
</template>

<style scoped></style>