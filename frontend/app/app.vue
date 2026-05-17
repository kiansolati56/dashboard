<script setup lang="ts">
import { isFullyLoaded, stopLoader } from '~/composables/useLoader'
import ToastContainer from '~/components/globals/ToastContainer.vue'

const loadImage = (el: HTMLElement | null) => {
  return new Promise<void>((resolve) => {
    if (!el) return resolve()
    if (el.tagName === 'IMG') {
      const img = el as HTMLImageElement
      if (img.complete && img.naturalHeight !== 0) return resolve()
      img.onload = img.onerror = () => resolve()
      return
    }
    const bg = getComputedStyle(el).backgroundImage
    const match = bg.match(/url\(["']?(.*?)["']?\)/)
    if (!match) return resolve()
    const temp = new Image()
    temp.onload = temp.onerror = () => resolve()
    temp.src = match[1]
  })
}

onMounted(async () => {
  try {
    const promises: Promise<void>[] = []

    if (document.fonts?.ready) {
      promises.push(document.fonts.ready.then(() => { }))
    }

    await nextTick()

    const criticalSelectors = [
      '#site-logo',
      '.hero-banner-image'
    ]

    criticalSelectors.forEach(selector => {
      const el = document.querySelector(selector) as HTMLElement | null
      if (el) promises.push(loadImage(el))
    })

    await Promise.allSettled(promises)
  } catch (err) {
    console.warn('Preload warning:', err)
  } finally {
    stopLoader()
  }
})

</script>

<template>
  <NuxtLoadingIndicator color="#DE8139" :throttle="200" />

  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
  <ToastContainer />
</template>