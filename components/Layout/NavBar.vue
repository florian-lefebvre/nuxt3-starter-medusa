<template>
  <div class="py-2 px-4 bg-violet-50">
    <div class="flex justify-between max-w-6xl mx-auto relative">

      <button class="text-white transition-colors hover:text-violet-10">
        {{ currencyCode.toUpperCase() }}
      </button>

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
      <NuxtLink to="/" class="absolute right-auto inset-y-2 inset-x-0">
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
      <div class="absolute left-auto flex items-center space-x-6 inset-0 h-14">
        <button
          class="border-b-2 border-transparent transition-colors text-grey-40 hover:text-grey-50 h-full py-4"
        >
          <SearchIcon class="h-full" />
        </button>
        <button
          class="border-b-2 border-transparent font-medium transition-colors text-grey-40 hover:text-grey-50 h-full py-4 flex items-end space-x-1"
        >
          <ShoppingBagIcon class="h-full" />
          <span class="leading-none text-xl">{{ products.length }}</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// https://tailwindui.com/components/ecommerce/components/store-navigation
import { ShoppingBagIcon, SearchIcon } from "@heroicons/vue/outline";
import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/vue";
import { useStore } from "~/stores/useStore";

const { currencyCode, products } = useStore();
</script>
