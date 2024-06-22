import { } from "class-validator"

export class ListRbacDto {
    readonly userId: number;
    readonly limit: number = 30;
    readonly offset: number = 0;
    readonly search?: string;
}