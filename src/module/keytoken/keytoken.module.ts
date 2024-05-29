import { Module } from "@nestjs/common";
import { KeytokenController } from "./keytoken.controller";
import { KeytokenService } from "./keytoken.service";
import { DatabaseModule } from "src/database/database.module";

@Module({
    imports: [DatabaseModule],
    controllers: [KeytokenController],
    providers: [KeytokenService],
    exports: [KeytokenService]
})

export class KeytokenModule { }