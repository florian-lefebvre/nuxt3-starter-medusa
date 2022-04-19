<template>
  <div class="bg-violet-60 p-2">
    <div class="max-w-6xl flex justify-between mx-auto">
      <div class="text-white hover:text-violet-10 transition-colors">
        CURRENCY_CODE
      </div>
      <div class="flex space-x-4">
        <NuxtLink
          to="/sign-in"
          class="text-white hover:text-violet-10 transition-colors"
          >Sign in</NuxtLink
        >
        <NuxtLink
          to="/sign-up"
          class="text-white hover:text-violet-10 transition-colors"
          >Create an account</NuxtLink
        >
      </div>
    </div>
  </div>
  <div></div>
</template>

<script setup lang="ts">
// https://tailwindui.com/components/ecommerce/components/store-navigation
import { ShoppingBagIcon } from "@heroicons/vue/outline";
import { useDisplay } from "~/stores/useDisplay";
import { useStore } from "~/stores/useStore";

const { updateCartViewDisplay } = useDisplay();
const { cart } = useStore();
const { quantity, sum } = useHelpers();
const isCheckout = ref(true);
const route = useRoute();

watch(route, (n) => {
  if (n.fullPath === "/checkout" || n.fullPath === "/payment") {
    isCheckout.value = true;
  } else {
    isCheckout.value = false;
  }
});
</script>
