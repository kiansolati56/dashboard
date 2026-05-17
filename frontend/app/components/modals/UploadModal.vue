<script setup>
import { ref, computed, watch, nextTick, onUnmounted, onMounted } from 'vue'
import { useModals } from '~/composables/useModals'

const modals = useModals()

const file = ref(null)
const errorMessage = ref('')
const isEditingName = ref(false)
const renameInput = ref(null)
const dropZoneRef = ref(null)

const imageExtensions = ['webp', 'png', 'jpg', 'jpeg']
const maxSize = 200 * 1024 * 1024

const isImage = computed(() => {
    if (!file.value) return false
    const ext = file.value.name.split('.').pop()?.toLowerCase()
    return imageExtensions.includes(ext) || file.value.type.startsWith('image/')
})

const fileBaseName = computed(() => {
    if (!file.value) return ''
    const parts = file.value.name.split('.')
    parts.pop()
    return parts.join('.')
})

const fileExtension = computed(() => {
    if (!file.value) return ''
    const parts = file.value.name.split('.')
    return parts.length > 1 ? `.${parts.pop()}` : ''
})

const displayName = computed(() => {
    if (!file.value) return ''
    return fileBaseName.value + fileExtension.value
})

const fileSize = computed(() => {
    if (!file.value) return ''
    const bytes = file.value.size
    if (bytes < 1024) return `${bytes} B`
    if (bytes < 1048576) return `${(bytes / 1024).toFixed(1)} kB`
    return `${(bytes / 1048576).toFixed(1)} MB`
})

const previewUrl = ref('')

watch(file, (newFile, oldFile) => {
    if (oldFile && previewUrl.value) {
        URL.revokeObjectURL(previewUrl.value)
    }
    if (newFile && isImage.value) {
        previewUrl.value = URL.createObjectURL(newFile)
    } else {
        previewUrl.value = ''
    }
})

onUnmounted(() => {
    if (previewUrl.value) URL.revokeObjectURL(previewUrl.value)
})

const processFile = (selectedFile) => {
    errorMessage.value = ''
    if (!selectedFile) return
    if (selectedFile.size > maxSize) {
        errorMessage.value = 'File size exceeds 200 MB limit.'
        return
    }
    file.value = selectedFile
    isEditingName.value = false
}

const handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    const dt = e.dataTransfer
    if (dt && dt.files.length > 0) {
        processFile(dt.files[0])
    }
}

const handleBrowse = (e) => {
    const target = e.target
    if (target.files.length > 0) {
        processFile(target.files[0])
    }
    target.value = ''
}

const startRename = () => {
    isEditingName.value = true
    nextTick(() => {
        renameInput.value?.focus()
        renameInput.value?.select()
    })
}

const finishRename = () => {
    isEditingName.value = false
    if (!file.value) return
    const newName = renameInput.value?.value.trim()
    if (newName) {
        const currentExt = fileExtension.value
        const newFileName = newName + currentExt
        const newFile = new File([file.value], newFileName, { type: file.value.type, lastModified: file.value.lastModified })
        file.value = newFile
    }
}

const removeFile = () => {
    file.value = null
    isEditingName.value = false
}

const close = () => {
    file.value = null
    isEditingName.value = false
    modals.closeUpload()
}

const shortcutHandler = (e) => {
    if (e.altKey && e.key === 'u' && !modals.uploadOpen.value && !modals.searchOpen.value && !modals.quickOpen.value) {
        e.preventDefault()
        modals.openUpload()
    }
}

onMounted(() => {
    window.addEventListener('keydown', shortcutHandler)
})

onUnmounted(() => {
    window.removeEventListener('keydown', shortcutHandler)
})
</script>

