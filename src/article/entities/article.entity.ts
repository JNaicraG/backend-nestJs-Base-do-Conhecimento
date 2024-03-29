import { Category } from "src/category/entities/category.entity";
import { AbstractEntity } from "src/shared/abstract/abstract.entity";
import { User } from "src/user/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

Entity({ name: 'articles' })
export class Article extends AbstractEntity<Article>{
    @PrimaryGeneratedColumn()
    id: number;

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
