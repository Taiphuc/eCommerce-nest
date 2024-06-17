import { Body, Controller, Delete, Get, Param, Post, Query, Res } from "@nestjs/common";
import { CartService } from "./cart.service";
import { CreateUpdateCartDto } from "./dto/cruCart.dto";
import { HttpMessage, HttpStatus } from "src/global/globalEnum";

@Controller({ path: '/cart' })
export class CartController {
    constructor(private cartService: CartService) { }

    @Post()
    async addToCart(@Body() body: CreateUpdateCartDto) {
        const result = await this.cartService.addToCart(body)
        return {
            statusCode: HttpStatus.SUCCESS,
            message: HttpMessage.SUCCESS,
            data: result
        }
    }

    @Post("/update")
    async updateCart(@Body() body: CreateUpdateCartDto) {
        const result = await this.cartService.addToCartV2(body)
        return {
            statusCode: HttpStatus.SUCCESS,
            message: HttpMessage.SUCCESS,
            data: result
        }
    }

    @Delete()
    async deleteCart(@Body() body) {
        const result = await this.cartService.deleteUserCart(body)
        return {
            statusCode: HttpStatus.SUCCESS,
            message: HttpMessage.SUCCESS,
            data: result
        }
    }

    @Get()
    async listUserCart(@Query('user_id') user_id) {
        // console.log(user_id);

        const result = await this.cartService.getListUserCart({ user_id })
        return {
            statusCode: HttpStatus.SUCCESS,
            message: HttpMessage.SUCCESS,
            data: result
        }
    }
}