<template>
    <div class="py-2 px-4 bg-violet-50">
        <div class="flex justify-between max-w-6xl mx-auto relative">
            <Menu as="div" class="relative inline-block text-left">
                <div>
                    <MenuButton
                        class="text-white transition-colors hover:text-violet-10 inline-flex items-center space-x-1"
                    >
                        <span
                            >{{ countryName }} /
                            {{ currencyCode.toUpperCase() }}</span
                        >
                        <ChevronDownIcon class="w-4 h-4" aria-hidden="true" />
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
                        class="origin-top-right absolute left-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10"
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
                                            ? 'bg-violet-10 text-violet-90 font-medium'
                                            : '',
                                    ]"
                                    class="px-4 py-2 text-sm flex space-x-2 items-center w-full"
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
    <div class="sticky top-0 px-4 bg-white border-b border-b-grey-30">
        <div
            class="relative flex items-center justify-center max-w-6xl mx-auto h-14"
        >
            <NuxtLink to="/" class="absolute right-auto inset-y-3 inset-x-0">
                <img src="/medusa-logo.svg" class="h-full" />
            </NuxtLink>
            <div class="flex space-x-6 items-center">
                <NuxtLink
                    to="/products"
                    class="border-b-2 hover:border-violet-50 border-transparent font-medium transition-colors text-grey-60 hover:text-violet-50 h-full py-4"
                >
                    <div>Products</div>
                </NuxtLink>
                <NuxtLink
                    to="/collections"
                    class="border-b-2 hover:border-violet-50 border-transparent font-medium transition-colors text-grey-60 hover:text-violet-50 h-full py-4"
                    >Collections</NuxtLink
                >
            </div>
            <div
                class="absolute left-auto flex items-center space-x-6 inset-0 h-14"
            >
                <button
                    class="border-b-2 border-transparent transition-colors text-grey-40 hover:text-grey-50 h-full py-4"
                >
                    <SearchIcon class="h-full" />
                </button>
                <button
                    class="border-b-2 border-transparent font-medium transition-colors text-grey-40 hover:text-grey-50 h-full py-4 flex items-end space-x-1"
                >
                    <ShoppingBagIcon class="h-full" />
                    <span class="leading-none text-xl">{{
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
