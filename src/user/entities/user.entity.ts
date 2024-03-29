import { Article } from "src/article/entities/article.entity";
import { AbstractEntity } from "src/shared/abstract/abstract.entity";
import { Column, Entity, OneToMany } from "typeorm";

@Entity({ name: 'users' })      //Id extendido através de Abstract
export class User extends AbstractEntity<User>{

    @Column({
        name: 'nome',
        type:'varchar',
        length: 100,
        nullable: false
    })
    email: string;

    @Column({
        name: 'password',
        type:'varchar',
        length: 100,
        nullable: false
    })
    password: string;

    @OneToMany(
        ()=> Article,
        article => article.user,
        {orphanedRowAction:'delete'}
    )
    articles:Article[];
}
