import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class CreateAdminDto {
    @IsNotEmpty()
    @IsString()
    username: string;

    @IsNotEmpty()
    @IsString()
    @IsEmail()
    email: string
}
