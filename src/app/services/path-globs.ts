function globToRegExp(glob: string): RegExp {
	const escaped = glob
		.replace(/[.+^${}()|[\]\\]/g, "\\$&")
		.replace(/\*\*/g, "::DOUBLE_STAR::")
		.replace(/\*/g, "[^/]*")
		.replace(/::DOUBLE_STAR::/g, ".*");
	return new RegExp(`^${escaped}$`);
}

export function matchesAnyGlob(filePath: string, globs: string[]): boolean {
	return globs.some((glob) => globToRegExp(glob).test(filePath));
}
