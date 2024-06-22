import { } from "class-validator"

interface product_attributes {
    manufacturer: string;
    model: string;
    color: string;
}

export class CreateProductDto {

    readonly product_name: string;

    readonly product_description: string;

    readonly product_price: number;

    readonly product_quantity: number;

    readonly product_type: string;

    readonly product_thumb: string;

    readonly product_attributes: product_attributes;

    
}