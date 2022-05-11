<template>
    <div
        class="inline-flex items-center space-x-3 rounded-md bg-grey-10 px-4 py-3 font-medium text-grey-50 transition-colors hover:bg-grey-20"
    >
        <button @click="decrement()" class="h-full">
            <MinusIcon class="h-3 w-3" />
        </button>
        <div class="text-grey-60">{{ quantity }}</div>
        <button @click="increment()" class="h-full">
            <PlusIcon class="h-3 w-3" />
        </button>
    </div>
</template>

<script setup lang="ts">
import { PlusIcon, MinusIcon } from "@heroicons/vue/solid";

const props = defineProps<{
    quantity: number;
    increment: () => void;
    decrement: () => void;
}>();
</script>
