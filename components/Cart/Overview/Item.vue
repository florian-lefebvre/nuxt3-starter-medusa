<template>
    <div class="grid grid-cols-5 gap-2 px-4 py-2">
        <img :src="item.thumbnail" :alt="item.title" class="rounded-md" />
        <div class="col-span-4 flex items-start justify-between">
            <div class="flex flex-col">
                <div class="mb-2">
                    <div>
                        <span class="font-medium">{{ item.title }}</span>
                        <span class="text-sm text-grey-60">
                            x{{ item.quantity }}</span
                        >
                    </div>
                    <div class="text-sm text-grey-60">
                        {{ item.variant.title }}
                    </div>
                </div>
                <div class="mt-auto font-medium text-violet-50">
                    {{
                        formatMoneyAmount(
                            applyTax(item.unit_price * item.quantity),
                            2
                        )
                    }}
                </div>
            </div>
            <div class="flex h-full flex-col items-end justify-between">
                <button
                    @click="removeLineItem(item.id)"
                    class="rounded-md p-2 text-grey-40 transition-colors hover:bg-red-100 hover:text-red-700"
                >
                    <TrashIcon class="h-4 w-4" />
                </button>
                <CartQuantitySelector
                    :quantity="item.quantity"
                    :increment="() => {}"
                    :decrement="() => {}"
                    size="small"
                />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { LineItem } from "@medusajs/medusa";
import { TrashIcon } from "@heroicons/vue/solid";
import { UseStoreRefs } from "~/types/stores";

const props = defineProps<{ item: LineItem }>();

const store = useStore();
const {}: UseStoreRefs = storeToRefs(store) as any;
const { removeLineItem } = store;

const { formatMoneyAmount, applyTax } = usePrices();
</script>
