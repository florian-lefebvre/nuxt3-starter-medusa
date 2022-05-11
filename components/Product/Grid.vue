<template>
    <div class="grid grid-cols-4 gap-x-4 gap-y-12">
        <ProductCard
            v-for="(product, i) in products"
            :product="product"
            :lazy="i > 3"
        />
    </div>
</template>

<script setup lang="ts">
import { Product } from "@medusajs/medusa";

const props = defineProps<{ products: Product[] }>();
</script>
