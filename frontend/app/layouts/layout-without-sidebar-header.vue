<script setup>
useHead({
    bodyAttrs: {
        class: 'relative w-screen text-thprimary overflow-x-hidden font-roboto bg-thprimarybackground to-thprimarybackground',
    }
})
</script>

<template>
    <main>
        <slot />
    </main>
</template>