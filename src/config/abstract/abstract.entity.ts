import { PrimaryGeneratedColumn } from "typeorm";

export class AbstractEntity<T>{
    constructor(entity:Partial<T>){
        Object.assign(this,entity);
    }

    @PrimaryGeneratedColumn()
    id:number;
}