<template>
    <div class="grid gap-4 divide-y-2">
        <ProductDetailed v-for="product in products" :product="product" />
    </div>
</template>

<script setup lang="ts">
import { Product } from "@medusajs/medusa";

const props = defineProps<{ products: Product[] }>();
</script>
