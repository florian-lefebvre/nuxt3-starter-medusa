import { defineStore } from "pinia";

const KEY = "display";

export const useDisplay = defineStore(KEY, () => {
    const cartView = ref(false);
    const orderSummary = ref(false);
    const checkoutStep = ref(1);

    const updateCartViewDisplay = () => {
        cartView.value = !cartView.value;
    };
    const updateOrderSummaryDisplay = () => {
        orderSummary.value = !orderSummary.value;
    };
    const updateCheckoutStep = (step: number) => {
        checkoutStep.value = step;
    };

    return {
        cartView,
        orderSummary,
        checkoutStep,
        updateCartViewDisplay,
        updateOrderSummaryDisplay,
        updateCheckoutStep,
    };
});
