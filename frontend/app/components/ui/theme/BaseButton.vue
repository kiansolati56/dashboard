<script setup>
import { NuxtLink } from '#components'

const props = defineProps({
    variant: {
        type: String,
        default: 'primary',
    },
    mod: {
        type: String,
        default: '',
    },
    size: {
        type: String,
        default: '',
    },
    width: {
        type: String,
        default: '',
    },
    href: {
        type: String,
        default: null,
    },
    to: {
        type: [String, Object],
        default: null,
    },
    nativeType: {
        type: String,
        default: 'button',
    },
    disabled: {
        type: Boolean,
        default: false,
    },
    loading: {
        type: Boolean,
        default: false,
    },
    iconOnly: {
        type: Boolean,
        default: false,
    },
})

const variantClasses = {
    primary: 'bg-thprimary/8 hover:bg-thprimary/10 active:bg-thprimary/12 text-thprimary border-thgray-200/50',
    secondary: 'bg-thgray-200/20 hover:bg-thgray-200/30 active:bg-thgray-200/40 text-thprimary border-thgray-200/50',
    success: 'bg-thprimary/8 hover:bg-thprimary/10 active:bg-thprimary/12 text-thprimary border-thgray-200/50',
    danger: 'bg-thprimary/8 hover:bg-thprimary/10 active:bg-thprimary/12 text-thprimary border-thgray-200/50',
    warning: 'bg-thprimary/8 hover:bg-thprimary/10 active:bg-thprimary/12 text-thprimary border-thgray-200/50',
    info: 'bg-thprimary/8 hover:bg-thprimary/10 active:bg-thprimary/12 text-thprimary border-thgray-200/50',
    dark: 'bg-thgray-700 hover:bg-thgray-600 active:bg-thgray-500 text-thprimary border-thgray-200/50',
    light: 'bg-thgray-100 hover:bg-thgray-200 active:bg-thgray-300 text-thsecondary border-thgray-200/50',
    link: 'bg-transparent hover:bg-thprimary/5 active:bg-thprimary/8 text-thprimary border-transparent',
}

const modClasses = {
    outline: 'bg-transparent border-current hover:bg-thprimary/5 active:bg-thprimary/10',
    soft: 'bg-thprimary/5 hover:bg-thprimary/8 active:bg-thprimary/12 border-thgray-200/20',
    ghost: 'bg-transparent border-transparent hover:bg-thprimary/8 active:bg-thprimary/12',
}

const sizeClasses = {
    sm: 'h-8 px-3 text-xs',
    lg: 'h-12 px-6 text-base',
}

const widthClasses = {
    xs: 'w-20',
    sm: 'w-24',
    md: 'w-32',
    lg: 'w-40',
}

const getVariantClass = () => variantClasses[props.variant] || variantClasses.primary
const getModClass = () => (props.mod && modClasses[props.mod]) || ''
const getSizeClass = () => {
    if (props.iconOnly) return ''
    return (props.size && sizeClasses[props.size]) || ''
}
const getWidthClass = () => (props.width && widthClasses[props.width]) || ''

const isRouterLink = computed(() => props.to)
const isExternalLink = computed(() => props.href && !props.to)
const isButton = computed(() => !props.to && !props.href)

const componentTag = computed(() => {
    if (isRouterLink.value) return NuxtLink
    if (isExternalLink.value) return 'a'
    return 'button'
})

const additionalAttrs = computed(() => {
    if (isRouterLink.value) {
        return { to: props.to }
    }
    if (isExternalLink.value) {
        return { href: props.href, target: props.href.startsWith('http') ? '_blank' : undefined }
    }
    return { type: props.nativeType, disabled: props.disabled || props.loading }
})

const buttonClasses = computed(() => [
    'inline-flex items-center justify-center gap-2 rounded-full border transition-all duration-200 outline-none font-mono text-sm',
    getVariantClass(),
    getModClass(),
    getSizeClass(),
    getWidthClass(),
    props.iconOnly ? 'size-10' : 'h-10 px-4',
    (props.disabled || props.loading) && 'opacity-50 cursor-not-allowed pointer-events-none',
].filter(Boolean).join(' '))
</script>

<template>
    <component :is="componentTag" :class="buttonClasses" v-bind="additionalAttrs">
        <slot v-if="loading" name="loading" />
        <template v-else>
            <slot name="iconLeft" />
            <slot v-if="!iconOnly" />
            <slot name="iconRight" />
        </template>
    </component>
</template>