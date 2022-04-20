import { defineStore } from "pinia";
import { Cart, Product, Order, Region } from "@medusajs/medusa";

export const useStore = defineStore("store", () => {
  const { $medusa: client } = useNuxtApp();
  const adding = ref(false);
  const cart = ref<Partial<Cart>>();
  const currencyCode = computed(
    () => cart.value?.region.currency_code ?? "eur"
  );
  const order = ref<Partial<Order>>({});
  const products = ref<Product[]>([]);
  const regions = ref<Region[]>([]);

  watch([adding, cart, order, products], async () => {
    await retrieveCart();

    const data = await client.products.list();
    products.value = data.products;
  });

  const addVariantToCart = async ({
    variantId,
    quantity,
  }: {
    variantId: string;
    quantity: number;
  }) => {
    const data = await client.carts.lineItems.create(cart.value.id, {
      variant_id: variantId,
      quantity,
    });
    cart.value = data.cart;
  };

  const createCart = async () => {
    const cartId = useCookie("cart_id");

    const data = await client.carts.create();
    cart.value = data.cart;
    cartId.value = cart.value.id;
  };

  const retrieveCart = async () => {
    const cartId = useCookie("cart_id");

    if (cartId.value !== "") {
      return await createCart();
    }

    const data = await client.carts.retrieve(cartId.value);
    cart.value = data.cart;
  };

  const removeLineItem = async (lineId: string) => {
    const data = await client.carts.lineItems.delete(cart.value.id, lineId);
    cart.value = data.cart;
  };

  const updateLineItem = async ({
    lineId,
    quantity,
  }: {
    lineId: string;
    quantity: number;
  }) => {
    const data = await client.carts.lineItems.update(cart.value.id, lineId, {
      quantity,
    });
    cart.value = data.cart;
  };

  const getShippingOptions = async () => {
    const { shipping_options: data } =
      await client.shippingOptions.listCartOptions(cart.value.id);

    if (data) {
      return data;
    } else {
      return undefined;
    }
  };

  const setShippingMethod = async (id: string) => {
    const data = await client.carts.addShippingMethod(cart.value.id, {
      option_id: id,
    });
    cart.value = data.cart;
  };

  const updateAddress = async (address: string, email: string) => {
    const data = await client.carts.update(cart.value.id, {
      shipping_address: address,
      billing_address: address,
      email,
    });
    cart.value = data.cart;
  };

  const createPaymentSession = async () => {
    const data = await client.carts.createPaymentSessions(cart.value.id);
    cart.value = data.cart;
    return data;
  };

  const completeCart = async () => {
    const data = await client.carts.complete(cart.value.id);

    if (data) {
      return data.data;
    } else {
      return undefined;
    }
  };

  const retrieveOrder = async (orderId: string) => {
    const data = await client.orders.retrieve(orderId);

    if (data) {
      return data.order;
    } else {
      return undefined;
    }
  };

  const setPaymentSession = async (provider: string) => {
    const data = await client.carts.setPaymentSession(cart.value.id, {
      provider_id: provider,
    });
    cart.value = data.cart;
    return data;
  };

  const getRegions = async () => {
    const { regions: data } = await client.regions.list();
    regions.value = data;
  };

  const initialize = async () => {
    await getRegions();
  };

  return {
    adding,
    cart,
    order,
    products,
    currencyCode,
    regions,
    addVariantToCart,
    createCart,
    retrieveCart,
    removeLineItem,
    updateLineItem,
    getShippingOptions,
    setShippingMethod,
    updateAddress,
    createPaymentSession,
    completeCart,
    retrieveOrder,
    setPaymentSession,
    getRegions,
    initialize,
  };
});
