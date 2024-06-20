import { Module } from "@nestjs/common";
import { DatabaseModule } from "src/database/database.module";
import { CartController } from "./cart.controller";
import { ProductService } from "../product/product.service";
import { CartService } from "./cart.service";
import { Utils } from "src/utils";
import { ProductModule } from "../product/product.module";
import { ProductRepository } from "src/database/repositories/product.repo";

@Module({
    imports: [DatabaseModule, ProductModule],
    controllers: [CartController],
    providers: [CartService, ProductRepository],
})

export class CartModule { }