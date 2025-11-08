import { ConfigService } from './config.service';
import { Environment, EnvironmentVariables, LogLevel } from './config.schema';

function createConfigService(): ConfigService {
  return new ConfigService({} as EnvironmentVariables);
}

describe('ConfigService', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should return the default port when PORT is undefined', () => {
    const configService = createConfigService();
    jest.spyOn(configService, 'get').mockReturnValueOnce(undefined as never);
    const actualPort = configService.port;
    expect(actualPort).toBe(3000);
  });

  it('should return the configured port when PORT is defined', () => {
    const configService = createConfigService();
    jest.spyOn(configService, 'get').mockReturnValueOnce(8080 as never);
    const actualPort = configService.port;
    expect(actualPort).toBe(8080);
  });

  it('should return the default node environment when NODE_ENV is undefined', () => {
    const configService = createConfigService();
    jest.spyOn(configService, 'get').mockReturnValueOnce(undefined as never);
    const actualNodeEnv = configService.nodeEnv;
    expect(actualNodeEnv).toBe(Environment.Development);
  });

  it('should return the configured node environment when NODE_ENV is defined', () => {
    const configService = createConfigService();
    jest
      .spyOn(configService, 'get')
      .mockReturnValueOnce(Environment.Production as never);
    const actualNodeEnv = configService.nodeEnv;
    expect(actualNodeEnv).toBe(Environment.Production);
  });

  it('should return the default application name when APP_NAME is undefined', () => {
    const configService = createConfigService();
    jest.spyOn(configService, 'get').mockReturnValueOnce(undefined as never);
    const actualAppName = configService.appName;
    expect(actualAppName).toBe('NestJS Application');
  });

  it('should return the configured application name when APP_NAME is defined', () => {
    const configService = createConfigService();
    jest.spyOn(configService, 'get').mockReturnValueOnce('Syntra' as never);
    const actualAppName = configService.appName;
    expect(actualAppName).toBe('Syntra');
  });

  it('should return the default log level when LOG_LEVEL is undefined', () => {
    const configService = createConfigService();
    jest.spyOn(configService, 'get').mockReturnValueOnce(undefined as never);
    const actualLogLevel = configService.logLevel;
    expect(actualLogLevel).toBe(LogLevel.Info);
  });

  it('should return the configured log level when LOG_LEVEL is defined', () => {
    const configService = createConfigService();
    jest
      .spyOn(configService, 'get')
      .mockReturnValueOnce(LogLevel.Debug as never);
    const actualLogLevel = configService.logLevel;
    expect(actualLogLevel).toBe(LogLevel.Debug);
  });
});
