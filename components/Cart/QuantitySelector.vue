<template>
    <div
        class="inline-flex items-center rounded-md bg-grey-10 font-medium text-grey-50 transition-colors hover:bg-grey-20/75"
        :class="wrapperClasses"
    >
        <button @click="decrement()" class="h-full">
            <MinusIcon :class="iconClasses" />
        </button>
        <div class="text-grey-60">{{ quantity }}</div>
        <button @click="increment()" class="h-full">
            <PlusIcon :class="iconClasses" />
        </button>
    </div>
</template>

<script setup lang="ts">
import { PlusIcon, MinusIcon } from "@heroicons/vue/solid";

type Size = "normal" | "small";

const props = defineProps<{
    quantity: number;
    size: Size;
    increment: () => void;
    decrement: () => void;
}>();

const wrapperClasses = {
    normal: "space-x-3 px-4 py-3",
    small: "space-x-2 px-2 py-1 text-sm",
}[props.size];

const iconClasses = {
    normal: "h-3 w-3",
    small: "h-2 w-2",
}[props.size];
</script>
