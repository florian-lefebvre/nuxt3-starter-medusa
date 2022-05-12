import { ProductVariant } from "@medusajs/medusa";
import { ComputedRef } from "vue";

export const useHelpers = () => {
    const variantQuantity = (
        variant: ComputedRef<ProductVariant>,
        initial: number = 1
    ) => {
        const quantity = ref(initial);

        // TODO: check quantity already in cart

        watch(variant, () => {
            if (variant.value.inventory_quantity < quantity.value) {
                quantity.value = variant.value.inventory_quantity;
            }
        });

        const increment = () => {
            if (quantity.value === variant.value.inventory_quantity) return;
            quantity.value++;
        };

        const decrement = () => {
            if (quantity.value === 1) return;
            quantity.value--;
        };

        const reset = () => {
            quantity.value = initial;
        };

        return {
            quantity,
            increment,
            decrement,
            reset,
        };
    };

    return { variantQuantity };
};
