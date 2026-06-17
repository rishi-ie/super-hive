import { getTerminalHostClient } from "main/lib/terminal-host/client";
import type { ListSessionsResponse } from "main/lib/terminal-host/types";
import { DaemonTerminalManager, getDaemonTerminalManager } from "./daemon";
import { prewarmTerminalEnv } from "./env";

export { DaemonTerminalManager, getDaemonTerminalManager };
export type {
	CreateSessionParams,
	SessionResult,
	TerminalDataEvent,
	TerminalEvent,
	TerminalExitEvent,
} from "./types";

const DEBUG_TERMINAL = process.env.SUPERSET_TERMINAL_DEBUG === "1";
let prewarmInFlight: Promise<void> | null = null;

export async function reconcileDaemonSessions(): Promise<void> {
	console.log("[STUB] reconcileDaemonSessions");
	return Promise.resolve();
}

export async function restartDaemon(): Promise<{ success: boolean }> {
	console.log("[STUB] restartDaemon");
	return { success: true };
}

export async function tryListExistingDaemonSessions(): Promise<{
	sessions: ListSessionsResponse["sessions"];
}> {
	console.log("[STUB] tryListExistingDaemonSessions");
	return { sessions: [] };
}

export function prewarmTerminalRuntime(): void {
	console.log("[STUB] prewarmTerminalRuntime");
}
