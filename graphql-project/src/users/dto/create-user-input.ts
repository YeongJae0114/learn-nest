import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class CreateUserInput {
    @IsString()
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsString()
    @IsNotEmpty()
    password: string;

}
