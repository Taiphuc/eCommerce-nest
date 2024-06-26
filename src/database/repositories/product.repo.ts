import { Inject, Injectable } from "@nestjs/common";
import { PRODUCT_MODEL } from "../database.constants";
import { Model, Types } from "mongoose";
import { Product } from "../models/product.model";
import { Utils } from "src/utils";

@Injectable()
export class ProductRepository {
    constructor(
        @Inject(PRODUCT_MODEL) private productModel: Model<Product>,
        private readonly utils: Utils,
    ) { }

    async queryProduct({ query, limit, skip }): Promise<Product[]> {
        return await this.productModel.find(query)
            .populate('product_shop', 'name email -_id')
            .sort({ updateAt: -1 })
            .skip(skip)
            .limit(limit)
            .lean<Product[]>()
            .exec()
    }

    async publishProductByShop({ product_shop, product_id }): Promise<any> {
        const foundShop = await this.productModel.findOne({
            product_shop: new Types.ObjectId(product_shop),
            _id: new Types.ObjectId(product_id)
        })
        if (!foundShop) return null

        foundShop.isDraft = false
        foundShop.isPublished = true
        const { modifiedCount } = await foundShop.updateOne(foundShop)

        return modifiedCount
    }

    async unPublishProductByShop({ product_shop, product_id }): Promise<any> {
        const foundShop = await this.productModel.findOne({
            product_shop: new Types.ObjectId(product_shop),
            _id: new Types.ObjectId(product_id)
        })
        if (!foundShop) return null

        foundShop.isDraft = true
        foundShop.isPublished = false
        const { modifiedCount } = await foundShop.updateOne(foundShop)

        return modifiedCount
    }

    async searchProductByUser({ keySearch }): Promise<Product[]> {
        const result = await this.productModel.find({
            isPublished: true,
            $text: { $search: keySearch }
        }, { score: { $meta: 'textScore' } })
            .sort({ score: { $meta: 'textScore' } })
            .lean()

        return result
    }

    async findAllProducts({ limit, sort, page, filter, select }): Promise<Product[]> {
        const skip = (page - 1) * limit
        const sortBy = sort === 'ctime' ? { _id: -1 as const } : { _id: 1 as const }
        const products = await this.productModel.find(filter)
            .sort(sortBy)
            .skip(skip)
            .limit(limit)
            .select(this.utils.getSelectData(select))
            .lean()

        return products
    }

    async findProduct({ product_id, unSelect }): Promise<Product> {
        return await this.productModel.findById(product_id).select(this.utils.unGetSelectData(unSelect))
    }

    async updateProductById({ product_id, payload, model, isNew = true }): Promise<Product> {
        return await this.productModel.findByIdAndUpdate(product_id, payload, {
            new: isNew
        })
    }

    async getProductById(product_id: string): Promise<Product> {
        return await this.productModel.findOne({ _id: this.utils.convertToObjectIdMongo(product_id) }).lean()
    }
}