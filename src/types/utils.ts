export interface LogContext {
  readonly tag?: string;
  readonly data?: Record<string, unknown>;
}

export interface Logger {
  debug(message: string, context?: LogContext): void;
  info(message: string, context?: LogContext): void;
  warn(message: string, context?: LogContext): void;
  error(error: any, context?: LogContext): void;
  log(level: any, message: string, context?: LogContext): void;
}
