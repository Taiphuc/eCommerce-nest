import { IsEmail, MinLength } from "class-validator"

export class LoginDto {

    @IsEmail()
    readonly email: string;

    @MinLength(6, { message: 'This field must be than 6 character' })
    readonly password: string;
}