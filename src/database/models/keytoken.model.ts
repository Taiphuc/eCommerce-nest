import { Connection, Document, Model, Schema, SchemaTypes } from 'mongoose'

interface Keytoken extends Document {
    readonly user: Schema.Types.ObjectId;
    readonly publicKey: string;
    readonly privateKey: string;
    readonly refreshTokensUsed: Array<Schema.Types.ObjectId>;
    readonly refreshToken: string;
}

type KeytokenModel = Model<Keytoken>

const KeytokenSchema = new Schema<Keytoken>(
    {
        user: { type: SchemaTypes.ObjectId, required: true, ref: 'Shop' },
        publicKey: { type: SchemaTypes.String, required: true },
        privateKey: { type: SchemaTypes.String, required: true },
        refreshTokensUsed: { type: [SchemaTypes.ObjectId], default: [] },
        refreshToken: { type: SchemaTypes.String, required: true },
    },
    { timestamps: true },
)

const createKeyModel: (conn: Connection) => KeytokenModel = (conn: Connection) => conn.model<Keytoken>('Key', KeytokenSchema, 'Keys')

export { Keytoken, KeytokenModel, createKeyModel }