import { Connection, Document, Model, Schema, SchemaTypes } from 'mongoose'

interface User extends Document {
    user_id: number;
    user_slug: string;
    user_name: string;
    user_password: string;
    user_salf: string;
    user_email: string;
    user_phone: string;
    user_sex: string;
    user_date_of_birth: Date;
    user_role: Schema.Types.ObjectId;
    user_status: string;
}

type UserModel = Model<User>

const ProductSchema = new Schema<User>(
    {
        user_id: { type: Number, required: true },
        user_slug: { type: String, required: true },
        user_name: { type: String, default: '' },
        user_password: { type: String, required: true },
        user_salf: { type: String, default: '' },
        user_email: { type: String, required: true },
        user_phone: { type: String, default: '' },
        user_sex: { type: String, default: '' },
        user_date_of_birth: { type: Date, default: null },
        user_role: { type: Schema.Types.ObjectId, ref: 'Role' },
        user_status: { type: String, default: 'pending', enum: ['pending', 'active', 'block'] },
    },
    { timestamps: true },
)

const createUserModel: (conn: Connection) => UserModel = (conn: Connection) => conn.model<User>('User', ProductSchema, 'Users')

export { User, UserModel, createUserModel }