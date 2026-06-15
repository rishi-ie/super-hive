import { toast } from "@superset/ui/sonner";
import { track } from "renderer/lib/analytics";
import type { Command, CommandContext } from "./types";

const STUB_SECTIONS = new Set(["actions", "settings", "workspace", "openIn"]);

export async function executeCommand(
	command: Command,
	context: CommandContext,
): Promise<void> {
	track("command_run", { commandId: command.id, section: command.section });
	if (!command.run) return;
	if (STUB_SECTIONS.has(command.section ?? "")) {
		toast.info(`[stub] ${command.title}`);
		return;
	}
	try {
		await command.run(context);
	} catch (error) {
		const message = error instanceof Error ? error.message : String(error);
		toast.error(`Command "${command.title}" failed: ${message}`);
	}
}
