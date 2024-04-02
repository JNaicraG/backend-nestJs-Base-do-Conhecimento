import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { SignInDto } from './dto/signin.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Console } from 'console';

@Injectable()
export class AuthService {


    constructor(
        @InjectRepository(User)
        private userRepository:Repository<User>,
        private jwtService:JwtService
    ){}

    async signIn(signInDto:SignInDto):Promise<{access_token:string}>{
        const user = await this.userRepository.findOne({
            where:{
                email:signInDto.email,
            }
        });

        if(!user){
            throw new NotFoundException('Usuário não cadastrado!');
        }

        const isMatch = await bcrypt.compare(signInDto.password, (await user).password);
        if(!isMatch){
            throw new UnauthorizedException('Credenciais inválidas')
        }

        const now = Math.floor(Date.now()/1000);

        const payload = {
            id:user.id, //seguindo a padronização jwt seria, na verdade, sub:user.id
            name:user.name,
            email:user.email,
            admin:user.admin,
            iat:now, //issued at - data de criação/emissão do token
            //epx: now  + (60 * 60 * 24 * 3) //Realizada através das configurações do JwtService no módulo //não precisa se relogar até o fim desse tempo (3 dias em segundos)
        } //https://stackoverflow.com/questions/26739167/jwt-json-web-token-automatic-prolongation-of-expiration - mais info sobre boas práticas da Auth()
        console.log('payload', payload);

        const token = {
            access_token:  await this.jwtService.signAsync(payload)
        }
        console.log('token', token)

        return token;
    }
}
