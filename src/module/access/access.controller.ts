import { Body, Controller, Post, Req, Res, UseGuards } from "@nestjs/common";
import { AccessService } from "./access.service";
import { ResponseData } from "src/global/globalClass";
import { LoginDto } from "./dto/login.dto";
import { Response } from "express";
import { HttpMessage, HttpStatus } from "src/global/globalEnum";
import { SignupDto } from "./dto/signup.dto";
import { AuthGuard } from "src/auth/guard/authGuard";

@Controller({ path: '/shop' })

export class AccessController {
    constructor(private accessService: AccessService) { }

    @Post("/login")
    async login(@Body() body: LoginDto) {
        const result = await this.accessService.login(body)
        return {
            statusCode: HttpStatus.SUCCESS,
            message: HttpMessage.SUCCESS,
            data: result
        }
    }

    @Post("/signup")
    async signup(@Body() body: SignupDto) {
        const result = await this.accessService.signup(body)
        return {
            statusCode: HttpStatus.SUCCESS,
            message: HttpMessage.SUCCESS,
            data: result
        }
    }

    @Post("/logout")
    @UseGuards(AuthGuard)
    async logout(@Req() req: Request) {
        const result = await this.accessService.logout(req['keyStore'])
        return {
            statusCode: HttpStatus.SUCCESS,
            message: HttpMessage.SUCCESS,
            data: result
        }
    }
}