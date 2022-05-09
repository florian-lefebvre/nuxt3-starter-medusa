<template>
    <Popover class="relative">
        <PopoverButton
            class="flex items-end space-x-1 border-b-2 border-transparent py-4 font-medium text-grey-40 transition-colors hover:text-grey-50"
        >
            <ShoppingBagIcon class="h-6" />
            <span class="text-lg leading-none">{{ itemsQuantity }}</span>
        </PopoverButton>
        <transition
            enter-active-class="transition ease-out duration-100"
            enter-from-class="transform opacity-0 scale-95"
            enter-to-class="transform opacity-100 scale-100"
            leave-active-class="transition ease-in duration-75"
            leave-from-class="transform opacity-100 scale-100"
            leave-to-class="transform opacity-0 scale-95"
        >
            <PopoverPanel
                class="absolute right-0 z-40 mt-2 flex max-h-[calc(100vh-120px)] w-96 origin-top-right flex-col rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
            >
                <div v-if="itemsQuantity > 0" class="contents">
                    <div
                        class="grid divide-y divide-grey-10 overflow-y-auto border-b border-grey-10"
                    >
                        <div
                            v-for="item in cart.items"
                            class="grid grid-cols-5 gap-2 px-4 py-2"
                        >
                            <img
                                :src="item.thumbnail"
                                :alt="item.title"
                                class="rounded-md"
                            />
                            <div
                                class="col-span-4 flex items-start justify-between"
                            >
                                <div class="flex flex-col">
                                    <div class="mb-2">
                                        <div>
                                            <span class="font-medium">{{
                                                item.title
                                            }}</span>
                                            <span class="text-sm text-grey-60">
                                                x{{ item.quantity }}</span
                                            >
                                        </div>
                                        <div class="text-sm text-grey-60">
                                            {{ item.variant.title }}
                                        </div>
                                    </div>
                                    <div
                                        class="mt-auto font-medium text-violet-50"
                                    >
                                        {{
                                            formatMoneyAmount(
                                                applyTax(
                                                    item.unit_price *
                                                        item.quantity
                                                ),
                                                2
                                            )
                                        }}
                                    </div>
                                </div>
                                <button
                                    @click="removeLineItem(item.id)"
                                    class="rounded-md bg-grey-5 p-2 text-grey-50 transition-colors hover:bg-red-100 hover:text-red-700"
                                >
                                    <XIcon class="h-4 w-4" />
                                </button>
                            </div>
                        </div>
                    </div>
                    <div class="m-2 mt-4 grid gap-2">
                        <NuxtLink
                            to="/checkout"
                            class="flex w-full items-center justify-center space-x-2 rounded-md bg-violet-50 px-6 py-3 font-medium text-white transition-all hover:bg-violet-60 focus:ring focus:ring-violet-60 focus:ring-offset-2 focus:ring-offset-white disabled:bg-grey-40"
                        >
                            <span>Checkout</span>
                            <span class="text-violet-20">
                                ({{
                                    formatMoneyAmount(applyTax(cart.total), 2)
                                }})
                            </span>
                        </NuxtLink>
                        <NuxtLink
                            to="/shopping-cart"
                            class="w-full rounded-md px-6 py-2 text-center font-medium text-violet-50 transition-all hover:underline"
                            >View cart</NuxtLink
                        >
                    </div>
                </div>
                <div v-else class="p-2 text-center text-grey-60">
                    Your cart is empty.
                </div>
            </PopoverPanel>
        </transition>
    </Popover>
</template>

<script setup lang="ts">
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/vue";
import { ShoppingBagIcon, XIcon } from "@heroicons/vue/outline";
import { UseStoreRefs } from "~/types/stores";

const store = useStore();
const { cart }: UseStoreRefs = storeToRefs(store) as any;
const { removeLineItem } = store;

const itemsQuantity = computed(() => {
    let quantity = 0;
    for (const item of cart.value.items) {
        quantity += item.quantity;
    }
    return quantity;
});

const { formatMoneyAmount, applyTax } = usePrices();
</script>
