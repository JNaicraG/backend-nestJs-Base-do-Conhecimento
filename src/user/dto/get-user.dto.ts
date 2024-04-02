import { IsEmail, IsNotEmpty, IsOptional } from "class-validator";

export class GetUserDto{
    @IsEmail()
    @IsNotEmpty()
    email:string;

}