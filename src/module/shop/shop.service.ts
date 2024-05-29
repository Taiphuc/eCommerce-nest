import { Injectable, Scope, Inject } from "@nestjs/common";
import { Model } from "mongoose";
import { SHOP_MODEL } from "src/database/database.constants";
import { Shop } from "src/database/models/shop.model";

interface FindByEmailParams {
    email: string,
    select?: {
        email?: number,
        password?: number,
        name?: number,
        status?: number,
        roles?: number
    }
}

@Injectable({ scope: Scope.REQUEST })
export class ShopService {
    constructor(
        @Inject(SHOP_MODEL) private shopModel: Model<Shop>
    ) { }

    async findByEmail({ email, select = {
        email: 1, password: 1, name: 1, status: 1, roles: 1
    } }: FindByEmailParams): Promise<Shop> {
        return await this.shopModel.findOne({ email }).select(select).lean()
    }
}