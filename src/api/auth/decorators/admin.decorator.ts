import { SetMetadata } from "@nestjs/common";
import { Reflector } from "@nestjs/core";

export const IsAdmin = Reflector.createDecorator<boolean>(); //Implementação com base na documentação, decorator Roles. Não acho que coube bem, aqui
//export const IsAdmin = () => {
//    return SetMetadata('isAdmin',true);
//}

//export const NotAdmin = () => {
//    return SetMetadata('NotAdmin',true);
//}