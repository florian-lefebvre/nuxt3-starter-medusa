<template>
    <div class="">
        <div
            class="relative flex items-center justify-center bg-[url('https://picsum.photos/id/1059/1920/1080')] bg-cover bg-center py-48"
        >
            <div class="z-[1] max-w-xl text-center">
                <h1 class="mb-6 text-6xl font-bold text-white">
                    Claim your merch
                </h1>
                <p class="mb-10 text-lg text-white">
                    Contribute to Medusa and receive free merch as a token of
                    our appreciation.
                </p>
                <NuxtLink
                    to="/"
                    class="rounded-md bg-violet-60 px-10 py-4 text-xl font-medium text-white transition-colors hover:bg-violet-70"
                    >Learn more</NuxtLink
                >
            </div>
            <div class="absolute inset-0 z-0 bg-black/75"></div>
        </div>
        <div class="custom-container py-20 px-8">
            <div class="flex items-center justify-between">
                <h2 class="text-4xl font-bold">A few products</h2>
                <NuxtLink
                    to="/products"
                    class="inline-flex items-center space-x-2 rounded-md bg-violet-5 px-6 py-2 font-medium text-violet-60 transition-colors hover:bg-violet-10"
                >
                    <div>Browse all</div>
                    <ArrowRightIcon class="h-4 w-4" />
                </NuxtLink>
            </div>
            <div class="mt-10 grid grid-cols-4 gap-4">
                <NuxtLink
                    :to="`/products/${product}`"
                    v-for="product in [0, 1, 2, 3]"
                    class="rounded-lg p-0 transition-all hover:bg-grey-10 hover:p-4"
                >
                    <img
                        :src="`https://picsum.photos/id/${product}/500/500`"
                        :alt="product.toString()"
                        class="mb-4 rounded-lg"
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
