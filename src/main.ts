import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from 'nestjs-pino';
import { LoggerService } from './core/logger';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });
  app.useLogger(app.get(Logger));

  const logger = app.get(LoggerService);

  const port = process.env.PORT ?? 3000;
  await app.listen(port, () => {
    logger.log(`Application is running on: http://localhost:${port}`);
  });
}
void bootstrap();
