import { Category } from "src/api/category/entities/category.entity";
import { AbstractEntity } from "src/api/shared/abstract/abstract.entity";
import { User } from "src/api/user/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'articles' })
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
        type: 'bytea',
        nullable: false
    })
    content:string;


    @ManyToOne(
        () => User,
        user => user.articles,
        {
            cascade: true,
            onDelete: 'CASCADE'
        }
    )
    @JoinColumn({
        name:'user_id',
        referencedColumnName:'id'
    })
    user: User;

    @Column({ name: 'user_id' })
    userId: number;


    @ManyToOne(
        () => Category,
        category => category.articles,
        {
            cascade: true,
            onDelete: 'CASCADE'
        }
    )
    @JoinColumn({
        name:'category_id',
        referencedColumnName:'id'
    })
    category: Category;

    
    @Column({ name: 'category_id' })
    categoryId: number;
}
