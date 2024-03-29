import { Column, ManyToOne, OneToMany, PrimaryGeneratedColumn, TreeChildren, TreeLevelColumn, TreeParent } from "typeorm";

export class Category {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;


    //Closure Table
    //https://orkhan.gitbook.io/typeorm/docs/entities#tree-entities
    //https://pt.slideshare.net/slideshow/models-for-hierarchical-data/4179181
    @TreeChildren()
    children:Category[];

    @TreeParent()
    parent:Category;

    @TreeLevelColumn()
    level:number;

    //Adjacency list
    //@ManyToOne(
    //    () => Category,
    //    (category) => category.children,
    //    { cascade: true }
    //)
    //parent: Category;

    //@OneToMany(
    //    () => Category,
    //    (category) => category.parent
    //)
    //children: Category[];
}
