import { LineItem, Product } from "@medusajs/medusa";

export default function () {
    const quantity = (item: LineItem): number => item.quantity;

    const sum = (prev: number, next: number): number => prev + next;

    const formatPrice = (price: number, currency: string): string =>
        `${(price / 100).toFixed(2)} ${currency.toUpperCase()}`;

    const getSlug = (path: string): string => {
        const temp = path.split("/");
        return temp[temp.length - 1];
    };

    const resetOptions = (product: Product) => {
        const variantId = product.variants.slice(0).reverse()[0].id;
        const size = product.variants.slice(0).reverse()[0].title;
        return {
            variantId,
            quantity: 1,
            size,
        };
    };

    const isEmpty = (obj): boolean =>
        [Object, Array].includes((obj || {}).constructor) &&
        !Object.entries(obj || {}).length;

    return {
        quantity,
        sum,
        formatPrice,
        getSlug,
        resetOptions,
        isEmpty,
    };
}
