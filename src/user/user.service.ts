import { Catch, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Repository, TypeORMError } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ListUserDto } from './dto/list-user.dto';
import * as bcrypt from 'bcrypt';
import { GetUserDto } from './dto/get-user.dto';

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>
  ) { }

  rounds: number = 10;

  async encryptPassword(password: string) {
    const salt = await bcrypt.genSalt(this.rounds);
    const hash = await bcrypt.hash(password, salt);
    return hash
  }

  async create(createUserDto: CreateUserDto) {
    createUserDto.password = await this.encryptPassword(createUserDto.password);
    const user = new User({ ...createUserDto });
    const dadosSalvos = await this.userRepository.save(user);

    const resultado = {
      data: dadosSalvos,
      message: 'Usuário salvo com sucesso!'
    }

    return resultado;
  }

  async findAll() {
    const dadosSalvos = await this.userRepository.find({
      order: {
        id: 'ASC'
      }
    });
    const users = dadosSalvos.map(user => new ListUserDto(user.id, user.email));

    return users;
  }

  //Utilizar ExceptionFilters posteriormente
  async findOne(id: number) {
    let resultado, error;

    await this.userRepository.findOne({
      where: {
        id
      }
    })
      .then(userSalvo => {
        const user = new ListUserDto(userSalvo.id, userSalvo.email)
        resultado = {
          data: user,
          message: "Usuário encontrado!"
        }
      })
      .catch(err => error = err);

    this.Error(error);

    return resultado;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    let resultado, error;
    if (updateUserDto.password) {
      updateUserDto.password = await this.encryptPassword(updateUserDto.password);
    }
    const user = new User({ ...updateUserDto });
    await this.userRepository.update(id, user)
      .then(user => {
        resultado = {
          message: 'Usuário atualizado com sucesso'
        };
      })
      .catch(err => error = err);

    this.Error(error);

    return resultado;
  }

  async remove(id: number) {
    const userDeletado = await this.userRepository.delete(id);

    if (!userDeletado.affected) {
      this.Error('Usuário não encontrado');
    }

    const resultado = {
      message: 'Usuário removido com sucesso'
    };
    return resultado;
  }

  //async findByEmail(email: string) {
  async findByEmail(getUserDto: GetUserDto) {
    let resultado, error;
    const email = getUserDto.email;
    console.log('email',email)
    await this.userRepository.findOne({
      where:{
        email
      }
    })
      .then(userSalvo => {
        const user = new ListUserDto(userSalvo.id, userSalvo.email)
        resultado = {
          data: user,
          message: "Usuário encontrado!"
        }
      })
      .catch(err => error = err);

    this.Error(error);

    return resultado;
  }

  Error(error: string) {
    if (error) {
      throw new NotFoundException(error);
    }
  }
}
