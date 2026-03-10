import type { AutoprompterConfig } from "../../config/types.js";
import type { SteeringClassification } from "../../domain/steering.js";

export interface SteeringClassificationResult {
	classification: SteeringClassification;
	similarity: number;
}

export class SteeringClassifier {
	public constructor(private readonly config: AutoprompterConfig) {
		void this.config;
	}

	public classify(suggestedPrompt: string, actualUserPrompt: string): SteeringClassificationResult {
		void suggestedPrompt;
		void actualUserPrompt;
		throw new Error("Not implemented: SteeringClassifier.classify");
	}
}