<template>
    <ModalsBaseModal v-model="modals.uploadOpen.value">
        <div
            class="w-full max-w-2xl h-auto overflow-hidden bg-thprimary/5 backdrop-blur-lg p-5 relative rounded-4xl border border-thgray-200/50 shadow-2xl">
            <div class="flex items-center justify-between">
                <h3 class="text-lg text-thprimary">Upload</h3>
                <button
                    class="size-10 center rounded-full hover:bg-thprimary/10 active:bg-thprimary/12 transition-all duration-200 border border-transparent hover:border-thgray-200/50"
                    @click="close">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" class="size-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>

            <div ref="dropZoneRef"
                class="mt-5 w-full border-2 border-dashed border-thgray-200/50 h-50 rounded-2xl bg-thprimary/5 hover:bg-thprimary/6 active:bg-thprimary/8 transition-all duration-200 cursor-pointer center flex-col"
                @dragover.prevent @dragleave.prevent @drop="handleDrop" @click="$refs.fileInput.click()">
                <input ref="fileInput" type="file" class="hidden" @change="handleBrowse" />
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1"
                    stroke="currentColor" class="size-16 text-thprimary/50">
                    <path stroke-linecap="round" stroke-linejoin="round"
                        d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                </svg>
                <span class="text-thprimary text-xs sm:text-sm mt-6">Drop your file(s) here or BROWSE</span>
                <small class="text-thprimary/50 mt-1 text-xs">Max file size: 200 MB</small>
                <p v-if="errorMessage" class="text-red-400 text-xs mt-2">{{ errorMessage }}</p>
            </div>

            <div v-if="file"
                class="mt-5 w-full border border-thgray-200/50 p-3 rounded-2xl bg-thprimary/5 flex justify-between items-center">
                <div class="flex items-center gap-3">
                    <div v-if="isImage" class="size-12 rounded-lg center overflow-hidden">
                        <img :src="previewUrl" class="size-full object-cover" alt="preview" />
                    </div>
                    <div v-else class="size-12 rounded-lg center overflow-hidden bg-thgray-100">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                            stroke="currentColor" class="size-5">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                        </svg>
                    </div>
                    <div class="flex flex-col">
                        <div v-if="!isEditingName" class="flex items-center gap-1">
                            <span class="text-thprimary text-sm">{{ displayName }}</span>
                        </div>
                        <div v-else class="flex items-center gap-1">
                            <input ref="renameInput" v-model="fileBaseName"
                                class="bg-transparent border-b border-thgray-200/50 outline-none text-thprimary text-sm w-40"
                                @keydown.enter="finishRename" @blur="finishRename" />
                            <span class="text-thprimary text-sm">{{ fileExtension }}</span>
                        </div>
                        <small class="text-thprimary/50 font-mono">{{ fileSize }}</small>
                    </div>
                </div>

                <div class="flex items-center gap-2">
                    <button
                        class="size-8 center rounded-full hover:bg-thprimary/10 active:bg-thprimary/12 transition-all duration-200 border border-transparent hover:border-thgray-200/50"
                        @click="startRename">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                            stroke="currentColor" class="size-4">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                        </svg>
                    </button>

                    <button
                        class="size-8 center rounded-full hover:bg-red-400/10 active:bg-red-400/12 transition-all duration-200 border border-transparent hover:border-red-400/50 text-red-400"
                        @click="removeFile">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                            stroke="currentColor" class="size-5">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
            </div>

            <div class="grid sm:grid-cols-2 gap-2 sm:gap-5 mt-5">
                <button
                    class="w-full h-10 rounded-full bg-thprimary/8 border border-thgray-200/50 text-thprimary active:bg-thprimary/12 hover:bg-thprimary/10 text-sm transition-all duration-200 center"
                    @click="close">
                    Cancel
                </button>

                <button
                    class="bg-thgray-100 border border-thgray-200 w-full h-10 rounded-full text-thprimary hover:text-thprimary text-sm hover:bg-thgray-300 transition-all duration-200 center"
                    @click="close">
                    Upload
                </button>
            </div>
        </div>
    </ModalsBaseModal>
</template>