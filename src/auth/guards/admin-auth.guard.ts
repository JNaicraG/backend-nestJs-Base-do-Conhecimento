import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";
import { IsAdmin } from "../decorators/admin.decorator";


@Injectable()
export class AdminAuthGuard implements CanActivate {

    constructor(
        private readonly reflector:Reflector,
    ){}
    
    async canActivate(context: ExecutionContext): Promise<boolean> {
        console.log('Oiee')
        //const isAdmin = this.reflector.get<boolean>('isAdmin', context.getHandler());
        const isAdmin = this.reflector.get(IsAdmin, context.getHandler()) === undefined ? true : this.reflector.get(IsAdmin, context.getHandler()); //Se undefined, então é pra ser Admin (No atual momento prefere-se o uso de IsAdmin(False) de maneira específica e os IsAdmin(true) como o padrão do sistema, devido a quantidade de um x o outro)
        //E NotADmin também pareceu não intuitivo, por algum motivo.
        
        console.log('Admin?',isAdmin)
        if(isAdmin){
            const request = context.switchToHttp().getRequest();
            const user = request.user;
            return !!user?.admin;
        }
        
        return true;
    }
}