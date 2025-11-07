import { NestFactory } from '@nestjs/core';
import { AppModule } from '@/modules/app/app.module';
import { Logger } from 'nestjs-pino';
import { LoggerService } from '@/modules/logger';
import { ConfigService } from '@/core/config';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
    bodyParser: false,
  });
  app.useLogger(app.get(Logger));

  const logger = app.get(LoggerService);
  const configService: ConfigService = app.get(ConfigService);

  const port: number = configService.port;
  await app.listen(port, () => {
    logger.log(`Application is running on: http://localhost:${port}`);
  });
}
void bootstrap();
