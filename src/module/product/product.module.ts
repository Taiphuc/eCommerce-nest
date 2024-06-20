import { Module } from "@nestjs/common";
import { DatabaseModule } from "src/database/database.module";
import { ProductController } from "./product.controller";
import { ProductService } from "./product.service";
import { Utils } from "src/utils";
import { ProductRepository } from "src/database/repositories/product.repo";

@Module({
    imports: [DatabaseModule],
    controllers: [ProductController],
    providers: [ProductService, Utils, ProductRepository],
    exports: [ProductService, Utils]
})

export class ProductModule { }