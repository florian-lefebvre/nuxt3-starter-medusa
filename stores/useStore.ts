import actionExtension from "@harlem/extension-action";
import { Cart, Product, Order, Region } from "@medusajs/medusa";

const { $medusa } = useNuxtApp();

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
    extensions: [actionExtension({})],
  }
);

const region = getter("region", (state) => state.cart.region);

const currencyCode = getter("currencyCode", () => region.value.currency_code);

// TODO: create module to auto import stores

export const useStore = () => ({
  ...state,
  region,
  currencyCode,
});

// export const useStore = defineStore("store", () => {
//   const { $medusa: client } = useNuxtApp();

//   const cookies = ref({
//     cartId: useCookie("cart_id"),
//     region: useCookie<Region>("region"),
//     countryName: useCookie("country_name"),
//   });

//   const cart = ref<Partial<Cart>>();
//   const region = computed(() => cart.value.region);
//   const currencyCode = computed(() => region.value.currency_code);
//   const countryName = computed(() => cookies.value.countryName);
//   const regions = ref<Region[]>([]);
//   // const order = ref<Partial<Order>>({});
//   // const products = ref<Product[]>([]);

//   // watch([adding, cart, order], async () => {
//   //   if (initialized.value) {
//   //     await retrieveCart();
//   //   }

//   //   const data = await client.products.list();
//   //   products.value = data.products;
//   // });

//   // const addVariantToCart = async ({
//   //   variantId,
//   //   quantity,
//   // }: {
//   //   variantId: string;
//   //   quantity: number;
//   // }) => {
//   //   const data = await client.carts.lineItems.create(cart.value.id, {
//   //     variant_id: variantId,
//   //     quantity,
//   //   });
//   //   cart.value = data.cart;
//   // };

//   const createCart = async () => {
//     const data = await client.carts.create({});
//     cart.value = data.cart;
//     cookies.value.cartId = cart.value.id;
//     cookies.value.region = cart.value.region;
//     cookies.value.countryName = "France";
//   };

//   const retrieveCart = async () => {
//     if (cookies.value.cartId === undefined) {
//       return await createCart();
//     }

//     const data = await client.carts.retrieve(cookies.value.cartId);
//     cart.value = data.cart;
//   };

//   // const removeLineItem = async (lineId: string) => {
//   //   const data = await client.carts.lineItems.delete(cart.value.id, lineId);
//   //   cart.value = data.cart;
//   // };

//   // const updateLineItem = async ({
//   //   lineId,
//   //   quantity,
//   // }: {
//   //   lineId: string;
//   //   quantity: number;
//   // }) => {
//   //   const data = await client.carts.lineItems.update(cart.value.id, lineId, {
//   //     quantity,
//   //   });
//   //   cart.value = data.cart;
//   // };

//   // const getShippingOptions = async () => {
//   //   const { shipping_options: data } =
//   //     await client.shippingOptions.listCartOptions(cart.value.id);

//   //   if (data) {
//   //     return data;
//   //   } else {
//   //     return undefined;
//   //   }
//   // };

//   // const setShippingMethod = async (id: string) => {
//   //   const data = await client.carts.addShippingMethod(cart.value.id, {
//   //     option_id: id,
//   //   });
//   //   cart.value = data.cart;
//   // };

//   // const updateAddress = async (address: string, email: string) => {
//   //   const data = await client.carts.update(cart.value.id, {
//   //     shipping_address: address,
//   //     billing_address: address,
//   //     email,
//   //   });
//   //   cart.value = data.cart;
//   // };

//   // const createPaymentSession = async () => {
//   //   const data = await client.carts.createPaymentSessions(cart.value.id);
//   //   cart.value = data.cart;
//   //   return data;
//   // };

//   // const completeCart = async () => {
//   //   const data = await client.carts.complete(cart.value.id);

//   //   if (data) {
//   //     return data.data;
//   //   } else {
//   //     return undefined;
//   //   }
//   // };

//   // const retrieveOrder = async (orderId: string) => {
//   //   const data = await client.orders.retrieve(orderId);

//   //   if (data) {
//   //     return data.order;
//   //   } else {
//   //     return undefined;
//   //   }
//   // };

//   // const setPaymentSession = async (provider: string) => {
//   //   const data = await client.carts.setPaymentSession(cart.value.id, {
//   //     provider_id: provider,
//   //   });
//   //   cart.value = data.cart;
//   //   return data;
//   // };

//   const getRegions = async () => {
//     const { regions: data } = await client.regions.list();
//     regions.value = data;
//   };

//   const updateCart = async () => {
//     const data = await client.carts.update(cart.value.id, cart.value);
//     cart.value = data.cart;
//   };

//   const setRegion = async ({
//     region,
//     countryName,
//   }: {
//     region: Region;
//     countryName: string;
//   }) => {
//     cart.value.region = region;
//     cookies.value.region = region;
//     cookies.value.countryName = countryName;
//   };

//   const initialize = async () => {
//     await retrieveCart();
//     await getRegions();
//     watch([cart], async () => {
//       await updateCart();
//     });
//   };

//   return {
//     // adding,
//     cart,
//     // order,
//     // products,
//     currencyCode,
//     regions,
//     region,
//     countryName,
//     // addVariantToCart,
//     createCart,
//     retrieveCart,
//     // removeLineItem,
//     // updateLineItem,
//     // getShippingOptions,
//     // setShippingMethod,
//     // updateAddress,
//     // createPaymentSession,
//     // completeCart,
//     // retrieveOrder,
//     // setPaymentSession,
//     getRegions,
//     setRegion,
//     initialize,
//   };
// });
