// layouts/default.vue
<script setup>
import AppHeader from "~/components/layout/AppHeader.vue"
import AppSidebar from "~/components/layout/AppSidebar.vue"
import AppBreadcrumb from "~/components/layout/AppBreadcrumb.vue"
import { useModals } from "~/composables/useModals"

const route = useRoute()
const isBreadcrumb = computed(() => route.meta.breadcrumb !== false)

useHead({
    bodyAttrs: {
        class: 'relative w-screen text-thprimary overflow-x-hidden font-roboto bg-thprimarybackground hide-scrollbar',
    }
})

const modals = useModals()

const handleLogout = () => {
    console.log('logout')
}

const openUploadFromQuick = () => {
    modals.closeQuick()
    modals.openUpload()
}

const isSidebarOpen = ref(false)

const openSidebar = () => {
    isSidebarOpen.value = true
}

const closeSidebar = () => {
    isSidebarOpen.value = false
}
</script>

<template>
    <div class="flex w-full h-screen overflow-hidden">
        <div
            class="w-60 h-full shrink-0 border-r border-thgray-200/50 hidden lg:flex flex-col justify-between">
            <AppSidebar />
        </div>

        <div class="grow w-full overflow-y-auto h-full relative">
            <header class="fixed left-0 lg:left-60 right-0 top-0 h-14 bg-thprimarybackground/70 backdrop-blur-xl z-100"
                :class="isBreadcrumb ? 'md:h-28' : 'md:h-14'">
                <div class="border-b border-thgray-200/50 grid grid-cols-12 pl-2 pr-4 lg:pl-2 lg:pr-4 py-1 h-14">
                    <AppHeader @open-sidebar="openSidebar" />
                </div>

                <nav class="border-b border-thgray-200/50 pl-1 pr-4 lg:px-5 h-14 flex items-center"
                    v-if="isBreadcrumb == true">
                    <AppBreadcrumb />
                </nav>
            </header>

            <main :class="isBreadcrumb ? 'md:my-38 my-25 px-5 xl:px-10' : 'md:my-14'">
                <slot />
            </main>
        </div>
    </div>

    <div class="fixed xl:hidden z-200 top-0 left-0 h-screen overflow-auto w-70 flex flex-col justify-between bg-thprimarybackground border-r border-thgray-200/50 transition-transform duration-300 ease-in-out"
        :class="isSidebarOpen ? 'translate-x-0' : '-translate-x-full'">
        <LayoutAppSidebar />
    </div>

    <div @click="closeSidebar" class="fixed inset-0 backdrop-blur-sm z-190 transition-all duration-300 xl:hidden"
        :class="isSidebarOpen
            ? 'opacity-80 bg-thsecondary pointer-events-auto'
            : 'opacity-0 bg-thsecondary pointer-events-none'"></div>

    <ModalsSearchModal @logout="handleLogout" />
    <ModalsQuickActionModal @upload="openUploadFromQuick" />
    <ModalsUploadModal />
</template>