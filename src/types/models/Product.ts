export interface IProductOption {
    name?: string;
    values: Array<string>;
}

export interface IProductVariant {
    name: string;
    sku?: string;
    price?: number;
    active?: boolean;
    quantity?: number;
    image_id?: string;

    option1?: string;
    option2?: string;
}
