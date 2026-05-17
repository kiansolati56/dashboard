<script setup>
useHead({
    bodyAttrs: {
        class: 'relative w-screen text-thprimary overflow-x-hidden font-roboto bg-linear-to-br from-[#171717] to-thprimarybackground',
    }
})
</script>

<template>
    <main>
        <slot />
    </main>
</template>