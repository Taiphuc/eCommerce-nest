import { Injectable } from "@nestjs/common";
import * as JWT from "jsonwebtoken"

@Injectable()
export class authUtils {
    async createTokenPair(payload, publicKey, privateKey): Promise<any> {
        try {
            // accessToken
            const accessToken = await JWT.sign(payload, publicKey, {
                // algorithm: 'RS256',
                expiresIn: '365d'
            })

            const refreshToken = await JWT.sign(payload, privateKey, {
                // algorithm: 'RS256',
                expiresIn: '3650d'
            })

            // verify token
            JWT.verify(accessToken, publicKey, (err, decode) => {
                if (err) {
                    console.error(`error verify::`, err);
                } else {
                    console.log(`decode verify::`, decode);
                }
            })
            return { accessToken, refreshToken }
        } catch (error) {

        }
    }
}
