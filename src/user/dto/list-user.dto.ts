import { IsEmail, IsNotEmpty, IsNumber, MinLength } from "class-validator";

export class ListUserDto {

    //constructor(listUser:Partial<ListUserDto>){
    //    Object.assign(this,listUser);
    //}


    constructor(
        readonly id:number,
        readonly email:string
    ){}

    //@IsNotEmpty()
    //@IsNumber()
    //id:number;

    //@IsEmail()
    //email:string;
}
