import { Inject, Injectable, Scope } from "@nestjs/common";
import { Aggregate, Model } from "mongoose";
import { NOTIFICATION_MODEL } from "src/database/database.constants";
import { Notification } from "src/database/models/notification.model";

@Injectable({ scope: Scope.REQUEST })
export class NotificationService {
    constructor(
        @Inject(NOTIFICATION_MODEL) private notificationModel: Model<Notification>
    ) { }

    async pushNotiToSystem({
        type = 'SHOP-001',
        receive_id = 1,
        sender_id = 1,
        options = {}
    }): Promise<Notification> {
        let noti_content: string

        if (type === 'SHOP-001') {
            noti_content = `@@@ vừa mới thêm 1 sản phẩm @@@@`
        } else if (type === 'PROMOTION-001') {
            noti_content = `@@@ vừa mới thêm 1 voucher @@@@@`
        }

        const newNoti = await this.notificationModel.create({
            noti_type: type,
            noti_content,
            noti_receive_id: receive_id,
            noti_sender_id: sender_id,
            noti_options: options
        })

        return newNoti
    }

    async listNotiUser({
        user_id = 1,
        type = 'ALL',
        isRead = 0
    }): Promise<Notification[]> {
        const match = { noti_receive_id: user_id }
        if (type !== 'ALL') {
            match['noti_type'] = type
        }

        return await this.notificationModel.aggregate([
            {
                $match: match
            },
            {
                $project: {
                    noti_type: 1,
                    noti_sender_id: 1,
                    noti_receive_id: 1,
                    noti_content: {
                        // sử dụng để nối vào chuỗi
                        $concat: [
                            {
                                $substr: ['$noti_options.shop_name', 0, -1]
                            },
                            ' vừa mới thêm 1 sản phẩm mới ', // language
                            {
                                $substr: ['$noti_options.product_name', 0, -1]
                            }
                        ]
                    },
                    noti_options: 1,
                    createdAt: 1
                }
            }
        ])
    }
}