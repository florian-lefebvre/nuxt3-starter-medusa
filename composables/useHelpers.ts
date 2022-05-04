import { Product } from "@medusajs/medusa";

export default function () {
    const quantity = (item): number => {
        return item.quantity;
    };

    const sum = (prev: number, next: number): number => {
        return prev + next;
    };

    const formatPrice = (price: number, currency: string): string => {
        return `${(price / 100).toFixed(2)} ${currency.toUpperCase()}`;
    };

    const getSlug = (path): string => {
        const tmp = path.split("/");
        return tmp[tmp.length - 1];
    };

    const resetOptions = (product) => {
        const variantId = product.variants.slice(0).reverse()[0].id;
        const size = product.variants.slice(0).reverse()[0].title;
        return {
            variantId: variantId,
            quantity: 1,
            size: size,
        };
    };

    const isEmpty = (obj): boolean =>
        [Object, Array].includes((obj || {}).constructor) &&
        !Object.entries(obj || {}).length;

    const productPrices = (product: object, currencyCode: string) => {
        let prices: number[] = [];
        for (const variant of (product as Product).variants) {
            prices.push(
                variant.prices.find(
                    (price) => price.currency_code === currencyCode
                ).amount
            );
        }
        prices = [...new Set(prices)];
        const max = Math.max(...prices);
        const min = Math.min(...prices);
        return { max, min };
    };

    const priceToFloat = (price: number): number => {
        const str = price.toString();
        const length = str.length;
        const float = parseFloat(
            str.substring(0, length - 2) + "." + str.substring(length - 2)
        );
        return float;
    };

    return {
        quantity,
        sum,
        formatPrice,
        getSlug,
        resetOptions,
        isEmpty,
        productPrices,
        priceToFloat,
    };
}
