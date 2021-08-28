import { Controller, Get } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/meta')
  getHello(): { HOSTNAME: string } {
    return { HOSTNAME: process.env.HOSTNAME };
  }
}
