import { Controller, Get, Query, UseGuards } from "@nestjs/common";
import { NotificationService } from "./notification.service";
import { HttpMessage, HttpStatus } from "src/global/globalEnum";
import { AuthGuard } from "src/auth/guard/authGuard";

@Controller({ path: '/notification' })
export class NotificationController {
    constructor(
        private notificationService: NotificationService
    ) { }

    @Get()
    @UseGuards(AuthGuard)
    async listNotiByUser(@Query('user_id') user_id) {
        
        const result = await this.notificationService.listNotiUser(user_id)
        return {
            statusCode: HttpStatus.SUCCESS,
            message: HttpMessage.SUCCESS,
            data: result
        }
    }
}