import type { SteeringEvent } from "./steering.js";

export interface LastSuggestionState {
	text: string;
	shownAt: string;
	turnId: string;
}

export interface ReseedRuntimeState {
	running: boolean;
	pending: boolean;
	lastCheckAt?: string;
}

export interface RuntimeState {
	stateVersion: number;
	lastSuggestion?: LastSuggestionState;
	reseed: ReseedRuntimeState;
	steeringHistory: SteeringEvent[];
}

export const INITIAL_RUNTIME_STATE: RuntimeState = {
	stateVersion: 1,
	reseed: {
		running: false,
		pending: false,
	},
	steeringHistory: [],
};
