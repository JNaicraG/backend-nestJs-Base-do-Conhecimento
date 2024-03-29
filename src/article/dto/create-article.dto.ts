import { IsNotEmpty, IsNumber } from "class-validator";

export class CreateArticleDto {
    @IsNotEmpty()
    @IsNumber()
    userId:number;

    @IsNotEmpty()
    @IsNumber()
    categoryId:number;

    
}
