import { Key, matchesKey } from "@mariozechner/pi-tui";
export const DEFAULT_GHOST_ACCEPT_KEYS = ["space"];
function isGhostAcceptKey(value) {
    return value === "space" || value === "right";
}
export function normalizeGhostAcceptKeys(ghostAcceptKeys) {
    const normalized = (ghostAcceptKeys ?? DEFAULT_GHOST_ACCEPT_KEYS).filter((entry) => isGhostAcceptKey(entry));
    return normalized.length > 0 ? [...new Set(normalized)] : [...DEFAULT_GHOST_ACCEPT_KEYS];
}
export function matchesGhostAcceptKey(data, ghostAcceptKeys) {
    return normalizeGhostAcceptKeys(ghostAcceptKeys).some((key) => {
        if (key === "space")
            return matchesKey(data, Key.space);
        return matchesKey(data, Key.right);
    });
}
export function formatGhostAcceptKeys(ghostAcceptKeys) {
    return normalizeGhostAcceptKeys(ghostAcceptKeys)
        .map((key) => key === "space" ? "Space" : "Right")
        .join("/");
}
