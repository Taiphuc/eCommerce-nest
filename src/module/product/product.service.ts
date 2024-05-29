import { Inject, Injectable, Scope } from "@nestjs/common";
import { Model } from "mongoose";
import { PRODUCT_MODEL } from "src/database/database.constants";
import { Product } from "src/database/models/product.model";
import { CreateProductDto } from "./dto/createProduct.dto";

@Injectable({ scope: Scope.REQUEST })
export class ProductService {
    constructor(
        @Inject(PRODUCT_MODEL) private productModel: Model<Product>
    ) { }

    async createProduct({
        product_name,
        product_description,
        product_price,
        product_quantity,
        product_thumb,
        product_type,
        product_attributes
    }: CreateProductDto): Promise<Product> {
        const newProduct = await this.productModel.create({
            product_name,
            product_description,
            product_price,
            product_quantity,
            product_thumb,
            product_type,
            product_attributes
        })

        return newProduct
    }
}