import path from "node:path";
export function projectSuggesterStateDir(cwd) {
    const normalized = path.resolve(cwd);
    if (normalized === path.parse(normalized).root)
        return undefined;
    return path.join(normalized, ".pi", "suggester");
}
