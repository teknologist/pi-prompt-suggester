import type { ExtensionAPI } from "@mariozechner/pi-coding-agent";
import { createAppComposition } from "./composition/root.js";

/**
 * pi-autoprompter
 *
 * Architecture scaffold only.
 *
 * Implementations for orchestration/services/adapters are intentionally pending.
 */
export default function autoprompter(pi: ExtensionAPI) {
	pi.on("session_start", async (_event, ctx) => {
		try {
			await createAppComposition();
			ctx.ui.notify("pi-autoprompter architecture scaffold loaded", "info");
		} catch (error) {
			ctx.ui.notify(`pi-autoprompter scaffold failed to initialize: ${String(error)}`, "error");
		}
	});

	pi.registerCommand("autoprompter", {
		description: "autoprompter controls (architecture scaffold)",
		handler: async (_args, ctx) => {
			ctx.ui.notify("Architecture scaffold is in place. Implementations are not wired yet.", "info");
		},
	});
}
