<script setup>
const router = useRouter()
const route = useRoute()
const modals = useModals()
const auth = useAuth()

const emit = defineEmits(['open-sidebar'])

const menuItems = [
    {
        id: 1,
        title: 'Dashboard',
        slug: '/dashboard',
        icon: `<path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z" />`
    },
    {
        id: 2,
        title: 'Projects',
        slug: '/projects',
        icon: `<path stroke-linecap="round" stroke-linejoin="round" d="M2.25 12.75V12A2.25 2.25 0 0 1 4.5 9.75h15A2.25 2.25 0 0 1 21.75 12v.75m-8.69-6.44-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z" />`
    },
    {
        id: 3,
        title: 'Notes',
        slug: '/notes',
        icon: `<path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />`
    },
    {
        id: 4,
        title: 'Files',
        slug: '/files',
        icon: `<path stroke-linecap="round" stroke-linejoin="round" d="M2.25 15a4.5 4.5 0 0 0 4.5 4.5H18a3.75 3.75 0 0 0 1.332-7.257 3 3 0 0 0-3.758-3.848 5.25 5.25 0 0 0-10.233 2.33A4.502 4.502 0 0 0 2.25 15Z" />`
    },
    {
        id: 5,
        title: 'Tasks',
        slug: '/tasks',
        icon: `<path stroke-linecap="round" stroke-linejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z" />`
    }
]

const navMenuItems = [
    { slug: '/dashboard', title: 'Dashboard' },
    { slug: '/projects', title: 'Projects' },
    { slug: '/tasks', title: 'Tasks' },
    { slug: '/files', title: 'Files' }
]

const isSearchOpen = ref(false)

const handleGlobalKeydown = (e) => {
    if (e.key === '/' && !isSearchOpen.value) {
        const tag = document.activeElement?.tagName?.toLowerCase()
        if (tag !== 'input' && tag !== 'textarea' && !document.activeElement?.isContentEditable) {
            e.preventDefault()
            isSearchOpen.value = true
        }
    }
}

onMounted(() => {
    window.addEventListener('keydown', handleGlobalKeydown)
})

onUnmounted(() => {
    window.removeEventListener('keydown', handleGlobalKeydown)
})

const createMenuOpen = ref(false)
const profileMenuOpen = ref(false)
const createMenuRef = ref(null)
const createButtonRef = ref(null)
const profileMenuRef = ref(null)
const profileButtonRef = ref(null)

const toggleCreateMenu = () => {
    if (profileMenuOpen.value) profileMenuOpen.value = false
    createMenuOpen.value = !createMenuOpen.value
}

const toggleProfileMenu = () => {
    if (createMenuOpen.value) createMenuOpen.value = false
    profileMenuOpen.value = !profileMenuOpen.value
}

const closeAllMenus = () => {
    createMenuOpen.value = false
    profileMenuOpen.value = false
}

const handleClickOutside = (event) => {
    if (createMenuOpen.value &&
        createMenuRef.value &&
        createButtonRef.value &&
        !createMenuRef.value.contains(event.target) &&
        !createButtonRef.value.contains(event.target)) {
        createMenuOpen.value = false
    }
    if (profileMenuOpen.value &&
        profileMenuRef.value &&
        profileButtonRef.value &&
        !profileMenuRef.value.contains(event.target) &&
        !profileButtonRef.value.contains(event.target)) {
        profileMenuOpen.value = false
    }
}

const handleLogout = () => {
    router.push('/login')
}

const navigateTo = (path) => {
    router.push(path)
    closeAllMenus()
}

onMounted(() => {
    document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
    document.removeEventListener('click', handleClickOutside)
})

const currentPageTitle = computed(() => {
    const matchedRoute = route.matched.find(r => r.meta?.title)
    return matchedRoute?.meta?.title || 'Dashboard'
})

const currentTime = computed(() => {
    const date = new Date()
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
})
</script>

