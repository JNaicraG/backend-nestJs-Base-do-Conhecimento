import { IsBoolean, IsEmail, IsNotEmpty, IsOptional, IsString, Matches, MinLength } from "class-validator";
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

    @IsString()
    @MinLength(6, {message:'Senha precisa ter no mínimo 6 caracteres'})
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
        message: 'password too weak',
      })
    password:string;
}
