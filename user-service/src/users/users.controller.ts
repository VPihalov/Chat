import { 
  Controller,
  Get,
  Post, 
  Body, 
  Put, 
  Param, 
  Delete, 
  Inject, 
  Logger, 
  UseInterceptors, 
  CacheInterceptor, 
  CacheTTL, 
  CACHE_MANAGER
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { IUsersService } from './interfaces/IUsersService';
import { Cache } from 'cache-manager'

@Controller('users')
export class UsersController {

  private readonly logger = new Logger(UsersController.name)

  constructor(
    @Inject('IUSersService') private readonly usersService: IUsersService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache
  ) {}
  
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    this.logger.log('Someone is creating new user' + JSON.stringify(createUserDto));
    this.cacheManager.reset();
    return this.usersService.create(createUserDto)
  }

  @Get()
  @UseInterceptors(CacheInterceptor)
  @CacheTTL(10)
  async findAll() {
    await new Promise(r => setTimeout(r, 7000))
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id)
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
