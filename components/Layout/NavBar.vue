<template>
    <div class="bg-violet-50 py-2 px-4">
        <div class="relative mx-auto flex max-w-6xl justify-between">
            <RegionSelection />

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
    <div class="sticky top-0 z-30 border-b border-b-grey-20 bg-white px-4">
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
                <transition
                    enter-active-class="transition ease-out duration-100"
                    enter-from-class="transform opacity-0 scale-95"
                    enter-to-class="transform opacity-100 scale-100"
                    leave-active-class="transition ease-in duration-75"
                    leave-from-class="transform opacity-100 scale-100"
                    leave-to-class="transform opacity-0 scale-95"
                >
                    <CartOverview v-if="route.fullPath !== '/checkout'" />
                </transition>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { SearchIcon } from "@heroicons/vue/outline";

const route = useRoute();
</script>
