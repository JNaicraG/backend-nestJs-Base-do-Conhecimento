import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateArticleDto {
    @IsNotEmpty()
    @IsNumber()
    userId:number;

    @IsNotEmpty()
    @IsNumber()
    categoryId:number;

    @IsNotEmpty()
    @IsString()
    name:string;
    
    @IsNotEmpty()
    @IsString()
    content:string;
    
    @IsNotEmpty()
    @IsString()
    description:string;
    
    @IsNotEmpty()
    @IsString()
    url:string;

    
}
