import { Injectable, Scope, Inject } from "@nestjs/common";
import { Model } from "mongoose";
import { APIKEY_MODEL } from "src/database/database.constants";
import { Apikey } from "src/database/models/apikey.model";

@Injectable({ scope: Scope.REQUEST })
export class ApikeyService {
    constructor(
        @Inject(APIKEY_MODEL) private apikeyModel: Model<Apikey>
    ) { }

    async findById(key: string): Promise<Apikey> {
        const objKey = await this.apikeyModel.findOne({ key, status: true }).lean()
        return objKey
    }
}