import { Module } from "@nestjs/common";
import { DatabaseModule } from "src/database/database.module";
import { NotificationController } from "./notification.controller";
import { NotificationService } from "./notification.service";
import { KeytokenModule } from "../keytoken/keytoken.module";
import { AuthGuard } from "src/auth/guard/authGuard";

@Module({
    imports: [DatabaseModule, KeytokenModule],
    controllers: [NotificationController],
    providers: [NotificationService, AuthGuard],
    exports: [NotificationService]
})

export class NotificationModule { }