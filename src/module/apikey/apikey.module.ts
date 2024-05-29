import { Module } from "@nestjs/common";
import { ApikeyController } from "./apikey.controller";
import { ApikeyService } from "./apikey.service";
import { DatabaseModule } from "src/database/database.module";

@Module({
    imports: [DatabaseModule],
    controllers: [ApikeyController],
    providers: [ApikeyService]
})

export class ApikeyModule { }