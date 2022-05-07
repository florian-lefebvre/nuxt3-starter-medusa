import { Product } from "@medusajs/medusa";
import { Filter } from "~/types";

export const useFilters = (products: Product[]) => {
    const getFilters = (): Filter[] => {
        const _filters: Filter[] = [];

        for (const product of products) {
            for (const { title, values } of product.options) {
                if (!_filters.some((filter) => filter.name === title)) {
                    _filters.push({
                        name: title,
                        options: [],
                    });
                }
                const filter = _filters.find((filter) => filter.name === title);
                for (const value of values) {
                    if (
                        !filter.options.some(
                            (option) => option.value === value.value
                        )
                    ) {
                        filter.options.push({
                            value: value.value,
                            checked: false,
                        });
                    }
                }
            }
        }

        return _filters;
    };

    const filters = ref<Filter[]>(getFilters());

    const activeFilters = computed<Filter[]>(() => {
        const _filters: Filter[] = [];
        for (const filter of filters.value) {
            const options = filter.options.filter((option) => option.checked);
            if (options.length > 0) {
                _filters.push({
                    name: filter.name,
                    options,
                });
            }
        }
        return _filters;
    });

    const filteredProducts = computed<Product[]>(() => {
        if (activeFilters.value.length === 0) {
            return products;
        }
        return products.filter((product) =>
            activeFilters.value.every((filter) =>
                product.options.some(
                    (option) =>
                        option.title === filter.name &&
                        filter.options.some((f) =>
                            option.values.map((v) => v.value).includes(f.value)
                        )
                )
            )
        );
    });

    const resetFilters = () => {
        for (const filter of filters.value) {
            for (const option of filter.options) {
                option.checked = false;
            }
        }
    };

    return {
        getFilters,
        filters,
        activeFilters,
        filteredProducts,
        resetFilters,
    };
};
