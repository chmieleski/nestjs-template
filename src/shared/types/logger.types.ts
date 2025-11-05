/**
 * Logger configuration options
 */
export interface LoggerConfig {
  /**
   * Log level (trace, debug, info, warn, error, fatal)
   */
  level: string;
  /**
   * Whether to use pretty printing in development
   */
  prettyPrint: boolean;
  /**
   * Whether to include request ID in logs
   */
  includeRequestId: boolean;
  /**
   * Whether to log request/response bodies
   */
  logRequestBody: boolean;
  /**
   * Whether to log response bodies
   */
  logResponseBody: boolean;
  /**
   * CloudWatch configuration
   */
  cloudWatch?: CloudWatchConfig;
}

/**
 * CloudWatch logging configuration
 */
export interface CloudWatchConfig {
  /**
   * CloudWatch log group name
   */
  logGroupName: string;
  /**
   * CloudWatch log stream name
   */
  logStreamName?: string;
  /**
   * AWS region
   */
  region: string;
  /**
   * Whether to enable CloudWatch transport
   */
  enabled: boolean;
}
