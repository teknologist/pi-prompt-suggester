import type { ExtensionContext } from "@mariozechner/pi-coding-agent";
import type { TurnContext } from "../../domain/suggestion.js";

export class RuntimeRef {
	private currentContext: ExtensionContext | undefined;
	private generationEpoch = 0;
	private currentSuggestion: string | undefined;
	private suggestionRevision = 0;
	private lastTurnContext: TurnContext | undefined;

	public setContext(ctx: ExtensionContext): void {
		this.currentContext = ctx;
	}

	public getContext(): ExtensionContext | undefined {
		return this.currentContext;
	}

	public bumpEpoch(): number {
		this.generationEpoch += 1;
		return this.generationEpoch;
	}

	public getEpoch(): number {
		return this.generationEpoch;
	}

	public setSuggestion(text: string | undefined): void {
		this.currentSuggestion = text?.trim() || undefined;
		this.suggestionRevision += 1;
	}

	public getSuggestion(): string | undefined {
		return this.currentSuggestion;
	}

	public getSuggestionRevision(): number {
		return this.suggestionRevision;
	}

	public setLastTurnContext(turn: TurnContext | undefined): void {
		this.lastTurnContext = turn;
	}

	public getLastTurnContext(): TurnContext | undefined {
		return this.lastTurnContext;
	}
}
