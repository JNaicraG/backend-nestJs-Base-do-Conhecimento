import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
//import * as mongoose from 'mongoose'
import { HydratedDocument } from 'mongoose'

//https://docs.nestjs.com/recipes/mongodb
//export const StatSchema = new mongoose.Schema({
//    users: Number,
//    articles: Number,
//    categories: Number,
//    createdAt: String,
//})

//https://docs.nestjs.com/techniques/mongodb
export type StatsDocument = HydratedDocument<Stat>;

@Schema()
export class Stat { //Também poderia ser declarado manualmente como foi no jeito anterior, agora comentado
    //Já atua como modelo, não precisando utilizar o stat.model.ts em interfaces
    @Prop() //O typescript consegue inferir o tipo para o Schema automaticamente, sendo necessário somente para arrays ou objetos esse tipo de determinação. 
    users: number;
    
    @Prop()
    articles: number;
    
    @Prop()
    categories: number;
    
    @Prop()
    createdAt: string;
}

export const StatSchema = SchemaFactory.createForClass(Stat);