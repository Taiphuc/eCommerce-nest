import { Module } from "@nestjs/common";
import { DatabaseModule } from "src/database/database.module";
import { AccessController } from "./access.controller";
import { AccessService } from "./access.service";
import { ShopModule } from "../shop/shop.module";
import { KeytokenModule } from "../keytoken/keytoken.module";
import { authUtils } from "src/auth/guard/authUtils";
import { Utils } from "src/utils";
import { AuthGuard } from "src/auth/guard/authGuard";

@Module({
    imports: [DatabaseModule, ShopModule, KeytokenModule],
    controllers: [AccessController],
    providers: [AccessService, authUtils, Utils, AuthGuard]
})

export class AccessModule { }