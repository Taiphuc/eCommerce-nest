import { Connection, Document, Model, Schema, SchemaTypes } from 'mongoose'
import { RoleShop } from 'src/enum/enum';

interface Product extends Document {
    product_name: string;
    product_thumb: string;
    product_description: string;
    product_slug: string;
    product_price: number;
    product_quantity: number;
    product_type: string;
    product_shop: Schema.Types.ObjectId;
    product_attributes: Schema.Types.Mixed;
    product_ratingsAverage: number;
    product_variations: Array<Schema.Types.ObjectId>;
    isDraft: boolean;
    isPublished: boolean;
}

type ProductModel = Model<Product>

const ProductSchema = new Schema<Product>(
    {
        product_name: { type: SchemaTypes.String, required: true },
        product_thumb: { type: SchemaTypes.String, required: true },
        product_description: { type: SchemaTypes.String },
        product_slug: { type: SchemaTypes.String },
        product_price: { type: SchemaTypes.Number, required: true },
        product_quantity: { type: SchemaTypes.Number, required: true },
        product_type: { type: SchemaTypes.String, required: true },
        product_shop: { type: SchemaTypes.ObjectId, required: true, ref: 'Shop' },
        product_attributes: { type: Schema.Types.Mixed, required: true },
        product_ratingsAverage: {
            type: SchemaTypes.Number,
            default: 4.5,
            min: [1, 'Rating must be above 1'],
            max: [5, 'Rating must be under 5'],
            set: (val: number) => Math.round(val * 10) / 10
        },
        product_variations: { type: [Schema.Types.ObjectId] },
        isDraft: { type: SchemaTypes.Boolean, default: true, index: true, select: false },
        isPublished: { type: SchemaTypes.Boolean, default: true, index: true, select: false }
    },
    { timestamps: true },
)

const createProductModel: (conn: Connection) => ProductModel = (conn: Connection) => conn.model<Product>('Product', ProductSchema, 'Products')

export { Product, ProductModel, createProductModel }