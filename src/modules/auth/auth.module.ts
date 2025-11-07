import { Module } from '@nestjs/common';
import { AuthModule as BetterAuthModule } from '@thallesp/nestjs-better-auth';
import { auth } from './entities/auth';

@Module({
  imports: [BetterAuthModule.forRoot({ auth })],
  controllers: [],
  providers: [],
})
export class AuthModule {}
