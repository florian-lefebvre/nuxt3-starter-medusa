import { defineStore } from "pinia";
import client from "~/composables/useClient";
import { Cart, Product, Order } from "@medusajs/medusa";

export const useStore = defineStore("store", () => {
  const adding = ref(false);
  const cart = ref<Partial<Cart>>({ items: [] });
  const order = ref<Partial<Order>>({});
  const products = ref<Product[]>([]);
  const currencyCode = ref("eur");

  const _setCart = (payload: Partial<Cart>) => {
    cart.value = payload;
    currencyCode.value = payload.region.currency_code;
  };
  const _setOrder = (payload: Partial<Order>) => {
    order.value = payload;
  };
  const _setProducts = (payload: Product[]) => {
    products.value = payload;
  };

  watchEffect(() => {
    let cartId;
    if (localStorage) {
      cartId = localStorage.getItem("cart_id");
    }

    if (cartId) {
      client.carts.retrieve(cartId).then((data) => _setCart(data.cart));
    } else {
      client.carts.create().then((data) => {
        _setCart(data.cart);
        if (localStorage) {
          localStorage.setItem("cart_id", data.cart.id);
        }
      });
    }

    client.products.list().then((data) => _setProducts(data.products));
  });

  const addVariantToCart = async ({
    variantId,
    quantity,
  }: {
    variantId: string;
    quantity: number;
  }) => {
    client.carts.lineItems
      .create(cart.value.id, {
        variant_id: variantId,
        quantity,
      })
      .then((data) => _setCart(data.cart));
  };
  const createCart = async () => {
    if (localStorage) {
      localStorage.removeItem("cart_id");
    }
    client.carts.create().then((data) => _setCart(data.cart));
  };
  const removeLineItem = async (lineId: string) => {
    client.carts.lineItems
      .delete(cart.value.id, lineId)
      .then((data) => _setCart(data.cart));
  };
  const updateLineItem = async ({
    lineId,
    quantity,
  }: {
    lineId: string;
    quantity: number;
  }) => {
    client.carts.lineItems
      .update(cart.value.id, lineId, { quantity })
      .then((data) => _setCart(data.cart));
  };
  const getShippingOptions = async () => {
    const data = await client.shippingOptions
      .listCartOptions(cart.value.id)
      .then((res) => res.shipping_options);

    if (data) {
      return data;
    } else {
      return undefined;
    }
  };
  const setShippingMethod = async (id: string) => {
    return await client.carts
      .addShippingMethod(cart.value.id, {
        option_id: id,
      })
      .then((data) => _setCart(data.cart));
  };
  const updateAddress = async (address: string, email: string) => {
    client.carts
      .update(cart.value.id, {
        shipping_address: address,
        billing_address: address,
        email,
      })
      .then((data) => _setCart(data.cart));
  };
  const createPaymentSession = async () => {
    return await client.carts
      .createPaymentSessions(cart.value.id)
      .then((data) => {
        _setCart(data.cart);
        return data;
      });
  };
  const completeCart = async () => {
    const data = await client.carts
      .complete(cart.value.id)
      .then((data) => data);

    if (data) {
      return data.data;
    } else {
      return undefined;
    }
  };
  const retrieveOrder = async (orderId: string) => {
    const data = await client.orders.retrieve(orderId).then((data) => data);

    if (data) {
      return data.order;
    } else {
      return undefined;
    }
  };
  const setPaymentSession = async (provider: string) => {
    return await client.carts
      .setPaymentSession(cart.value.id, {
        provider_id: provider,
      })
      .then((data) => {
        _setCart(data.cart);
        return data;
      });
  };

  return {
    adding,
    cart,
    order,
    products,
    currencyCode,
    addVariantToCart,
    createCart,
    removeLineItem,
    updateLineItem,
    getShippingOptions,
    setShippingMethod,
    updateAddress,
    createPaymentSession,
    completeCart,
    retrieveOrder,
    setPaymentSession,
  };
});
