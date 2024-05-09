import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateArticleDto {
    @ApiProperty({
        description:'Id do usuário quem criou este artigo',
        example:1
    })
    @IsNotEmpty()
    @IsNumber()
    userId:number;

    /**
     * Categoria a qual pertence este artigo
     * @example:2
     */
    @IsNotEmpty()
    @IsNumber()
    categoryId:number;

    /**
     * Nome que foi dado ao artigo a ser criado
     * @example:Como criar um projeto em NodeJS
     */
    @IsNotEmpty()
    @IsString()
    name:string;
    
    @ApiProperty({
        description:'Conteúdo do artigo a ser criado',
        example:'O conteúdo pode ser grande e verboso, normalmente explicando algum conceito ou semelhante',
        enum:{
            do:'Cabral',
            po:"Xacal",
            no:"Papal"
        }
    })
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
