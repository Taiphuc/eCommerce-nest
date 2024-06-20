import { Connection, Document, Model, Schema, SchemaTypes } from 'mongoose'

interface Notification extends Document {
    noti_type: string;
    noti_sender_id: Schema.Types.ObjectId;
    noti_receive_id: number;
    noti_content: string;
    noti_options: object;
}

type NotificationModel = Model<Notification>

const NotificationSchema = new Schema<Notification>(
    {
        noti_type: { type: SchemaTypes.String, enum: ['ORDER-001', 'ORDER-002', 'PROMOTION-001', 'SHOP-001'], required: true },
        noti_sender_id: { type: SchemaTypes.ObjectId, required: true, ref: 'Shop' },
        noti_receive_id: { type: SchemaTypes.Number, required: true, ref: 'Shop' },
        noti_content: { type: SchemaTypes.String, default: '' },
        noti_options: { type: Object, default: {} },
    },
    { timestamps: true },
)

const createNotificationModel: (conn: Connection) => NotificationModel = (conn: Connection) => conn.model<Notification>('Notification', NotificationSchema, 'Notifications')

export { Notification, NotificationModel, createNotificationModel }