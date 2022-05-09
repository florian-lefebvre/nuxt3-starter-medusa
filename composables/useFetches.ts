export const useFetches = () => {
    const { $medusa } = useNuxtApp();

    const fetchProducts = async () =>
        (
            await useAsyncData("products", async () => {
                const { products } = await $medusa.products.list();
                return products;
            })
        ).data;

    const fetchCollections = async () =>
        (
            await useAsyncData("collections", async () => {
                const { collections } = await $medusa.collections.list();
                return collections;
            })
        ).data;

    const fetchProductsOverview = async () =>
        await useAsyncData("products-overview", async () => {
            const { products } = await $medusa.products.list({ limit: 4 });
            return products;
        }).data;

    const fetchCollectionsOverview = async () =>
        (
            await useAsyncData("collections-overview", async () => {
                const { collections } = await $medusa.collections.list({
                    limit: 3,
                });
                return collections;
            })
        ).data;

    return {
        fetchProducts,
        fetchCollections,
        fetchProductsOverview,
        fetchCollectionsOverview,
    };
};
