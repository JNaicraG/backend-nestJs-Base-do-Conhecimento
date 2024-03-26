import { AbstractEntity } from "src/config/abstract/abstract.entity";
import { Column, Entity } from "typeorm";

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
}
