import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtModuleOptions, JwtOptionsFactory } from "@nestjs/jwt";

@Injectable()
export class JwtConfigService implements JwtOptionsFactory{

    constructor(
        private readonly configService:ConfigService
    ){}

    createJwtOptions(): JwtModuleOptions {
        return {
            global:true,
            secret: this.configService.get<string>('AUTH_SECRET'),
            signOptions:{expiresIn:'12h'}
            //https://stackoverflow.com/questions/72314255/jwt-not-expiring-in-nestjs-application-even-after-setting-expiresin-value
            //https://docs.nestjs.com/security/authentication#implementing-the-sign-in-endpoint
        }
    }

}