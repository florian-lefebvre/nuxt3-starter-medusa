import { ProductVariant } from "@medusajs/medusa";
import { ComputedRef } from "vue";
import { UseStoreRefs } from "~/types/stores";

export const useHelpers = () => {
    const store = useStore();
    const { cart }: UseStoreRefs = storeToRefs(store) as any;

    const variantQuantity = (
        variant: ComputedRef<ProductVariant>,
        initial: number = 1
    ) => {
        const quantity = ref(initial);
        const max = computed(
            () =>
                variant.value.inventory_quantity -
                (cart.value.items.find(
                    (item) => item.variant_id === variant.value.id
                )?.quantity ?? 0)
        );
        const hasStock = computed(() => max.value > 0);

        watch(variant, () => {
            if (max.value < quantity.value) {
                quantity.value = max.value === 0 ? 1 : max.value;
            }
        });

        const increment = () => {
            if (max.value === 0 || quantity.value === max.value) return;
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
            hasStock,
        };
    };

    return { variantQuantity };
};
