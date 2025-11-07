import { plainToInstance } from 'class-transformer';
import type { ValidationError } from 'class-validator';
import {
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  validateSync,
} from 'class-validator';

enum Environment {
  Development = 'development',
  Production = 'production',
  Test = 'test',
}

enum LogLevel {
  Trace = 'trace',
  Debug = 'debug',
  Info = 'info',
  Warn = 'warn',
  Error = 'error',
  Fatal = 'fatal',
}

class EnvironmentVariables {
  @IsEnum(Environment)
  @IsOptional()
  declare NODE_ENV: Environment;

  @IsNumber()
  @IsOptional()
  declare PORT: number;

  @IsString()
  @IsOptional()
  declare APP_NAME: string;

  @IsEnum(LogLevel)
  @IsOptional()
  declare LOG_LEVEL: LogLevel;

  constructor() {
    this.NODE_ENV = Environment.Development;
    this.PORT = 3000;
    this.APP_NAME = 'NestJS Application';
    this.LOG_LEVEL = LogLevel.Info;
  }
}

export function validate(
  config: Record<string, unknown>,
): EnvironmentVariables {
  const validatedConfig = plainToInstance(EnvironmentVariables, config, {
    enableImplicitConversion: true,
  });
  const errors: ValidationError[] = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });
  if (errors.length > 0) {
    const errorMessages = errors
      .map((error: ValidationError) =>
        error.constraints
          ? Object.values(error.constraints).join(', ')
          : error.property,
      )
      .join('; ');
    throw new Error(`Configuration validation failed: ${errorMessages}`);
  }
  return validatedConfig;
}

export { EnvironmentVariables, Environment, LogLevel };
