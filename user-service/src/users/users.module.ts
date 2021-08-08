import { ConfigModule } from '@nestjs/config';
import { CacheModule, Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema, User } from './schemas/user.schema';
import * as redis from 'cache-manager-ioredis';

@Module({
  imports: [
    MongooseModule.forFeature([{name: User.name, schema: UserSchema}]),
    ConfigModule.forRoot(),
    CacheModule.register({
      store: redis,
      host: process.env.REDIS_HOST,
      port: process.env.REDIS_PORT,
    }),
  ],
  controllers: [UsersController],
  providers: [{
    provide: 'IUSersService',
    useClass: UsersService,
  }]
})

export class UsersModule {}
