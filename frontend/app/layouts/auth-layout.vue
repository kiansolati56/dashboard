<script setup>

useHead({
    bodyAttrs: {
        class: 'relative w-screen text-thprimary overflow-x-hidden font-roboto bg-linear-to-br from-[#171717] to-thprimarybackground',
    }
})
</script>

<template>
    <nuxt-link to="/dashboard"
        class="text-xl text-thprimary/80 hover:text-thprimary transition-all duration-200 absolute top-4 left-6 hidden lg:block">
        Adnis Dashboard
    </nuxt-link>
    <main class="grid lg:grid-cols-2 h-screen overflow-hidden p-[3vw] xl:gap-32">
        <div class="hidden lg:flex justify-center items-center flex-col">
            <p class="text-[200px]">🍂</p>
        </div>
        <div class="size-full bg-thprimary/5 rounded-4xl border border-thgray-200/50 relative px-[10%]">
            <slot />
        </div>
    </main>
</template>