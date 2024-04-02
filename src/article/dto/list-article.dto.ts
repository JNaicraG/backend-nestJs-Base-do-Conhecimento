export class ListArticleDto {
    constructor(
        readonly id:number,
        readonly userId:number,
        readonly categoryId:number,
        readonly name:string,
        readonly content:string,
        readonly description:string,
        readonly url:string,
    ){}
}

         