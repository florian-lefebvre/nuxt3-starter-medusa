<template>
    <div class="py-20 px-4">
        <div class="custom-container">
            <div class="flex items-center justify-between">
                <h2 class="text-4xl font-bold">Products</h2>
                <div class="flex items-center space-x-4">
                    <button
                        type="button"
                        @click="displayGrid = !displayGrid"
                        class="text-grey-40 transition-all hover:text-grey-50"
                    >
                        <span class="sr-only"
                            >View {{ displayGrid ? "grid" : "list" }}</span
                        >
                        <ViewGridIcon
                            v-if="displayGrid"
                            class="h-5 w-5"
                            :aria-hidden="!displayGrid"
                        />
                        <MenuAlt2Icon
                            v-else
                            class="h-5 w-5"
                            :aria-hidden="displayGrid"
                        />
                    </button>
                    <div class="text-sm text-grey-50">
                        {{ filteredProducts.length }} out of
                        {{ products.length }}
                    </div>
                </div>
            </div>
            <div class="mt-10 flex">
                <div class="mr-4 w-64 flex-shrink-0">
                    <div class="sticky top-16">
                        <Disclosure
                            as="div"
                            v-for="(section, i) in filters"
                            class="py-6"
                            :class="{
                                'border-b border-grey-20':
                                    i !== filters.length - 1,
                            }"
                            v-slot="{ open }"
                        >
                            <h3 class="-my-3 flow-root">
                                <DisclosureButton
                                    class="flex w-full items-center justify-between bg-white py-3 text-sm text-grey-40 transition-all hover:text-grey-50"
                                >
                                    <span class="font-medium text-grey-90">
                                        {{ section.name }}
                                    </span>
                                    <span class="ml-6 flex items-center">
                                        <PlusSmIcon
                                            v-if="!open"
                                            class="h-5 w-5"
                                            aria-hidden="true"
                                        />
                                        <MinusSmIcon
                                            v-else
                                            class="h-5 w-5"
                                            aria-hidden="true"
                                        />
                                    </span>
                                </DisclosureButton>
                            </h3>
                            <transition
                                enter-active-class="transition duration-100 ease-out"
                                enter-from-class="transform scale-95 opacity-0"
                                enter-to-class="transform scale-100 opacity-100"
                                leave-active-class="transition duration-75 ease-out"
                                leave-from-class="transform scale-100 opacity-100"
                                leave-to-class="transform scale-95 opacity-0"
                            >
                                <DisclosurePanel class="pt-6">
                                    <div class="space-y-4">
                                        <div
                                            v-for="(
                                                option, optionIdx
                                            ) in section.options"
                                            :key="option.value"
                                            class="group flex cursor-pointer items-center"
                                        >
                                            <input
                                                :id="`filter-${section.name.toLowerCase()}-${optionIdx}`"
                                                :value="option.value"
                                                :name="`${section.name.toLowerCase()}[]`"
                                                v-model="option.checked"
                                                type="checkbox"
                                                :checked="option.checked"
                                                class="h-4 w-4 rounded border-grey-30 text-violet-50 focus:ring-violet-50"
                                            />
                                            <label
                                                :for="`filter-${section.name.toLowerCase()}-${optionIdx}`"
                                                class="ml-3 w-full text-sm text-grey-60 group-hover:text-grey-80"
                                            >
                                                {{ option.value }}
                                            </label>
                                        </div>
                                    </div>
                                </DisclosurePanel>
                            </transition>
                        </Disclosure>
                        <transition
                            enter-active-class="transition duration-100 ease-out"
                            enter-from-class="transform scale-95 opacity-0"
                            enter-to-class="transform scale-100 opacity-100"
                            leave-active-class="transition duration-75 ease-out"
                            leave-from-class="transform scale-100 opacity-100"
                            leave-to-class="transform scale-95 opacity-0"
                        >
                            <button
                                v-if="activeFilters.length > 0"
                                @click="resetFilters()"
                                class="flex w-full items-center justify-center space-x-2 rounded-md bg-violet-5 px-6 py-2 font-medium text-violet-60 transition-all hover:bg-violet-10 focus:ring focus:ring-violet-50"
                            >
                                <div>Reset filters</div>
                                <XIcon class="h-4 w-4" />
                            </button>
                        </transition>
                    </div>
                </div>
                <div class="w-full">
                    <div v-if="filteredProducts.length > 0" class="contents">
                        <ProductGrid
                            v-if="displayGrid"
                            :products="filteredProducts"
                        />
                        <ProductList v-else :products="filteredProducts" />
                    </div>
                    <div
                        v-else
                        class="mt-16 block text-center text-xl text-grey-50"
                    >
                        No products match the active filters. Try something
                        else!
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { Disclosure, DisclosurePanel, DisclosureButton } from "@headlessui/vue";
import {
    MinusSmIcon,
    PlusSmIcon,
    XIcon,
    ViewGridIcon,
    MenuAlt2Icon,
} from "@heroicons/vue/solid";

const { $medusa } = useNuxtApp();

const displayGrid = ref(true);

const { data: products } = await useAsyncData("products", async () => {
    const { products } = await $medusa.products.list();
    return products;
});

const { filters, activeFilters, filteredProducts, resetFilters } =
    useFilters(products);
</script>
