<template>
    <div class="grid gap-12">
        <ProductDetailed
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
