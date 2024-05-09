import { Article } from "src/api/article/entities/article.entity";
import { AbstractEntity } from "src/api/shared/abstract/abstract.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn, Tree, TreeChildren, TreeParent } from "typeorm";

@Entity({name:'categories'})
@Tree('closure-table')
export class Category extends AbstractEntity<Category>{

    @Column({
        name:'name',
        type:'varchar',
        length:100,
        nullable:false
    })
    name:string;

    @TreeParent({
        onDelete:'CASCADE'
    })
    parent:Category;


    @TreeChildren({
        cascade:true
    })
    children:Category[];

    @OneToMany(
        ()=> Article,
        article => article.category,
        {orphanedRowAction:'delete'}
    )
    articles:Article[];
}
