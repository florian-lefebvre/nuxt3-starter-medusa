export type Filter = {
    name: string;
    options: {
        value: string;
        checked: boolean;
    }[];
};

export type ProductsDisplay = "grid" | "list";
