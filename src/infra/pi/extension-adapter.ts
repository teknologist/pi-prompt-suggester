import type { ExtensionAPI } from "@mariozechner/pi-coding-agent";

export interface ExtensionWiring {
	onSessionStart: () => Promise<void>;
	onTurnEnd: (payload: unknown) => Promise<void>;
	onUserSubmit: (payload: unknown) => Promise<void>;
	onReseedCommand: () => Promise<void>;
	onStatusCommand: () => Promise<void>;
}

/**
 * TODO: map concrete pi events into orchestrator calls.
 */
export class PiExtensionAdapter {
	public constructor(
		private readonly pi: ExtensionAPI,
		private readonly wiring: ExtensionWiring,
	) {
		void this.pi;
		void this.wiring;
	}

	public register(): void {
		throw new Error("Not implemented: PiExtensionAdapter.register");
	}
}
