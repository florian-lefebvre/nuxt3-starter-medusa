import actionExtension from "@harlem/extension-action";
import { Cart, Product, Order, Region } from "@medusajs/medusa";
import { $medusa } from "~/utils/medusa";

type State = {
  cart: Partial<Cart>;
  regions: Region[];
  countryName: string;
};

const STATE: State = {
  cart: undefined,
  regions: [],
  countryName: "France",
};

const { state, getter, mutation, action, ...store } = createStore(
  "store",
  STATE,
  {
    extensions: [actionExtension()],
  }
);

const region = getter("region", (state) => state.cart.region);

const currencyCode = getter("currencyCode", () => region.value.currency_code);

const createCart = action("createCart", async (_, mutate) => {
  const data = await $medusa.carts.create({});
  // mutate(({ cart }) => (cart = data.cart));
});

const retrieveCart = action("retrieveCart", async (_, mutate) => {
  if (state.cart?.id === undefined) {
    return await createCart();
  }
  const data = await $medusa.carts.retrieve(state.cart.id);
  // mutate(({ cart }) => (cart = data.cart));
});

const updateCart = action("updateCart", async (_, mutate) => {
  // TODO: add all needed fields
  const data = await $medusa.carts.update(state.cart.id, {
    region_id: state.cart.region_id,
  });
  // mutate(({ cart }) => (cart = data.cart));
});

const setRegions = mutation<Region[]>("setRegions", (state, payload) => {
  state.regions = payload;
});

const getRegions = action("getRegions", async (payload, mutate, controller) => {
  const { regions: data } = await $medusa.regions.list();
  // mutate((state) => Object.assign(state.regions, data));
});

const setRegion = mutation<{
  region: Region;
  countryName: string;
}>("setRegion", (state, { region, countryName }) => {
  state.cart.region = region;
  state.countryName = countryName;
});

const init = action("init", async () => {
  // await retrieveCart();
  // await getRegions();
  // watch([state.cart], async () => {
  //   await updateCart();
  // });
});

// const addVariantToCart = action<{ variantId: string; quantity: number }>(
//   "addVariantToCart",
//   async ({ variantId, quantity }, mutate) => {
//     const data = await $medusa.carts.lineItems.create(state.cart.id, {
//       variant_id: variantId,
//       quantity,
//     });
//     mutate(({ cart }) => (cart = data.cart));
//   }
// );

export const useStore = () => ({
  ...state,
  region,
  currencyCode,
  createCart,
  retrieveCart,
  updateCart,
  getRegions,
  setRegion,
  init,
  // addVariantToCart,
  // adding,
  // order,
  // products,
  // removeLineItem,
  // updateLineItem,
  // getShippingOptions,
  // setShippingMethod,
  // updateAddress,
  // createPaymentSession,
  // completeCart,
  // retrieveOrder,
  // setPaymentSession,
});

// const removeLineItem = async (lineId: string) => {
//   const data = await client.carts.lineItems.delete(cart.value.id, lineId);
//   cart.value = data.cart;
// };

// const updateLineItem = async ({
//   lineId,
//   quantity,
// }: {
//   lineId: string;
//   quantity: number;
// }) => {
//   const data = await client.carts.lineItems.update(cart.value.id, lineId, {
//     quantity,
//   });
//   cart.value = data.cart;
// };

// const getShippingOptions = async () => {
//   const { shipping_options: data } =
//     await client.shippingOptions.listCartOptions(cart.value.id);

//   if (data) {
//     return data;
//   } else {
//     return undefined;
//   }
// };

// const setShippingMethod = async (id: string) => {
//   const data = await client.carts.addShippingMethod(cart.value.id, {
//     option_id: id,
//   });
//   cart.value = data.cart;
// };

// const updateAddress = async (address: string, email: string) => {
//   const data = await client.carts.update(cart.value.id, {
//     shipping_address: address,
//     billing_address: address,
//     email,
//   });
//   cart.value = data.cart;
// };

// const createPaymentSession = async () => {
//   const data = await client.carts.createPaymentSessions(cart.value.id);
//   cart.value = data.cart;
//   return data;
// };

// const completeCart = async () => {
//   const data = await client.carts.complete(cart.value.id);

//   if (data) {
//     return data.data;
//   } else {
//     return undefined;
//   }
// };

// const retrieveOrder = async (orderId: string) => {
//   const data = await client.orders.retrieve(orderId);

//   if (data) {
//     return data.order;
//   } else {
//     return undefined;
//   }
// };

// const setPaymentSession = async (provider: string) => {
//   const data = await client.carts.setPaymentSession(cart.value.id, {
//     provider_id: provider,
//   });
//   cart.value = data.cart;
//   return data;
// };
