import { ref } from 'vue'

const searchOpen = ref(false)
const quickOpen = ref(false)
const uploadOpen = ref(false)

export const useModals = () => {
    const openSearch = () => { searchOpen.value = true }
    const closeSearch = () => { searchOpen.value = false }
    const openQuick = () => { quickOpen.value = true }
    const closeQuick = () => { quickOpen.value = false }
    const openUpload = () => { uploadOpen.value = true }
    const closeUpload = () => { uploadOpen.value = false }

    return {
        searchOpen,
        quickOpen,
        uploadOpen,
        openSearch,
        closeSearch,
        openQuick,
        closeQuick,
        openUpload,
        closeUpload,
    }
}