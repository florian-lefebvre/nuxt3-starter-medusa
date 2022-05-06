<template>
    <NuxtLink :to="`/products/${product.handle}`">
        {{ product.title }}
    </NuxtLink>
</template>

<script setup lang="ts">
import { Product } from "@medusajs/medusa";

const props = defineProps<{ product: Product }>();

const { formatPrice, getProductExtremeVariants } = usePrices();

const price = formatPrice(getProductExtremeVariants(props.product).minVariant);
</script>
