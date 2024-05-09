import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
//export class CreateCategoryParentDto {
//    @IsNotEmpty()
//    @IsNumber()
//    id:number;
//}
//export class CreateCategoryChildrenDto {
//    @IsNotEmpty()
//    @IsNumber()
//    id:number;
//}

export class CreateCategoryDto {

    @IsNotEmpty()
    @IsString()
    name:string;

    @IsOptional()
    @IsNumber()
    parentId:number;
    
    //@IsOptional()
    //children:CreateCategoryChildrenDto[];

}
