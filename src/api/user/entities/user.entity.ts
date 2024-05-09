import { Article } from "src/api/article/entities/article.entity";
import { AbstractEntity } from "src/api/shared/abstract/abstract.entity";
import { Column, Entity, OneToMany } from "typeorm";

@Entity({ name: 'users' })      //Id extendido através de Abstract
export class User extends AbstractEntity<User>{

    @Column({
        name: 'name',
        type:'varchar',
        length: 100,
        nullable: false
    })
    name: string;

    @Column({
        name: 'email',
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

    @Column({
        name: 'admin',
        default:false,
        nullable: false
    })
    admin: boolean;

    @OneToMany(
        ()=> Article,
        article => article.user,
        {orphanedRowAction:'delete'}
    )
    articles:Article[];
}
