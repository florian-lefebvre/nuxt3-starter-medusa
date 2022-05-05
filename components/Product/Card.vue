<template>
    <NuxtLink
        :to="`/products/${product.handle}`"
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
            <div class="text-sm text-grey-70">From {{ price }}</div>
        </div>
    </NuxtLink>
</template>

<script setup lang="ts">
import { Product } from "@medusajs/medusa";

const props = defineProps<{ product: Product }>();

const { formatPrice, getProductExtremeVariants } = usePrices();

const price = formatPrice(getProductExtremeVariants(props.product).minVariant);
</script>
