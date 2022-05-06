import { defineStore } from "pinia";
import { ProductsDisplay } from "~/types";

const KEY = "preferences";

export const usePreferences = defineStore(KEY, () => {
    const productsDisplay = ref<ProductsDisplay>("grid");

    const storage = useStoreStorage({
        key: KEY,
        state: { productsDisplay },
    });

    const switchDisplay = () => {
        productsDisplay.value =
            productsDisplay.value === "grid" ? "list" : "grid";
    };

    storage.init();

    return {
        productsDisplay,
        switchDisplay,
    };
});
