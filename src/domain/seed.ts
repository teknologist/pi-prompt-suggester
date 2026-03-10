export type ReseedReason =
	| "initial_missing"
	| "manual"
	| "key_file_changed"
	| "post_turn_stale_check";

export interface SeedKeyFile {
	path: string;
	hash: string;
	whyImportant: string;
}

export interface SeedArtifact {
	seedVersion: number;
	generatedAt: string;
	sourceCommit?: string;
	projectIntentSummary: string;
	topObjectives: string[];
	constraints: string[];
	keyFiles: SeedKeyFile[];
	openQuestions: string[];
	lastReseedReason?: ReseedReason;
	lastChangedFiles?: string[];
}

export interface ReseedTrigger {
	reason: ReseedReason;
	changedFiles: string[];
	gitDiffSummary?: string;
}

export interface StalenessCheckResult {
	stale: boolean;
	trigger?: ReseedTrigger;
}
