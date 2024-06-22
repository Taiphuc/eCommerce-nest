import { Connection, Document, Model, Schema, SchemaTypes } from 'mongoose'

interface Resource extends Document {
    src_name: string;
    src_slug: string;
    src_description: string;
}

type ResourceModel = Model<Resource>
const ResourceSchema = new Schema<Resource>(
    {
        src_name: { type: SchemaTypes.String, required: true },
        src_slug: { type: SchemaTypes.String, required: true },
        src_description: { type: SchemaTypes.String, default: '' },
    },
    { timestamps: true },
)

const createResourceModel: (conn: Connection) => ResourceModel = (conn: Connection) => conn.model<Resource>('Resource', ResourceSchema, 'Resources')

export { Resource, ResourceModel, createResourceModel }