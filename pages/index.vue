<template>
  <div class="">
    <div
      class="py-48 flex items-center justify-center bg-[url('https://picsum.photos/id/1059/1920/1080')] bg-center bg-cover relative"
    >
      <div class="text-center z-10 max-w-xl">
        <h1 class="text-6xl font-bold mb-6 text-white">Claim your merch</h1>
        <p class="text-lg mb-10 text-white">
          Contribute to Medusa and receive free merch as a token of our
          appreciation.
        </p>
        <NuxtLink
          to="/"
          class="bg-violet-60 text-white px-10 py-4 text-xl rounded-md font-medium transition-colors hover:bg-violet-70"
          >Learn more</NuxtLink
        >
      </div>
      <div class="absolute inset-0 bg-black/75"></div>
    </div>
    <div class="py-20 px-8">
      <div class="flex justify-between items-center">
        <h2 class="text-4xl font-bold">A few products</h2>
        <NuxtLink
          to="/products"
          class="text-violet-60 font-medium inline-flex items-center space-x-2 bg-violet-5 rounded-md hover:bg-violet-10 transition-colors px-6 py-2"
        >
          <div>Browse all</div>
          <ArrowRightIcon class="w-4 h-4" />
        </NuxtLink>
      </div>
      <div class="grid grid-cols-4 gap-4 mt-10">
        <NuxtLink
          :to="`/products/${product}`"
          v-for="product in [0, 1, 2, 3]"
          class="p-4 hover:bg-grey-10 rounded-lg transition-colors"
        >
          <img
            :src="`https://picsum.photos/id/${product}/500/500`"
            :alt="product.toString()"
            class="rounded-lg mb-4"
          />
          <div class="text-center">
            <div>[COLLECTION]</div>
            <div>[NAME] #{{ product }}</div>
            <div>[COLORS]</div>
          </div>
        </NuxtLink>
      </div>
    </div>
    <div>CTA</div>
    <div>
      <div class="">
        <h2>Shop by collection</h2>
        <div>Browse all</div>
      </div>
      <div>Collection #n</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ArrowRightIcon } from "@heroicons/vue/solid";
</script>
