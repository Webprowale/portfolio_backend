import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class validateAdminOtp{
    @IsNotEmpty()
    @IsString()
    id:string


    @IsNotEmpty()
    @IsNumber()
    otp:number
}

export type adminOtp ={
    id:string
    otp:number
}