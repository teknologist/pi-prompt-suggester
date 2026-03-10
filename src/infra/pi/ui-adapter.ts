import type { SuggestionSink } from "../../app/orchestrators/turn-end.js";

export interface UiContextLike {
	ui: {
		setEditorText?: (text: string) => void | Promise<void>;
		notify: (message: string, level: "info" | "warn" | "error") => void;
	};
}

export class PiSuggestionSink implements SuggestionSink {
	public constructor(private readonly ctx: UiContextLike) {
		void this.ctx;
	}

	public async showSuggestion(_text: string): Promise<void> {
		throw new Error("Not implemented: PiSuggestionSink.showSuggestion");
	}
}
