import { defineStore } from "pinia";
import { Cart, Product, Order, Region } from "@medusajs/medusa";
import { useStoreStorage } from "~/composables/useStoreStorage";
import { Ref, ComputedRef } from "vue";

const KEY = "store";

type StateAsRef<T> = {
    [P in keyof T]: Ref<T[P]>;
};

type StateAsComputed<T> = {
    [P in keyof T]: ComputedRef<T[P]>;
};

type Args<T, U> = {
    state: T;
    getters?: U extends { [key: string]: (state: StateAsRef<T>) => any }
        ? U
        : {};
    // getters?: {
    //     [key: string]: (state: StateAsRef<T>) => any;
    // };
    actions?: {
        [key: string]: (state: StateAsRef<T>) => Promise<any> | any;
    };
};

const createStore = <T, U>(
    key: string,
    args: Args<T, U>
): (() => {
    state: StateAsComputed<T>;
    getters?: {
        [key: string]: ComputedRef<any>;
    };
}) => {
    const state = args.state;
    const stateAsRef: StateAsRef<T> = Object.fromEntries(
        Object.entries(state).map(
            ([key, value]) => [key, ref(value)] as [keyof T, Ref<T[keyof T]>]
        )
    ) as any;
    const stateAsComputedRef: StateAsComputed<T> = Object.fromEntries(
        Object.entries(state).map(
            ([key, value]) =>
                [key, computed(value)] as [keyof T, ComputedRef<T[keyof T]>]
        )
    ) as any;

    const getters = Object.fromEntries(
        Object.entries(args.getters).map(([key, value]) => [
            key,
            computed(() => value(stateAsRef)),
        ])
    );

    return () => ({ state: stateAsComputedRef, getters });
};

const x = createStore("x", {
    state: {
        cartView: false,
    },
    getters: {
        isTrue: (state) => state.cartView.value,
    },
});
const {
    state: { cartView },
    getters: { isTrue },
} = x();

export const useStore = defineStore(KEY, () => {
    const { $medusa } = useNuxtApp();

    const cart = ref<Partial<Cart>>();
    const countryName = ref<string>("France");
    const regions = ref<Region[]>([]);

    const storage = useStoreStorage({
        key: KEY,
        state: computed(() => ({ cart, countryName, regions })),
        exclude: ["regions"],
    });

    const region = computed(() => cart.value.region);
    const currencyCode = computed(() => region.value.currency_code);

    const createCart = async () => {
        const data = await $medusa.carts.create({});
        cart.value = data.cart;
    };

    const retrieveCart = async () => {
        if (cart.value === undefined) {
            return await createCart();
        }

        const data = await $medusa.carts.retrieve(cart.value.id);
        cart.value = data.cart;
    };

    const getRegions = async () => {
        const { regions: data } = await $medusa.regions.list();
        regions.value = data;
    };

    const updateCart = async () => {
        const data = await $medusa.carts.update(cart.value.id, cart.value);
        cart.value = data.cart;
    };

    const setRegion = async ({
        region: r,
        countryName: c,
    }: {
        region: Region;
        countryName: string;
    }) => {
        cart.value.region = r;
        countryName.value = c;
    };

    const initialize = async () => {
        storage.init();
        await retrieveCart();
        await getRegions();
        // watch([cart], async () => {
        // await updateCart();
        // });
    };

    return {
        state: {
            cart: computed(() => cart),
            countryName: computed(() => countryName),
            regions: computed(() => regions),
            region: computed(() => region),
            currencyCode: computed(() => currencyCode),
        },
        actions: {
            createCart,
            retrieveCart,
            getRegions,
            setRegion,
            initialize,
        },
        // order,
        // products,
        // adding,
        // addVariantToCart,
        // removeLineItem,
        // updateLineItem,
        // getShippingOptions,
        // setShippingMethod,
        // updateAddress,
        // createPaymentSession,
        // completeCart,
        // retrieveOrder,
        // setPaymentSession,
    };
});

// const order = ref<Partial<Order>>({});
// const products = ref<Product[]>([]);

// watch([adding, cart, order], async () => {
//   if (initialized.value) {
//     await retrieveCart();
//   }

//   const data = await client.products.list();
//   products.value = data.products;
// });

// const addVariantToCart = async ({
//   variantId,
//   quantity,
// }: {
//   variantId: string;
//   quantity: number;
// }) => {
//   const data = await client.carts.lineItems.create(cart.value.id, {
//     variant_id: variantId,
//     quantity,
//   });
//   cart.value = data.cart;
// };

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
