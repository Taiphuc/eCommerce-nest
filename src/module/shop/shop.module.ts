import { Module } from "@nestjs/common";
import { ShopController } from "./shop.controller";
import { ShopService } from "./shop.service";
import { DatabaseModule } from "src/database/database.module";

@Module({
    imports: [DatabaseModule],
    controllers: [ShopController],
    providers: [ShopService],
    exports: [ShopService] // sure export ShopService
})

export class ShopModule { }