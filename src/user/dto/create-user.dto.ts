import { IsBoolean, IsEmail, IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator";
import { IsUnique } from "src/shared/validation/is-unique";

export class CreateUserDto {
    @IsNotEmpty()
    @IsString()
    name:string;

    @IsOptional()
    @IsBoolean()
    admin:boolean;

    @IsEmail()
    @IsUnique({ tableName: 'users', column: 'email' },{})
    email:string;

    @MinLength(6, {message:'Senha precisa ter no mínimo 6 caracteres'})
    password:string;
}
