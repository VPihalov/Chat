import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { User } from '../entities/user.entity';

export interface IUsersService {

  create(createUserDto: CreateUserDto): Promise<User>;

  findAll(): User[];

  findOne(id: string): User;

  update(id: string, updateUserDto: UpdateUserDto): User;

  remove(id: string): string;
}

