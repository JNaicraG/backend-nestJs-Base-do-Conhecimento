import { CanActivate, ExecutionContext, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { Observable } from "rxjs";

export class AuthGuard implements CanActivate{

    constructor(
        private jwtService:JwtService,
        private configService:ConfigService
    ){}

    async canActivate(context: ExecutionContext):  Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(request);

        if(!token){
            throw new UnauthorizedException('Token inválido');
        }

        try{
            const payload = await this.jwtService.verifyAsync(token, {
                secret:this.configService.get<string>('AUTH_SECRET'),
            });

            //setando o payload para acessa-lo nas endpoints(?)
            request['users'] = payload;
        } catch {
            throw new UnauthorizedException('Token inválido')
        }

        return true;
    }

    extractTokenFromHeader(request:Request):string | undefined{
        const [type, token] = request.headers['authorization']?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }

}