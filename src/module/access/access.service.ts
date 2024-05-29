import { Inject, Injectable, Scope } from "@nestjs/common";
import { ShopService } from "../shop/shop.service";
import { authUtils } from "src/auth/guard/authUtils";
import * as bcrypt from "bcrypt"
import * as crypto from "crypto"
import { KeytokenService } from "../keytoken/keytoken.service";
import { Utils } from "src/utils";
import { LoginDto } from "./dto/login.dto";
import { SignupDto } from "./dto/signup.dto";
import { Model } from "mongoose";
import { KEY_MODEL, SHOP_MODEL } from "src/database/database.constants";
import { RoleShop, Shop } from "src/database/models/shop.model";
import { Keytoken } from "src/database/models/keytoken.model";

@Injectable({ scope: Scope.REQUEST })
export class AccessService {
    constructor(
        private readonly shopService: ShopService,
        private readonly keytokenService: KeytokenService,
        private readonly authUtils: authUtils,
        private readonly utils: Utils,
        @Inject(SHOP_MODEL) private shopModel: Model<Shop>,
        @Inject(KEY_MODEL) private keyModel: Model<Keytoken>
    ) { }

    async login({ email, password }: LoginDto): Promise<any> {
        const foundShop = await this.shopService.findByEmail({ email })

        if (!foundShop) {
            throw new Error('Shop not registered!')
        }

        const match = bcrypt.compare(password, foundShop.password)
        if (!match) {
            throw new Error('Authentication error')
        }

        const privateKey = crypto.randomBytes(64).toString('hex')
        const publicKey = crypto.randomBytes(64).toString('hex')

        const tokens = await this.authUtils.createTokenPair({ userId: foundShop._id, email }, publicKey, privateKey)

        await this.keytokenService.createKeyToken({
            refreshToken: tokens.refreshToken,
            privateKey,
            publicKey,
            userId: foundShop._id
        })

        return {
            shop: this.utils.getInfoData({ fields: ['_id', 'name', 'email'], object: foundShop }),
            tokens
        }
    }

    async signup({ name, email, password }: SignupDto): Promise<any> {
        const foundShop = await this.shopService.findByEmail({ email })

        if (foundShop) {
            throw new Error('Shop already registered!')
        }

        const passwordHash = await bcrypt.hash(password, 10)
        const newShop = await this.shopModel.create({ name, email, password: passwordHash, roles: [RoleShop.SHOP] })

        if (newShop) {
            const privateKey = crypto.randomBytes(64).toString('hex')
            const publicKey = crypto.randomBytes(64).toString('hex')

            const tokens = await this.authUtils.createTokenPair({ userId: newShop._id, email }, publicKey, privateKey)

            const keyStore = await this.keytokenService.createKeyToken({
                userId: newShop._id,
                publicKey,
                privateKey,
                refreshToken: tokens.refreshToken
            })

            if (!keyStore) {
                throw new Error('Create key store failure!')
            }

            return {
                shop: this.utils.getInfoData({ fields: ['_id', 'name', 'email'], object: newShop }),
                tokens
            }
        }
    }

    async logout(keyStore: Keytoken) : Promise<any>{
        const deleteKey = await this.keytokenService.removeKeyById(keyStore._id)
        return deleteKey
    }
}
