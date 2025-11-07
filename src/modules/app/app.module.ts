import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggerModule } from '@/modules/logger';
import { ConfigModule } from '@/core/config';
import { AuthModule } from '@/modules/auth/auth.module';

@Module({
  imports: [ConfigModule, LoggerModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
