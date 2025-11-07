import { Module } from '@nestjs/common';
import { LoggerModule as PinoLoggerModule } from 'nestjs-pino';
import { LoggerService } from './logger.service';
import { ConfigModule, ConfigService } from '@/core/config';
import { IncomingMessage, ServerResponse } from 'http';

/**
 * Logger module configuration
 * Provides structured JSON logging with Pino, optimized for AWS CloudWatch
 *
 * In production, logs are output as structured JSON to stdout for CloudWatch Logs
 * In development, logs are pretty-printed for better readability
 */
@Module({
  imports: [
    ConfigModule,
    PinoLoggerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        pinoHttp: {
          level: configService.logLevel,
          transport:
            configService.nodeEnv !== 'production'
              ? {
                  target: 'pino-pretty',
                  options: {
                    colorize: true,
                    singleLine: false,
                    translateTime: 'yyyy-mm-dd HH:MM:ss',
                    ignore: 'pid,hostname',
                  },
                }
              : undefined,
          serializers: {
            req: (req: IncomingMessage) => {
              const extendedReq = req as IncomingMessage & {
                id?: string;
                query?: Record<string, unknown>;
                params?: Record<string, unknown>;
              };
              return {
                id: extendedReq.id,
                method: req.method,
                url: req.url,
                query: extendedReq.query,
                params: extendedReq.params,
                headers: {
                  host: req.headers.host || '',
                  'user-agent': req.headers['user-agent'] || '',
                  'content-type': req.headers['content-type'] || '',
                },
              };
            },
            res: (res: ServerResponse) => {
              const contentType =
                typeof res.getHeader === 'function'
                  ? res.getHeader('content-type') || ''
                  : '';
              return {
                statusCode: res.statusCode,
                headers: {
                  'content-type': contentType,
                },
              };
            },
            err: (err: Error) => ({
              type: err.name,
              message: err.message,
              stack: err.stack,
            }),
          },
          customProps: () => ({
            context: 'HTTP',
          }),
          customSuccessMessage: (
            req: IncomingMessage,
            res: ServerResponse,
            responseTime: number,
          ) => {
            const method = req.method || 'UNKNOWN';
            const url = req.url || 'UNKNOWN';
            const statusCode = res.statusCode || 200;
            return `${method} ${url} ${statusCode} - ${responseTime}ms`;
          },
          customErrorMessage: (
            req: IncomingMessage,
            res: ServerResponse,
            err: Error,
          ) => {
            const method = req.method || 'UNKNOWN';
            const url = req.url || 'UNKNOWN';
            const statusCode = res.statusCode || 500;
            return `${method} ${url} ${statusCode} - ${err.message}`;
          },
          customLogLevel: (
            req: IncomingMessage,
            res: ServerResponse,
            err?: Error,
          ) => {
            const statusCode = res.statusCode ?? 200;
            if (statusCode >= 400 && statusCode < 500) {
              return 'warn';
            }
            if (statusCode >= 500 || err) {
              return 'error';
            }
            return 'info';
          },
          autoLogging: {
            ignore: (req: IncomingMessage) => {
              return req.url === '/health' || req.url === '/metrics';
            },
          },
        },
      }),
    }),
  ],
  providers: [LoggerService],
  exports: [LoggerService],
})
export class LoggerModule {}
