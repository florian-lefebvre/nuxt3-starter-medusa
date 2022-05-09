import { UseStoreRefs } from "~/types/stores";
import { Product, ProductVariant } from "@medusajs/medusa";
import defaults from "~/utils/defaults";

export const usePrices = () => {
    const store = useStore();
    const { taxRate, currencyCode, region, countryName }: UseStoreRefs =
        storeToRefs(store) as any;

    const formatMoneyAmount = (amount: number, digits: number) => {
        const iso = (() => {
            const country = region.value.countries.find(
                (country) => country.display_name === countryName.value
            );
            if (!country) {
                return defaults.iso;
            }
            return country.iso_2;
        })();

        return new Intl.NumberFormat(iso, {
            style: "currency",
            currency: currencyCode.value,
            minimumFractionDigits: digits,
        }).format(amount);
    };

    const applyTax = (amount: number) => (amount * (1 + taxRate.value)) / 100;

    const getVariantPrice = (variant: ProductVariant) => {
        return variant.prices.find(
            (p) =>
                p.currency_code.toLowerCase() ===
                currencyCode.value.toLowerCase()
        );
    };

    const formatPrice = (variant: ProductVariant, digits: number = 2) =>
        variant.prices.length === 0
            ? "No price"
            : formatMoneyAmount(
                  applyTax(getVariantPrice(variant).amount),
                  digits
              );

    const getProductExtremeVariants = (product: Product) => {
        const variants = product.variants;
        const prices = variants.map((variant) => getVariantPrice(variant));
        const max = Math.max(...prices.map((p) => applyTax(p.amount)));
        const min = Math.min(...prices.map((p) => applyTax(p.amount)));
        const maxVariant = variants.find(
            (variant) => applyTax(getVariantPrice(variant).amount) === max
        );
        const minVariant = variants.find(
            (variant) => applyTax(getVariantPrice(variant).amount) === min
        );
        return { max, min, maxVariant, minVariant };
    };

    return {
        formatMoneyAmount,
        getVariantPrice,
        formatPrice,
        getProductExtremeVariants,
        applyTax,
    };
};
