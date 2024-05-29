import { Connection, Document, Model, Schema, SchemaTypes } from 'mongoose'
import { RoleShop } from 'src/enum/enum';

interface Shop extends Document {
    readonly name: string;
    readonly email: string;
    readonly password: string;
    readonly status: string;
    readonly verify: boolean;
    readonly roles: Array<RoleShop>;
}

type ShopModel = Model<Shop>

const ShopSchema = new Schema<Shop>(
    {
        name: { type: SchemaTypes.String, trim: true, maxlength: 150 },
        email: { type: SchemaTypes.String, trim: true, unique: true },
        password: { type: SchemaTypes.String, required: true },
        status: { type: SchemaTypes.String, enum: ["active", "inactive"], default: "inactive" },
        verify: { type: SchemaTypes.Boolean, default: false },
        roles: { type: [SchemaTypes.String], default: [], enum: Object.values(RoleShop) }
    },
    { timestamps: true },
)

const createShopModel: (conn: Connection) => ShopModel = (conn: Connection) => conn.model<Shop>('Shop', ShopSchema, 'Shops')

export { Shop, ShopModel, createShopModel, RoleShop }