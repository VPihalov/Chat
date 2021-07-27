import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { v4 as uuid } from 'uuid';
import { IUsersService } from './interfaces/IUsersService';

@Injectable()
export class UsersService implements IUsersService {
  private users: User[] = [];
  private readonly logger = new Logger(UsersService.name)

  async create(createUserDto: CreateUserDto) {
    
    await new Promise(res => {
      setTimeout(res, 5000)
    })

    const user: User = new User(uuid(), createUserDto.username, createUserDto.password)
    this.users.push(user)

    return user;
  }

  findAll() {
    return  this.users;
  }

  findOne(id: string) {
    const user =  this.users.find(user => user.id === id);

    if (!user) {
      this.logger.warn(`User with id ${id} doesn't exist`)
      throw new NotFoundException(`User with id ${id} doesn't exist`)
    }

    return user
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    const user = this.findOne(id)

    if (!user) {
      throw new NotFoundException(`User with id ${id} doesn't exist`)
    }

    user.username = updateUserDto.username ?? user.username;
    user.password = updateUserDto.password ?? user.password;

    return user

  }

  remove(id: string) {
    this.users.filter(user => user.id !== id);
    return id
  }
}