<template>
    <div class="col-span-6 md:col-span-4 lg:col-span-6 xl:col-span-4 flex justify-start items-center gap-3">
        <div class="flex lg:hidden justify-start items-center">
            <nuxt-link to="/dashboard" class="w-14 h-full border-r border-thgray-200/50 center">
                <span class="text-xl">🍂</span>
            </nuxt-link>

            <div class="ml-4 font-medium">
                {{ currentPageTitle }}
            </div>
        </div>

        <button
            class="w-50 h-9 relative bg-thprimary/8 hover:bg-thprimary/10 active:bg-thprimary/12 rounded-lg transition-all duration-200 outline-none text-xs text-thprimary/50 border border-thgray-200/50 hidden lg:flex justify-between items-center px-3"
            @click="modals.openSearch()">
            <div class="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                    stroke="currentColor" class="size-4">
                    <path stroke-linecap="round" stroke-linejoin="round"
                        d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                </svg>
                <span class="font-mono mt-px">Search...</span>
            </div>
            <div class="h-5 px-1 pt-1 border border-thgray-200/50 rounded-sm center text-[10px] font-mono bg-thgray-100">
                Ctrl+Space</div>
        </button>
    </div>

    <div class="col-span-4 hidden md:flex lg:hidden xl:flex justify-center items-center">
        <ul class="relative flex items-center gap-2 lg:gap-4 z-10">
            <li v-for="item in navMenuItems" :key="item.slug">
                <nuxt-link :to="item.slug"
                    class="text-thprimary/80 text-sm font-medium h-8 px-3 flex items-center rounded-lg hover:bg-thprimary/8 hover:text-thwhite transition-all duration-200 whitespace-nowrap">
                    {{ item.title }}
                </nuxt-link>
            </li>
        </ul>
    </div>

    <div class="col-span-6 md:col-span-4 lg:col-span-6 xl:col-span-4 flex justify-end items-center gap-3">
        <div class="flex items-center gap-3 relative">
            <button ref="createButtonRef"
                class="h-9 px-2 pt-px hidden lg:flex justify-center items-center gap-2 text-sm bg-thprimary/8 hover:bg-thprimary/10 active:bg-thprimary/12 transition-all duration-200 border border-thgray-200/50 rounded-lg"
                @click.stop="toggleCreateMenu">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                    stroke="currentColor" class="size-4">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
                <span class="font-mono">Create</span>
            </button>

            <Transition enter-active-class="transition duration-200 ease-out" enter-from-class="opacity-0 translate-y-2"
                enter-to-class="opacity-100 translate-y-0" leave-active-class="transition duration-150 ease-in"
                leave-from-class="opacity-100 translate-y-0" leave-to-class="opacity-0 translate-y-2">
                <div v-if="createMenuOpen" ref="createMenuRef"
                    class="p-1 bg-thprimarybackground border border-thgray-200/50 w-45 rounded-xl absolute right-0 mt-1.5 top-full space-y-1 z-110">
                    <nuxt-link to="/projects/create-new"
                        class="h-9 w-full pt-px flex items-center px-2 gap-2 text-sm bg-thprimary/5 hover:bg-thprimary/8 active:bg-thprimary/10 transition-all duration-200 rounded-lg"
                        @click="closeAllMenus()">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                            stroke="currentColor" class="size-5">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M2.25 12.75V12A2.25 2.25 0 0 1 4.5 9.75h15A2.25 2.25 0 0 1 21.75 12v.75m-8.69-6.44-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z" />
                        </svg>
                        <span class="font-mono">Create a project</span>
                    </nuxt-link>

                    <nuxt-link to="/tasks/new"
                        class="h-9 w-full pt-px flex items-center px-2 gap-2 text-sm bg-thprimary/5 hover:bg-thprimary/8 active:bg-thprimary/10 transition-all duration-200 rounded-lg"
                        @click="closeAllMenus()">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                            stroke="currentColor" class="size-5">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z" />
                        </svg>
                        <span class="font-mono">Create a Task</span>
                    </nuxt-link>

                    <button
                        class="h-9 w-full pt-px flex items-center px-2 gap-2 text-sm bg-thprimary/5 hover:bg-thprimary/8 active:bg-thprimary/10 transition-all duration-200 rounded-lg"
                        @click="() => { modals.openUpload(); closeAllMenus(); }">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                            stroke="currentColor" class="size-5">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="m18.375 12.739-7.693 7.693a4.5 4.5 0 0 1-6.364-6.364l10.94-10.94A3 3 0 1 1 19.5 7.372L8.552 18.32m.009-.01-.01.01m5.699-9.941-7.81 7.81a1.5 1.5 0 0 0 2.112 2.13" />
                        </svg>
                        <span class="font-mono">Upload a file</span>
                    </button>

                    <nuxt-link to="/notes/new"
                        class="h-9 w-full pt-px flex items-center px-2 gap-2 text-sm bg-thprimary/5 hover:bg-thprimary/8 active:bg-thprimary/10 transition-all duration-200 rounded-lg"
                        @click="closeAllMenus()">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                            stroke="currentColor" class="size-5">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                        </svg>
                        <span class="font-mono">Create a Note</span>
                    </nuxt-link>
                </div>
            </Transition>

            <div class="flex items-center gap-3">
                <button ref="profileButtonRef"
                    class="size-10 rounded-full overflow-hidden transition-all duration-200 border border-thgray-200/50 p-0.5 relative"
                    @click.stop="toggleProfileMenu">
                    <nuxt-img v-if="auth?.user?.avatar_url" class="size-full object-cover rounded-full" :src="auth?.user?.avatar_url" :alt="auth?.user?.name" />
                    <div v-else class="size-10 bg-thprimary/20 animate-pulse rounded-full absolute inset-0 m-auto"></div>
                </button>

                <Transition enter-active-class="transition duration-200 ease-out"
                    enter-from-class="opacity-0 translate-y-2" enter-to-class="opacity-100 translate-y-0"
                    leave-active-class="transition duration-150 ease-in" leave-from-class="opacity-100 translate-y-0"
                    leave-to-class="opacity-0 translate-y-2">
                    <div v-if="profileMenuOpen" ref="profileMenuRef"
                        class="p-1 bg-thprimarybackground border border-thgray-200/50 w-40 rounded-xl absolute right-0 mt-1.5 top-full space-y-1 z-110">
                        <nuxt-link to="/settings/profile"
                            class="h-9 w-full pt-px flex items-center px-2 gap-2 text-sm bg-thprimary/5 hover:bg-thprimary/8 active:bg-thprimary/10 transition-all duration-200 rounded-lg"
                            @click="closeAllMenus()">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                stroke="currentColor" class="size-5">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                            </svg>
                            <span class="font-mono">Profile</span>
                        </nuxt-link>

                        <nuxt-link to="/settings"
                            class="h-9 w-full pt-px flex items-center px-2 gap-2 text-sm bg-thprimary/5 hover:bg-thprimary/8 active:bg-thprimary/10 transition-all duration-200 rounded-lg"
                            @click="closeAllMenus()">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                stroke="currentColor" class="size-5">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z" />
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                            </svg>
                            <span class="font-mono">Settings</span>
                        </nuxt-link>

                        <nuxt-link to="/auth/logout"
                            class="flex items-center gap-2 px-2 h-9 active:bg-red-400/12 hover:bg-red-400/10 rounded-lg transition-all duration-200 text-red-400 w-full text-sm"
                            @click="closeAllMenus()">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                stroke="currentColor" class="size-5">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15" />
                            </svg>
                            <span class="font-mono">Logout</span>
                        </nuxt-link>
                    </div>
                </Transition>
            </div>

            <button @click="emit('open-sidebar')"
                class="size-9 shrink-0 flex lg:hidden justify-center items-center bg-thprimary/8 hover:bg-thprimary/10 active:bg-thprimary/12 transition-all duration-200 rounded-full border border-thgray-200/50">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                    stroke="currentColor" class="size-5">
                    <path stroke-linecap="round" stroke-linejoin="round"
                        d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
            </button>
        </div>

        <div class="border-l border-thgray-200/50 pl-3 hidden sm:flex items-center pb-0.5 h-7">
            <span class="font-medium text-thprimary">{{ currentTime }}</span>
        </div>
    </div>
</template>