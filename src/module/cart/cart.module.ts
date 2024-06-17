import { Module } from "@nestjs/common";
import { DatabaseModule } from "src/database/database.module";
import { CartController } from "./cart.controller";
import { ProductService } from "../product/product.service";
import { CartService } from "./cart.service";
import { Utils } from "src/utils";
import { ProductModule } from "../product/product.module";

@Module({
    imports: [DatabaseModule, ProductModule],
    controllers: [CartController],
    providers: [CartService],
})

export class CartModule { }