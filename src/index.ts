import type { ExtensionAPI } from "@mariozechner/pi-coding-agent";

/**
 * pi-autoprompter (MVP scaffold)
 *
 * Planned behavior:
 * - Load or compute intent seed
 * - After each assistant turn, generate next-prompt suggestion
 * - Surface suggestion in editor as prefill (later: ghost + tab accept)
 */
export default function autoprompter(pi: ExtensionAPI) {
	pi.on("session_start", async (_event, ctx) => {
		ctx.ui.notify("pi-autoprompter loaded (scaffold)", "info");
	});

	pi.registerCommand("autoprompter", {
		description: "autoprompter controls (scaffold)",
		handler: async (_args, ctx) => {
			ctx.ui.notify("autoprompter scaffold ready. Next: seeding + suggestion pipeline.", "info");
		},
	});
}
