import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { MongooseModuleOptions, MongooseOptionsFactory } from "@nestjs/mongoose";

Injectable()
export class MongooseConfigService implements MongooseOptionsFactory {
    constructor(
        private readonly configService:ConfigService,
    ){}

    createMongooseOptions(): MongooseModuleOptions {
        return {
            uri: this.configService.get<string>('MongoHost'), // URI de conexão com o MongoDB
            //useNewUrlParser: true, // Habilita o uso do novo parser do MongoDB (obrigatório para versões recentes)
            //useUnifiedTopology: true, // Habilita a detecção de servidores e monitoramento de status do servidor
            //useFindAndModify: false, // Desativa o uso do método deprecated findAndModify do MongoDB
            //useCreateIndex: true, // Habilita a criação automática de índices para propriedades únicas
            autoIndex: true, // Habilita a criação automática de índices para otimização de consultas
        };
    }
}