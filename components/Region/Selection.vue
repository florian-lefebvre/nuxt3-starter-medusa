<template>
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
                class="absolute left-0 z-40 mt-2 w-56 origin-top-left rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
            >
                <div class="py-1">
                    <MenuItem
                        v-slot="{ active }"
                        v-for="country in countries"
                        @click.native="
                            setRegion({
                                countryName: country.display_name,
                                regionId: country.region_id,
                            })
                        "
                    >
                        <button
                            :class="[
                                active
                                    ? 'bg-grey-10 text-grey-90'
                                    : 'text-grey-70',
                                country.display_name === countryName
                                    ? 'bg-violet-10 font-medium text-violet-90'
                                    : '',
                            ]"
                            class="flex w-full items-center space-x-2 px-4 py-2 text-sm"
                        >
                            <div>
                                {{ country.display_name }}
                            </div>
                            <div
                                :class="[
                                    country.display_name === countryName
                                        ? 'text-violet-60'
                                        : 'text-grey-60',
                                ]"
                                class="text-xs font-normal"
                            >
                                {{ country.currency_code.toUpperCase() }}
                            </div>
                        </button>
                    </MenuItem>
                </div>
            </MenuItems>
        </transition>
    </Menu>
</template>

<script setup lang="ts">
import { ChevronDownIcon } from "@heroicons/vue/outline";
import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/vue";
import { Country, Region } from "@medusajs/medusa";
import { UseStoreRefs } from "~/types/stores";

const store = useStore();
const { countryName, regions, currencyCode }: UseStoreRefs = storeToRefs(
    store
) as any;
const { setRegion } = store;

const countries = computed(() => {
    const _countries: (Country & {
        currency_code: string;
    })[] = [];
    for (const region of regions.value as Region[]) {
        for (const country of region.countries) {
            _countries.push({
                ...country,
                currency_code: region.currency_code,
            });
        }
    }
    return _countries;
});
</script>
