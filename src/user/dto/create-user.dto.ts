import { IsEmail, MinLength } from "class-validator";

export class CreateUserDto {
    @IsEmail()
    email:string;

    @MinLength(6, {message:'Senha precisa ter no mínimo 6 caracteres'})
    password:string;
}
