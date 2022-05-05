import { UseStoreRefs } from "~~/types/stores";
import { Product, ProductVariant } from "@medusajs/medusa";

export default function () {
    const store = useStore();
    const { taxRate, currencyCode }: UseStoreRefs = storeToRefs(store) as any;

    const formatMoneyAmount = (
        amount: number,
        digits: number,
        taxRate: number = 0
    ) => {
        const locale = "en-US";

        return new Intl.NumberFormat(locale, {
            style: "currency",
            currency: currencyCode.value,
            minimumFractionDigits: digits,
        }).format(amount * (1 + taxRate / 100));
    };

    const getVariantPrice = (variant: ProductVariant): number => {
        const moneyAmount = variant.prices.find(
            (p) =>
                p.currency_code.toLowerCase() ===
                currencyCode.value.toLowerCase()
        );

        if (moneyAmount && moneyAmount.amount) {
            return (moneyAmount.amount * (1 + taxRate.value)) / 100;
        }

        return undefined;
    };

    const formatPrice = (
        variant: ProductVariant,
        digits: number = 2
    ): string => {
        if (variant.prices.length === 0) {
            return "No prices";
        }
        return formatMoneyAmount(getVariantPrice(variant), digits);
    };

    const getProductExtremeVariants = (product: Product) => {
        const variants = product.variants;
        const prices = variants.map((variant) => getVariantPrice(variant));
        const max = Math.max(...prices);
        const min = Math.min(...prices);
        const maxVariant = variants.find(
            (variant) => getVariantPrice(variant) === max
        );
        const minVariant = variants.find(
            (variant) => getVariantPrice(variant) === min
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
