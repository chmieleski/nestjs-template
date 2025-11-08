import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { AllowAnonymous } from '@thallesp/nestjs-better-auth';
import { ApiTags } from '@nestjs/swagger';

@Controller()
@AllowAnonymous()
@ApiTags('Test')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
