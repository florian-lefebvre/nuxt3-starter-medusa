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
        <div class="custom-container py-20 px-4">
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
                    :to="`/products/${product.handle}`"
                    v-for="product in products"
                    class="transition-all hover:scale-95"
                >
                    <img
                        :src="product.thumbnail"
                        :alt="product.title"
                        class="rounded-2xl"
                    />
                    <div class="p-4 text-center">
                        <div class="text-xl font-medium">
                            {{ product.title }}
                        </div>
                        <div class="text-sm text-grey-70">
                            From
                            {{
                                priceToFloat(
                                    productPrices(product, currencyCode).min
                                )
                            }}
                            {{ currencyCode.toUpperCase() }}
                        </div>
                    </div>
                </NuxtLink>
            </div>
        </div>
        <div class="custom-container py-20 px-4">
            <div class="flex items-center justify-between">
                <h2 class="text-4xl font-bold">Our collections</h2>
                <NuxtLink
                    to="/collections"
                    class="inline-flex items-center space-x-2 rounded-md bg-violet-5 px-6 py-2 font-medium text-violet-60 transition-colors hover:bg-violet-10"
                >
                    <div>Browse all</div>
                    <ArrowRightIcon class="h-4 w-4" />
                </NuxtLink>
            </div>
            <div class="mt-10 grid grid-cols-3 gap-4">
                <NuxtLink
                    :to="`/collections/${collection.handle}`"
                    v-for="collection in collections"
                    class="relative overflow-hidden rounded-2xl transition-all hover:scale-95"
                >
                    <img
                        :src="collection.metadata.image"
                        :alt="collection.title"
                        class=""
                    />
                    <div
                        class="absolute inset-0 flex items-end justify-start bg-gradient-to-b from-black/0 to-black p-6"
                    >
                        <div class="">
                            <div class="text-xl font-medium text-white">
                                {{ collection.title }}
                            </div>
                            <div class="text-sm text-violet-40">
                                {{ collection.metadata.description }}
                            </div>
                        </div>
                    </div>
                </NuxtLink>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ArrowRightIcon } from "@heroicons/vue/solid";

const { $medusa } = useNuxtApp();

const store = useStore();
const { currencyCode } = storeToRefs(store);

const { productPrices, priceToFloat } = useHelpers();

const { data: products } = useAsyncData("products", async () => {
    const data = await $medusa.products.list({ limit: 4 });
    return data.products;
});

const { data: collections } = useAsyncData("collections", async () => {
    const data = await $medusa.collections.list({ limit: 3 });
    return data.collections;
});
</script>
