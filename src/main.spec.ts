import { INestApplication } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { Logger } from 'nestjs-pino';
import { AppModule } from '@/modules/app/app.module';
import { LoggerService } from '@/modules/logger';
import { ConfigService } from '@/core/config';
import { bootstrap } from './main';

type BootstrapTestApplication = {
  useLogger: jest.Mock<void, [Logger]>;
  get: jest.Mock<unknown, [unknown]>;
  listen: jest.Mock<Promise<void>, [number, () => void]>;
};

describe('bootstrap', () => {
  let mockApp: BootstrapTestApplication;
  let mockLoggerService: { log: jest.Mock<void, [string]> };
  let mockConfigService: { port: number };
  let createSpy: jest.SpyInstance<
    Promise<INestApplication>,
    Parameters<typeof NestFactory.create>
  >;
  let nestLogger: Logger;
  beforeEach(() => {
    mockLoggerService = { log: jest.fn<void, [string]>() };
    mockConfigService = { port: 4321 };
    nestLogger = {} as unknown as Logger;
    mockApp = {
      useLogger: jest.fn<void, [Logger]>(),
      get: jest.fn<unknown, [unknown]>(),
      listen: jest.fn<Promise<void>, [number, () => void]>(),
    };
    mockApp.get.mockImplementation((token: unknown) => {
      if (token === Logger) {
        return nestLogger;
      }
      if (token === LoggerService) {
        return mockLoggerService as unknown as LoggerService;
      }
      if (token === ConfigService) {
        return mockConfigService as unknown as ConfigService;
      }
      throw new Error('Unexpected token received by mock application');
    });
    mockApp.listen.mockImplementation((_port, callback) => {
      callback();
      return Promise.resolve();
    });
    createSpy = jest
      .spyOn(NestFactory, 'create')
      .mockResolvedValue(mockApp as unknown as INestApplication);
  });
  afterEach(() => {
    createSpy.mockRestore();
    jest.clearAllMocks();
  });
  it('should bootstrap the application and start listening on configured port', async () => {
    await bootstrap();
    expect(createSpy).toHaveBeenCalledWith(AppModule, {
      bufferLogs: true,
      bodyParser: false,
    });
    expect(mockApp.useLogger).toHaveBeenCalledWith(nestLogger);
    expect(mockApp.listen).toHaveBeenCalledWith(
      mockConfigService.port,
      expect.any(Function),
    );
    expect(mockLoggerService.log).toHaveBeenCalledWith(
      `Application is running on: http://localhost:${mockConfigService.port}`,
    );
  });
});
