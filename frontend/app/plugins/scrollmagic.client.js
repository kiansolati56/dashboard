import { defineNuxtPlugin } from '#app'
import ScrollMagic from 'scrollmagic'

export default defineNuxtPlugin(() => {
    return {
        provide: {
            scrollmagic: {
                Controller: ScrollMagic.Controller,
                Scene: ScrollMagic.Scene,
            }
        }
    }
})