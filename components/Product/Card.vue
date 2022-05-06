<template>
    <NuxtLink
        :to="`/products/${product.handle}`"
        class="rounded-2xl transition-all hover:scale-95 focus:ring focus:ring-violet-50"
    >
        <img
            :src="
                product.thumbnail ||
                `https://via.placeholder.com/1678x2098/F3F4F6/6B7280?text=${encodeURIComponent(
                    product.title
                )}`
            "
            :alt="product.title"
            loading="lazy"
            class="rounded-2xl"
        />
        <div class="p-4 text-left">
            <div class="text-xl font-medium">
                {{ product.title }}
            </div>
            <ClientOnly>
                <div class="text-sm">
                    <span class="text-grey-70">From </span>
                    <span class="font-semibold text-violet-50">{{
                        price
                    }}</span>
                </div>
            </ClientOnly>
        </div>
    </NuxtLink>
</template>

<script setup lang="ts">
import { Product } from "@medusajs/medusa";

const props = defineProps<{ product: Product }>();

const { formatPrice, getProductExtremeVariants } = usePrices();

const price = formatPrice(getProductExtremeVariants(props.product).minVariant);
</script>
