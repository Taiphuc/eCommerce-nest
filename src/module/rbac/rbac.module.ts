import { Module } from "@nestjs/common";
import { DatabaseModule } from "src/database/database.module";
import { RbacController } from "./rbac.controller";
import { RbacService } from "./rbac.service";

@Module({
    imports: [DatabaseModule],
    controllers: [RbacController],
    providers: [RbacService,],
})

export class RbacModule { }