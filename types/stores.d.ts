import { Ref } from "vue";
import { Cart, Region } from "@medusajs/medusa";

export type useStoreRefs = {
    cart: Ref<Cart>;
    countryName: Ref<string>;
    regions: Ref<Region[]>;
    currencyCode: Ref<string>;
};

export type useDisplayRefs = {
    cartView: Ref<boolean>;
    orderSummary: Ref<boolean>;
    checkoutStep: Ref<number>;
};
