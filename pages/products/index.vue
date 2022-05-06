<template>
    <div class="py-20 px-4">
        <div class="custom-container">
            <div>PRODUCTS</div>
            <div class="flex">
                <div class="mr-4 mt-10 w-64 flex-shrink-0">
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
                        <div v-if="activeFilters.length > 0">Reset</div>
                    </div>
                </div>
                <div>
                    <ProductGrid>
                        <ProductCard
                            v-for="product in filteredProducts"
                            :product="product"
                        />
                    </ProductGrid>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { Disclosure, DisclosurePanel, DisclosureButton } from "@headlessui/vue";
import { MinusSmIcon, PlusSmIcon } from "@heroicons/vue/solid";
import { Product } from "@medusajs/medusa";

type Filter = {
    name: string;
    options: {
        value: string;
        checked: boolean;
    }[];
};

const { $medusa } = useNuxtApp();

const { data: products } = await useAsyncData("products", async () => {
    const { products } = await $medusa.products.list();
    return products;
});

const getFilters = (): Filter[] => {
    const _filters: Filter[] = [];

    for (const product of products.value) {
        for (const { title, values } of product.options) {
            if (!_filters.some((filter) => filter.name === title)) {
                _filters.push({
                    name: title,
                    options: [],
                });
            }
            const filter = _filters.find((filter) => filter.name === title);
            for (const value of values) {
                if (
                    !filter.options.some(
                        (option) => option.value === value.value
                    )
                ) {
                    filter.options.push({
                        value: value.value,
                        checked: false,
                    });
                }
            }
        }
    }

    return _filters;
};

const filters = ref<Filter[]>(getFilters());

const activeFilters = computed<Filter[]>(() => {
    const _filters: Filter[] = [];
    for (const filter of filters.value) {
        const options = filter.options.filter((option) => option.checked);
        if (options.length > 0) {
            _filters.push({
                name: filter.name,
                options,
            });
        }
    }
    return _filters;
});

const filteredProducts = computed<Product[]>(() => {
    if (activeFilters.value.length === 0) {
        return products.value;
    }
    return products.value.filter((product) =>
        activeFilters.value.every((filter) =>
            product.options.some(
                (option) =>
                    option.title === filter.name &&
                    filter.options.some((f) =>
                        option.values.map((v) => v.value).includes(f.value)
                    )
            )
        )
    );
});
</script>
