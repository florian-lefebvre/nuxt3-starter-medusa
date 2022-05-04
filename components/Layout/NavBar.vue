<template>
    <div class="bg-violet-50 py-2 px-4">
        <div class="relative mx-auto flex max-w-6xl justify-between">
            <Menu as="div" class="relative inline-block text-left">
                <div>
                    <MenuButton
                        class="inline-flex items-center space-x-2 text-white transition-colors hover:text-violet-10"
                    >
                        <span>{{ countryName }}</span>
                        <span class="text-xs text-violet-10">
                            {{ currencyCode.toUpperCase() }}
                        </span>
                        <ChevronDownIcon class="h-4 w-4" aria-hidden="true" />
                    </MenuButton>
                </div>

                <transition
                    enter-active-class="transition ease-out duration-100"
                    enter-from-class="transform opacity-0 scale-95"
                    enter-to-class="transform opacity-100 scale-100"
                    leave-active-class="transition ease-in duration-75"
                    leave-from-class="transform opacity-100 scale-100"
                    leave-to-class="transform opacity-0 scale-95"
                >
                    <MenuItems
                        class="absolute left-0 z-40 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                    >
                        <div class="py-1">
                            <MenuItem
                                v-slot="{ active }"
                                v-for="e in countries"
                                @click.native="
                                    setRegion({
                                        countryName: e.country.display_name,
                                        region: e.region,
                                    })
                                "
                            >
                                <button
                                    :class="[
                                        active
                                            ? 'bg-gray-100 text-grey-90'
                                            : 'text-grey-70',
                                        e.country.display_name === countryName
                                            ? 'bg-violet-10 font-medium text-violet-90'
                                            : '',
                                    ]"
                                    class="flex w-full items-center space-x-2 px-4 py-2 text-sm"
                                >
                                    <div>
                                        {{ e.country.display_name }}
                                    </div>
                                    <div
                                        :class="[
                                            e.country.display_name ===
                                            countryName
                                                ? 'text-violet-60'
                                                : 'text-grey-60',
                                        ]"
                                        class="text-xs font-normal"
                                    >
                                        {{
                                            e.region.currency_code.toUpperCase()
                                        }}
                                    </div>
                                </button>
                            </MenuItem>
                        </div>
                    </MenuItems>
                </transition>
            </Menu>

            <div class="flex space-x-4">
                <NuxtLink
                    to="/sign-in"
                    class="text-white transition-colors hover:text-violet-10"
                    >Sign in</NuxtLink
                >
                <NuxtLink
                    to="/sign-up"
                    class="text-white transition-colors hover:text-violet-10"
                    >Create an account</NuxtLink
                >
            </div>
        </div>
    </div>
    <div class="sticky top-0 z-30 border-b border-b-grey-30 bg-white px-4">
        <div
            class="relative mx-auto flex h-14 max-w-6xl items-center justify-center"
        >
            <NuxtLink to="/" class="absolute inset-y-3 inset-x-0 right-auto">
                <img src="/medusa-logo.svg" class="h-full" />
            </NuxtLink>
            <div class="flex items-center space-x-6">
                <NuxtLink
                    to="/products"
                    class="h-full border-b-2 border-transparent py-4 font-medium text-grey-60 transition-colors hover:border-violet-50 hover:text-violet-50"
                >
                    <div>Products</div>
                </NuxtLink>
                <NuxtLink
                    to="/collections"
                    class="h-full border-b-2 border-transparent py-4 font-medium text-grey-60 transition-colors hover:border-violet-50 hover:text-violet-50"
                    >Collections</NuxtLink
                >
            </div>
            <div
                class="absolute inset-0 left-auto flex h-14 items-center space-x-6"
            >
                <button
                    class="h-full border-b-2 border-transparent py-4 text-grey-40 transition-colors hover:text-grey-50"
                >
                    <SearchIcon class="h-full" />
                </button>
                <button
                    class="flex h-full items-end space-x-1 border-b-2 border-transparent py-4 font-medium text-grey-40 transition-colors hover:text-grey-50"
                >
                    <ShoppingBagIcon class="h-full" />
                    <span class="text-xl leading-none">{{
                        cart.items.length
                    }}</span>
                </button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
// https://tailwindui.com/components/ecommerce/components/store-navigation
import {
    ShoppingBagIcon,
    SearchIcon,
    ChevronDownIcon,
} from "@heroicons/vue/outline";
import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/vue";
import { Country, Region } from "@medusajs/medusa";

const store = useStore();
const { cart, countryName, regions, currencyCode } = storeToRefs(store);
const { setRegion } = store;

const countries = computed(() => {
    const _countries: {
        country: Country;
        region: Region;
    }[] = [];
    for (const region of regions.value as Region[]) {
        for (const country of region.countries as Country[]) {
            _countries.push({ country, region });
        }
    }
    return _countries;
});
</script>
