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
import { RedisAdapter } from 'src/cache/RedisAdapter';
import { ClearCacheInterceptor } from 'src/cache/ClearCacheInterceptor';

@Controller('users')
export class UsersController {

  private readonly logger = new Logger(UsersController.name)

  constructor(
    @Inject('IUSersService') private readonly usersService: IUsersService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    redisAdapter: RedisAdapter,
  ) {
    // This is just for example how to set list with redis
    redisAdapter.getClient().lpush('mylist', 'a', 'b', 'c')  //now we have access to all methods to work with redis store
  }
  
  @Post()
  @UseInterceptors(ClearCacheInterceptor)
  create(@Body() createUserDto: CreateUserDto) {
    this.logger.log('Someone is creating new user' + JSON.stringify(createUserDto));
    // this.cacheManager.reset();
    return this.usersService.create(createUserDto)
  }

  @Get()
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
