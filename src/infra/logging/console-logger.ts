import type { Logger } from "../../app/ports/logger.js";

/**
 * Scaffold logger implementation. Behavior intentionally minimal for now.
 */
export class ConsoleLogger implements Logger {
	public debug(_message: string, _meta?: Record<string, unknown>): void {
		// TODO: implement structured debug logging.
	}

	public info(_message: string, _meta?: Record<string, unknown>): void {
		// TODO: implement structured info logging.
	}

	public warn(_message: string, _meta?: Record<string, unknown>): void {
		// TODO: implement structured warn logging.
	}

	public error(_message: string, _meta?: Record<string, unknown>): void {
		// TODO: implement structured error logging.
	}
}
