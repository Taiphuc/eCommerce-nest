import { Injectable, Scope, Inject } from "@nestjs/common";
import { Model, Schema, Types } from "mongoose";
import { KEY_MODEL } from "src/database/database.constants";
import { Keytoken } from "src/database/models/keytoken.model";

interface createKeyTokenParams {
    userId: Schema.Types.ObjectId,
    publicKey: string,
    privateKey: string,
    refreshToken: string
}

@Injectable({ scope: Scope.REQUEST })
export class KeytokenService {
    constructor(
        @Inject(KEY_MODEL) private keyModel: Model<Keytoken>
    ) { }

    async createKeyToken({ userId, publicKey, privateKey, refreshToken }: createKeyTokenParams): Promise<string> {
        try {
            const filter = { user: userId }, update = {
                user: userId, publicKey, privateKey, refreshTokensUsed: [], refreshToken
            }, options = { upsert: true, new: true }

            const tokens = await this.keyModel.findOneAndUpdate(filter, update, options)
            return tokens ? tokens.publicKey : null
        } catch (error) {

        }
    }

    async removeKeyById(id: string): Promise<any> {
        return await this.keyModel.deleteOne({ _id: id })
    }

    async findByUserId(userId: string): Promise<Keytoken> {
        const keyToken = await this.keyModel.findOne({ user: new Types.ObjectId(userId) })
        // console.log("keyToken: ", keyToken);
        return keyToken
    }
}