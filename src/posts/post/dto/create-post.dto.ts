import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreatePostDto {
    @IsNotEmpty()
    @IsString()
    title: string;
    

    @IsNotEmpty()
    @IsString()
    description: string;


    @IsNotEmpty()
    @IsString()
    content: string;


    @IsOptional()
    @IsString()
    image?: string;
}


