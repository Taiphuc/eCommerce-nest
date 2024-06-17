import { Connection, Document, Model, Schema, SchemaTypes } from 'mongoose'

interface CartProduct {
    product_id: string,
    shop_id?: string,
    quantity: number
}

interface Cart extends Document {
    cart_state: string;
    cart_products: Array<CartProduct>;
    cart_count_product: number;
    cart_user_id: number;
}

type CartModel = Model<Cart>

const CartProductSchema = new Schema({
    product_id: { type: Schema.Types.String, required: true },
    shop_id: { type: Schema.Types.String, required: true },
    quantity: { type: Schema.Types.Number, required: true }
});

const CartSchema = new Schema<Cart>(
    {
        cart_state: { type: SchemaTypes.String, enum: ['active', 'completed', 'failed', 'pending'], default: 'active', required: true },
        cart_products: { type: [CartProductSchema], required: true, default: [] },
        cart_count_product: { type: SchemaTypes.Number, default: 0 },
        cart_user_id: { type: SchemaTypes.Number, required: true }
    },
    {
        timestamps: {
            // cách thay đổi các biến createdAt, ....
            createdAt: 'createdOn',
            updatedAt: 'modifiedOn'
        }
    },
)

const createCartModel: (conn: Connection) => CartModel = (conn: Connection) => conn.model<Cart>('Cart', CartSchema, 'Carts')

export { Cart, CartModel, CartProduct, createCartModel }