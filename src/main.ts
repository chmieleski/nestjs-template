import { ConfigService } from '@/core/config';
import { AppModule } from '@/modules/app/app.module';
import { LoggerService } from '@/modules/logger';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { apiReference } from '@scalar/nestjs-api-reference';
import { Logger } from 'nestjs-pino';
import { auth } from './modules/auth/entities/auth';

export async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
    bodyParser: false,
  });
  app.useLogger(app.get(Logger));

  const logger = app.get(LoggerService);
  const configService: ConfigService = app.get(ConfigService);

  const swaggerConfig = new DocumentBuilder()
    .setTitle('API')
    .setDescription('API description')
    .setVersion('1.0')
    .addTag('Test', 'Just a test tag')
    .build();

  const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('open-api', app, swaggerDocument, {
    ui: false,
  });

  await auth.api.generateOpenAPISchema();

  app.use(
    '/reference',
    apiReference({
      pageTitle: 'API Reference',
      sources: [
        { url: '/open-api-json', title: 'API' },
        { url: '/auth/open-api/generate-schema', title: 'Auth' },
      ],
    }),
  );

  const port: number = configService.port;
  await app.listen(port, () => {
    logger.log(`Application is running on: http://localhost:${port}`);
  });
}
void bootstrap();
