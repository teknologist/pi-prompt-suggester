import type { VcsClient } from "../../app/ports/vcs-client.js";

/**
 * TODO: implement via git CLI.
 */
export class GitClient implements VcsClient {
	public async getHeadCommit(): Promise<string | null> {
		throw new Error("Not implemented: GitClient.getHeadCommit");
	}

	public async getChangedFilesSinceCommit(_commit: string): Promise<string[]> {
		throw new Error("Not implemented: GitClient.getChangedFilesSinceCommit");
	}

	public async getDiffSummary(_paths: string[], _maxChars: number): Promise<string | undefined> {
		throw new Error("Not implemented: GitClient.getDiffSummary");
	}

	public async getWorkingTreeStatus(): Promise<string[]> {
		throw new Error("Not implemented: GitClient.getWorkingTreeStatus");
	}
}
