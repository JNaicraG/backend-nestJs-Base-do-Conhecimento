import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ListUserDto } from './dto/list-user.dto';

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(User)
    private userRepository:Repository<User>
  ){}

  async create(createUserDto: CreateUserDto) {
    const user = new User({...createUserDto});
    const dadosSalvos = await this.userRepository.save(user);
    const listaDados = new ListUserDto({...dadosSalvos});

    const resultado = {
      data:listaDados,
      message:'Usuário salvo com sucesso!'
    }

    return resultado;
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
