<template>
    <div class="grid gap-12">
        <ProductDetailed v-for="product in products" :product="product" />
    </div>
</template>

<script setup lang="ts">
import { Product } from "@medusajs/medusa";

const props = defineProps<{ products: Product[] }>();
</script>
