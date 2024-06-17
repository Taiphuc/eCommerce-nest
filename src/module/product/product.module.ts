import { Module } from "@nestjs/common";
import { DatabaseModule } from "src/database/database.module";
import { ProductController } from "./product.controller";
import { ProductService } from "./product.service";
import { Utils } from "src/utils";

@Module({
    imports: [DatabaseModule],
    controllers: [ProductController],
    providers: [ProductService, Utils],
    exports: [ProductService, Utils]
})

export class ProductModule { }