import { Injectable } from '@nestjs/common';
import { ConfigService as NestConfigService } from '@nestjs/config';
import { EnvironmentVariables, LogLevel } from './config.schema';

@Injectable()
export class ConfigService extends NestConfigService<
  EnvironmentVariables,
  true
> {
  get port(): number {
    const port = this.get<number>('PORT', { infer: true }) as
      | number
      | undefined;
    return port ?? 3000;
  }

  get nodeEnv(): string {
    const env = this.get<string>('NODE_ENV', { infer: true }) as
      | string
      | undefined;
    return env ?? 'development';
  }

  get appName(): string {
    const name = this.get<string>('APP_NAME', { infer: true }) as
      | string
      | undefined;
    return name ?? 'NestJS Application';
  }

  get logLevel(): string {
    const level = this.get<string>('LOG_LEVEL', { infer: true }) as
      | string
      | undefined;
    return level ?? LogLevel.Info;
  }
}
