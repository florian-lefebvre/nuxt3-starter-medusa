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

  return {
    quantity,
    sum,
    formatPrice,
    getSlug,
    resetOptions,
    isEmpty,
  };
}
