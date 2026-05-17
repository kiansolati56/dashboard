<script setup>
definePageMeta({
    title: 'Keyboard shortcuts'
})
</script>

<template>
    <div class="space-y-6 max-w-xl mx-auto">
        <div class="flex justify-between items-center">
            <div class="flex items-center gap-1.5">
                <span class="font-mono">1.</span>
                <span>Open search modal</span>
            </div>
            <div class="h-5 px-1 border border-thgray-200/50 rounded-md center text-xs font-mono bg-thgray-100">
                Ctrl+Space</div>
        </div>

        <div class="flex justify-between items-center">
            <div class="flex items-center gap-1.5">
                <span class="font-mono">2.</span>
                <span>Open quick action modal</span>
            </div>
            <div class="h-5 px-1 border border-thgray-200/50 rounded-md center text-xs font-mono bg-thgray-100">
                Alt+Q</div>
        </div>

        <div class="flex justify-between items-center">
            <div class="flex items-center gap-1.5">
                <span class="font-mono">3.</span>
                <span>Open upload modal</span>
            </div>
            <div class="h-5 px-1 border border-thgray-200/50 rounded-md center text-xs font-mono bg-thgray-100">
                Alt+U</div>
        </div>

        <div class="flex justify-between items-center">
            <div class="flex items-center gap-1.5">
                <span class="font-mono">4.</span>
                <span>Active search input in projects page</span>
            </div>
            <div class="h-5 px-1 border border-thgray-200/50 rounded-md center text-xs font-mono bg-thgray-100">
                /</div>
        </div>
    </div>
</template>