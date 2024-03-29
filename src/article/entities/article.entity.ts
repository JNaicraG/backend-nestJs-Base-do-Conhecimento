import { Category } from "src/category/entities/category.entity";
import { AbstractEntity } from "src/shared/abstract/abstract.entity";
import { User } from "src/user/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

Entity({ name: 'articles' })
export class Article extends AbstractEntity<Article>{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        name: 'name',
        type: 'varchar',
        length:100,
        nullable: false
    })
    name:string;

    @Column({
        name: 'description',
        type: 'text',
        nullable: false
    })
    description:string;

    @Column({
        name: 'imageUrl',
        type: 'varchar',
        length:100,
        nullable: false
    })
    url:string;

    @Column({
        name: 'content',
        type: 'binary',
        nullable: false
    })
    content:string;

    @Column({
        name: 'user_id',
        type: 'integer',
        nullable: false
    })
    userId: number;

    @ManyToOne(
        () => User,
        user => user.articles,
        {
            cascade: true,
            onDelete: 'CASCADE'
        }
    )
    user: User;

    @Column({
        name: 'category_id',
        type: 'integer',
        nullable: false
    })
    categoryId: number;

    @ManyToOne(
        () => Category,
        category => category.articles,
        {
            cascade: true,
            onDelete: 'CASCADE'
        }
    )
    category: Category;
}
