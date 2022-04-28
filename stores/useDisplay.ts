type State = {
  cartView: boolean;
  orderSummary: boolean;
  checkoutStep: number;
};

const STATE: State = {
  cartView: false,
  orderSummary: false,
  checkoutStep: 1,
};

const { state, mutation, ...store } = createStore("display", STATE);

const updateCartViewDisplay = mutation("updateCartViewDisplay", (state) => {
  state.cartView = !state.cartView;
});

const updateOrderSummaryDisplay = mutation(
  "updateOrderSummaryDisplay",
  (state) => {
    state.orderSummary = !state.orderSummary;
  }
);

const updateCheckoutStep = mutation<number>(
  "updateCheckoutStep",
  (state, payload) => {
    state.checkoutStep = payload;
  }
);

export const useDisplay = () => ({
  ...state,
  updateCartViewDisplay,
  updateOrderSummaryDisplay,
  updateCheckoutStep,
});
