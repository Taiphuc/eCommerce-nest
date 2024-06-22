import { Body, Controller, Get, Post, Query } from "@nestjs/common";
import { CreateRbacDto } from "./dto/createRbac.dto";
import { RbacService } from "./rbac.service";
import { HttpMessage, HttpStatus } from "src/global/globalEnum";
import { ListRbacDto } from "./dto/listRbac.dto";

@Controller({ path: '/rbac' })
export class RbacController {
    constructor(private rbacService: RbacService) { }

    @Post("/role")
    async newRole(@Body() body: CreateRbacDto) {
        const result = await this.rbacService.createRole(body)
        return {
            statusCode: HttpStatus.SUCCESS,
            message: HttpMessage.SUCCESS,
            data: result
        }
    }

    @Post("/resource")
    async newResource(@Body() body: CreateRbacDto) {
        const result = await this.rbacService.createResource(body)
        return {
            statusCode: HttpStatus.SUCCESS,
            message: HttpMessage.SUCCESS,
            data: result
        }
    }

    @Get("roles")
    async listRole(@Query() query: ListRbacDto) {
        const result = await this.rbacService.listRole(query)
        return {
            statusCode: HttpStatus.SUCCESS,
            message: HttpMessage.SUCCESS,
            data: result
        }
    }

    @Get("resources")
    async listResource(@Query() query: ListRbacDto) {
        const result = await this.rbacService.listResource(query)
        return {
            statusCode: HttpStatus.SUCCESS,
            message: HttpMessage.SUCCESS,
            data: result
        }
    }
}