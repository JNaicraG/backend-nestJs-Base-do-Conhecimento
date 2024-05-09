import { JwtService } from '@nestjs/jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/api/user/user.service';
import * as bcrypt from 'bcrypt'

@Injectable()
export class AuthService {

    constructor(
        private readonly userService:UserService,
        private readonly jwtService:JwtService,
    ){}

    async signIn(email:string, password:string){
        const user = await this.userService.findByEmail(email);

        if(user){
            const isMatch = await bcrypt.compare(password, user.password);
            if(isMatch){
                const now = Math.floor(Date.now()/1000); 

                const payload = {
                    sub: user.id,
                    name: user.name,
                    email: user.email,
                    admin: user.admin,
                    iat: now, //issued at - data de criação/emissão do token
                }

                return { //token
                    access_token: await this.jwtService.signAsync(payload),
                }
            }
        }

        throw new UnauthorizedException('Credenciais inválidas');

    }
}
