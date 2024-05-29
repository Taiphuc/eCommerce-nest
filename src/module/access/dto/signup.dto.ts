import { IsEmail, MinLength, IsNotEmpty } from "class-validator"

export class SignupDto {
    @IsNotEmpty()
    readonly name: string

    @IsNotEmpty()
    @IsEmail()
    readonly email: string;

    @IsNotEmpty()
    @MinLength(6, { message: 'This field must be than 6 character' })
    readonly password: string;
}