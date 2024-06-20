import { Inject, Injectable, Scope } from "@nestjs/common";
import { Model, Types } from "mongoose";
import { PRODUCT_MODEL } from "src/database/database.constants";
import { Product } from "src/database/models/product.model";
import { CreateProductDto } from "./dto/createProduct.dto";
import { Utils } from "src/utils";
import { ProductRepository } from "src/database/repositories/product.repo";

@Injectable({ scope: Scope.REQUEST })
export class ProductService {
    constructor(
        @Inject(PRODUCT_MODEL) private productModel: Model<Product>,
        private readonly utils: Utils,
        private readonly productRepository: ProductRepository
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

    async publishProductByShop({ product_shop, product_id }): Promise<any> {
        return await this.productRepository.publishProductByShop({ product_shop, product_id })
    }

    async unPublishProductByShop({ product_shop, product_id }): Promise<any> {
        return await this.productRepository.unPublishProductByShop({ product_shop, product_id })
    }

    async findAllDraftsForShop({ product_shop, limit = 50, skip = 0 }): Promise<Product[]> {
        const query = { product_shop, isDraft: true }
        return await this.productRepository.queryProduct({ query, limit, skip })
    }

    async findAllPulishForShop({ product_shop, limit = 50, skip = 0 }): Promise<Product[]> {
        const query = { product_shop, isPublished: true }
        return await this.productRepository.queryProduct({ query, limit, skip })
    }

    async searchProducts({ keySearch }): Promise<Product[]> {
        return await this.productRepository.searchProductByUser({ keySearch })
    }

    async findAllProducts({ limit = 50, sort = 'ctime', page = 1, filter = { isPublished: true } }): Promise<Product[]> {
        return await this.productRepository.findAllProducts({ limit, sort, page, filter, select: ['product_name', 'product_price', 'product_thumb', 'product_shop'] })
    }

    async findProduct({ product_id }): Promise<Product> {
        return await this.productRepository.findProduct({ product_id, unSelect: ['__v'] })
    }
}