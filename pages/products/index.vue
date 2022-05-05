<template>
    <div class="py-20 px-4">
        <div class="custom-container">
            <div>PRODUCTS</div>
            <!-- <div class="flex">
                <div class="sticky top-32 w-64 flex-shrink-0">
                    <div>FILTERS (sticky!)</div>
                </div>
                <ProductGrid>
                    <ProductCard
                        v-for="product in products"
                        :product="product"
                    />
                </ProductGrid>
            </div> -->
            <pre>{{ variants }}</pre>
            <!-- <pre>{{ test }}</pre> -->
        </div>
    </div>
</template>

<script setup lang="ts">
const { $medusa } = useNuxtApp();

// const { data: products } = await useAsyncData("products", async () => {
//     const { products } = await $medusa.products.list();
//     return products;
// });

// const { data: test } = await useAsyncData("test", async () => {
//     const { products } = await $medusa.products.list({
//         expand: "variants",
//     });
//     return products;
// });

const { data: variants } = await useAsyncData("test", async () => {
    const { variants } = await $medusa.products.variants.list();
    return variants;
});

// let variants = [];
// for (const product of products.value) {
//     variants.push(product.variants);
// }
// variants = [...new Set(variants)];
</script>
