import { defineStore } from "pinia";

export const useDisplay = defineStore("display", () => {
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
