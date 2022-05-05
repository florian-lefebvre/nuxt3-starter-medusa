import { UseStoreRefs } from "~/types/stores";
import { Product, ProductVariant } from "@medusajs/medusa";

export default function () {
    const store = useStore();
    const { taxRate, currencyCode, region, countryName }: UseStoreRefs =
        storeToRefs(store) as any;

    const formatMoneyAmount = (
        amount: number,
        digits: number,
        taxRate: number = 0
    ) => {
        const iso = computed(
            () =>
                region.value.countries.find(
                    (country) => country.display_name === countryName.value
                ).iso_2
        );

        return computed(() =>
            new Intl.NumberFormat(iso.value, {
                style: "currency",
                currency: currencyCode.value,
                minimumFractionDigits: digits,
            }).format(amount * (1 + taxRate / 100))
        );
    };

    const getVariantPrice = (variant: ProductVariant) => {
        const moneyAmount = variant.prices.find(
            (p) =>
                p.currency_code.toLowerCase() ===
                currencyCode.value.toLowerCase()
        );

        return computed(() => (moneyAmount.amount * (1 + taxRate.value)) / 100);
    };

    const formatPrice = (variant: ProductVariant, digits: number = 2) => {
        if (variant.prices.length === 0) {
            return ref("No prices");
        }
        return formatMoneyAmount(getVariantPrice(variant).value, digits);
    };

    const getProductExtremeVariants = (product: Product) => {
        const variants = product.variants;
        const prices = variants.map((variant) => getVariantPrice(variant));
        const max = Math.max(...prices.map((p) => p.value));
        const min = Math.min(...prices.map((p) => p.value));
        const maxVariant = variants.find(
            (variant) => getVariantPrice(variant).value === max
        );
        const minVariant = variants.find(
            (variant) => getVariantPrice(variant).value === min
        );
        return { max, min, maxVariant, minVariant };
    };

    return {
        formatMoneyAmount,
        getVariantPrice,
        formatPrice,
        getProductExtremeVariants,
    };
}
