import { Injectable } from '@nestjs/common';
import { Logger } from 'nestjs-pino';

/**
 * Logger service wrapper
 * Provides easy access to Pino logger throughout the application
 *
 * Usage:
 * ```typescript
 * constructor(private readonly logger: LoggerService) {}
 *
 * this.logger.log('Info message');
 * this.logger.error('Error message', error.stack);
 * this.logger.warn('Warning message');
 * ```
 */
@Injectable()
export class LoggerService extends Logger {
  /**
   * Log an info message
   */
  log(message: string, context?: string): void {
    super.log(message, context);
  }
  /**
   * Log an error message
   */
  error(message: string, trace?: string, context?: string): void {
    super.error(message, trace, context);
  }
  /**
   * Log a warning message
   */
  warn(message: string, context?: string): void {
    super.warn(message, context);
  }
  /**
   * Log a debug message
   */
  debug(message: string, context?: string): void {
    super.debug(message, context);
  }
  /**
   * Log a verbose message
   */
  verbose(message: string, context?: string): void {
    super.verbose(message, context);
  }
}
