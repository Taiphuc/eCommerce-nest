import { Connection, Document, Model, Schema, SchemaTypes } from 'mongoose'

interface RoleGrant {
    resource: Schema.Types.ObjectId;
    actions: Array<string>;
    attributes: string;
}

interface Role extends Document {
    role_name: string;
    role_slug: string;
    role_status: string;
    role_description: string;
    role_grants: Array<RoleGrant>
}

type RoleModel = Model<Role>

const RoleGrantSchema = new Schema<RoleGrant>(
    {
        resource: { type: Schema.Types.ObjectId, ref: 'Resource', required: true },
        actions: { type: [SchemaTypes.String], required: true },
        attributes: { type: SchemaTypes.String, default: '*' }
    }
)

const RoleSchema = new Schema<Role>(
    {
        role_name: { type: SchemaTypes.String, default: 'user', enum: ['user', 'shop', 'admin'] },
        role_slug: { type: SchemaTypes.String, required: true },
        role_status: { type: SchemaTypes.String, default: '' },
        role_description: { type: SchemaTypes.String, default: '' },
        role_grants: { type: [RoleGrantSchema] }
    },
    { timestamps: true },
)

const createRoleModel: (conn: Connection) => RoleModel = (conn: Connection) => conn.model<Role>('Role', RoleSchema, 'Roles')

export { Role, RoleGrant, RoleModel, createRoleModel }