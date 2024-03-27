import { IsEmail, MinLength } from "class-validator";
import { IsUnique } from "src/shared/validation/is-unique";

export class CreateUserDto {
    @IsEmail()
    @IsUnique({ tableName: 'users', column: 'email' },{})
    email:string;

    @MinLength(6, {message:'Senha precisa ter no mínimo 6 caracteres'})
    password:string;
}
