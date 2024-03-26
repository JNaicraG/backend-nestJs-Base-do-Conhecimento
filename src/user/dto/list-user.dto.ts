import { IsEmail, IsNotEmpty, IsNumber, MinLength } from "class-validator";

export class ListUserDto {

    constructor(listUser:Partial<ListUserDto>){
        Object.assign(this,listUser);
    }

    @IsNotEmpty()
    @IsNumber()
    id:number;

    @IsEmail()
    email:string;
}
