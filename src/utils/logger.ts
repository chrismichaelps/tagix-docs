import { taggedEnum, TaggedError, isTaggedError, matchTag } from "tagix";
import { LogContext, Logger } from "../types";

const LogLevel = taggedEnum({
  Debug: {},
  Info: {},
  Warn: {},
  Error: {},
});

class ConsoleLogger implements Logger {
  private formatMessage(level: string, message: string, context?: LogContext): string {
    const tag = context?.tag ? `[${context.tag}]` : "";
    return `${level}${tag} ${message}`;
  }

  debug(message: string, context?: LogContext): void {
    console.debug(this.formatMessage("DEBUG", message, context), context?.data || "");
  }

  info(message: string, context?: LogContext): void {
    console.info(this.formatMessage("INFO", message, context), context?.data || "");
  }

  warn(message: string, context?: LogContext): void {
    console.warn(this.formatMessage("WARN", message, context), context?.data || "");
  }

  error(error: TaggedError<string> | Error | string, context?: LogContext): void {
    if (isTaggedError(error)) {
      console.error(
        this.formatMessage("ERROR", `${error._tag}: ${error.message}`, context),
        error,
        context?.data || ""
      );
    } else if (error instanceof Error) {
      console.error(
        this.formatMessage("ERROR", error.message, context),
        error,
        context?.data || ""
      );
    } else {
      console.error(this.formatMessage("ERROR", error, context), context?.data || "");
    }
  }

  log(level: typeof LogLevel.State, message: string, context?: LogContext): void {
    matchTag(level, {
      Debug: () => this.debug(message, context),
      Info: () => this.info(message, context),
      Warn: () => this.warn(message, context),
      Error: () => this.error(message, context),
      _: () => {},
    });
  }
}

export const logger = new ConsoleLogger();
