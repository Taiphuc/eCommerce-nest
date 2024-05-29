import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";
import { Header } from "src/enum/enum";
import { KeytokenService } from "src/module/keytoken/keytoken.service";
import * as JWT from "jsonwebtoken";
import { JwtPayload } from "./jwtPayload.interface";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private readonly reflector: Reflector,
        private readonly keytokenService: KeytokenService
    ) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest<Request>()
        const { headers } = request

        const userId = headers[Header.CLIENT_ID]
        if (!userId) throw new Error('Invalid client id')

        const keyStore = await this.keytokenService.findByUserId(userId)
        if (!keyStore) throw new Error('Not found keyStore')

        if (headers[Header.REFRESHTOKEN]) {
            const refreshToken = headers[Header.REFRESHTOKEN]
            const decodeUser = JWT.verify(refreshToken, keyStore.privateKey) as JwtPayload
            if (userId !== decodeUser.userId) {
                throw new Error('Decode user error')
            }

            request['keyStore'] = keyStore
            request['user'] = decodeUser
            request['refreshToken'] = refreshToken
            return true
        }

        const accessToken = headers[Header.AUTHORIZATION]
        if (!accessToken) throw new Error('Invalid access token')

        try {
            const decodeUser = JWT.verify(accessToken, keyStore.publicKey) as JwtPayload
            if (userId !== decodeUser.userId) {
                throw new Error('Invalid userId');
            }
            request['keyStore'] = keyStore;
            request['user'] = decodeUser;
            console.log('Request after access token check:', request);
            return true
        } catch (error) {
            throw new Error(error);
        }
    }
}