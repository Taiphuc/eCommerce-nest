import { Connection, Document, Model, Schema, SchemaTypes } from 'mongoose'

interface Apikey extends Document {
    readonly key: string;
    readonly status: boolean;
    readonly permissions: Array<string>;
}

type ApikeyModel = Model<Apikey>

const ApikeySchema = new Schema<Apikey>(
    {
        key: { type: SchemaTypes.String, required: true, unique: true },
        status: { type: SchemaTypes.Boolean, default: true },
        permissions: {
            type: [SchemaTypes.String],
            required: true,
            enum: ["0000", "1111", "2222"]
        }
    },
    { timestamps: true },
)

const createApikeyModel: (conn: Connection) => ApikeyModel = (conn: Connection) => conn.model<Apikey>('Apikey', ApikeySchema, 'Apikeys')

export { Apikey, ApikeyModel, createApikeyModel }