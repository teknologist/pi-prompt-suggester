import path from "node:path";

export function projectSuggesterStateDir(cwd: string): string | undefined {
	const normalized = path.resolve(cwd);
	if (normalized === path.parse(normalized).root) return undefined;
	return path.join(normalized, ".pi", "suggester");
}
