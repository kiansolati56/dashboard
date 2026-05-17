<script setup>
const props = defineProps({
    id: { type: String, required: true },
    label: { type: String, default: '' },
    modelValue: { type: [String, Number], default: '' },
    type: { type: String, default: 'text' },
    placeholder: { type: String, default: '' },
    disabled: { type: Boolean, default: false },
    readonly: { type: Boolean, default: false },
    plaintext: { type: Boolean, default: false },
    size: { type: String, default: '' },
    list: { type: String, default: null },
    error: { type: Boolean, default: false },
    errorText: { type: String, default: '' },
})

const emit = defineEmits(['update:modelValue'])

const updateValue = (event) => {
    emit('update:modelValue', event.target.value)
}
</script>

<template>
    <div class="relative flex flex-col gap-1" :class="size || 'w-60'">
        <label v-if="label" :for="id" class="text-sm font-mono text-thprimary/80 mb-1">
            {{ label }}
        </label>
        <div class="relative">
            <slot name="iconLeft" />
            <input :id="id" :type="type" :value="modelValue" :placeholder="placeholder" :disabled="disabled"
                :readonly="readonly" :list="list"
                class="w-full h-10 rounded-full border transition-all duration-200 outline-none placeholder:text-sm placeholder:font-mono placeholder:text-thprimary/50"
                :class="{
                    'bg-thprimary/8 border-thgray-200/50 hover:border-thgray-200 focus:border-thgray-200': !plaintext && !error,
                    'bg-transparent border-transparent focus:border-thgray-200/50 hover:border-thgray-200/50': plaintext,
                    'border-red-500 bg-red-50/10 focus:border-red-500': error && !plaintext,
                    'opacity-60 cursor-not-allowed': disabled,
                    'pl-10 pr-4': $slots.iconLeft,
                    'pr-10 pl-4': $slots.iconRight,
                    'px-4': !$slots.iconLeft && !$slots.iconRight
                }" @input="updateValue" />
            <slot name="iconRight" />
        </div>
        <p v-if="error && errorText" class="text-xs text-red-500 mt-1 font-mono">
            {{ errorText }}
        </p>
    </div>
</template>