import { Inject, Injectable, Scope } from "@nestjs/common";
import { CreateUpdateCartDto } from "./dto/cruCart.dto";
import { Cart } from "src/database/models/cart.model";
import { ProductService } from "../product/product.service";
import { CART_MODEL } from "src/database/database.constants";
import { Model } from "mongoose";

@Injectable({ scope: Scope.REQUEST })
export class CartService {
    constructor(
        @Inject(CART_MODEL) private cartModel: Model<Cart>,
        private readonly productService: ProductService
    ) { }

    async createUserCart({ user_id, product }: CreateUpdateCartDto): Promise<Cart> {
        const { product_id } = product
        const foundProduct = await this.productService.getProductById(product_id)
        if (!foundProduct) throw new Error('Product not exists')

        const query = { cart_user_id: user_id, cart_state: 'active' }
        const updateOrInsert = {
            $addToSet: {
                cart_products: {
                    ...product,
                    price: foundProduct.product_price,
                    name: foundProduct.product_name
                }
            }
        }, options = { upsert: true, new: true }

        return await this.cartModel.findOneAndUpdate(query, updateOrInsert, options)
    }

    async updateUserCartQuantity({ user_id, product }: CreateUpdateCartDto): Promise<Cart> {
        const { product_id, quantity } = product
        const query = {
            cart_user_id: user_id,
            'cart_products.product_id': product_id,
            cart_state: 'active'
        }, updateSet = {
            // $ ở chỗ quantity là đại diện cho update phần tử đó
            $inc: {
                'cart_products.$.quantity': quantity
            }
        }, options = { upsert: true, new: true }

        return await this.cartModel.findOneAndUpdate(query, updateSet, options)
    }

    async addToCart({ user_id, product }: CreateUpdateCartDto): Promise<Cart> {
        const userCart = await this.cartModel.findOne({ cart_user_id: user_id })
        if (!userCart) {
            return await this.createUserCart({ user_id, product })
        }

        if (!userCart.cart_products.length) {
            userCart.cart_products = [product]
            return userCart.save()
        }

        return await this.updateUserCartQuantity({ user_id, product })
    }

    async addToCartV2({ user_id, shop_order_ids = {} }) {
        const { product_id, quantity, old_quantity } = shop_order_ids[0]?.item_products[0]
        // check product
        const foundProduct = await this.productService.getProductById(product_id)
        if (!foundProduct) throw new Error('Product not exists')
        // compare
        if (foundProduct.product_shop.toString() !== shop_order_ids[0]?.shop_id) throw new Error('Product do not belong to the shop')

        if (quantity === 0) {
            // deleted
        }

        return await this.updateUserCartQuantity({
            user_id,
            product: {
                product_id,
                quantity: quantity - old_quantity
            }
        })
    }

    async deleteUserCart({ user_id, product_id }) {
        const query = { cart_user_id: user_id, cart_state: 'active' },
            updateSet = {
                $pull: {
                    cart_products: {
                        product_id
                    }
                }
            }

        const deleteCart = await this.cartModel.updateOne(query, updateSet)
        return deleteCart
    }

    async getListUserCart({ user_id }) {
        return await this.cartModel.findOne({
            cart_user_id: user_id
        }).lean()
    }
}