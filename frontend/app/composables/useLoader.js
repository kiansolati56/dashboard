import { ref } from 'vue';

export const isFullyLoaded = ref(false);

export function startLoader() {
    isFullyLoaded.value = false;
}

export function stopLoader() {
    isFullyLoaded.value = true;
}