import { Ref } from "vue";
import { Cart, Region } from "@medusajs/medusa";

export type UseStoreRefs = {
    cart: Ref<Partial<Cart>>;
    countryName: Ref<string>;
    regions: Ref<Region[]>;
    currencyCode: Ref<string>;
    taxRate: Ref<number>;
};

export type UseDisplayRefs = {
    cartView: Ref<boolean>;
    orderSummary: Ref<boolean>;
    checkoutStep: Ref<number>;
};
