import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class commentPostDto{
    @IsNotEmpty()
    @IsString()
    content: string

    @IsNotEmpty()
    @IsNumber()
    postId: number
}