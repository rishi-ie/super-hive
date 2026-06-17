/**
 * Local Workspace Runtime - STUB IMPLEMENTATION
 *
 * This is a stub that returns dummy data for all terminal operations.
 */

import { EventEmitter } from "node:events";
import type {
	TerminalCapabilities,
	TerminalManagement,
	TerminalRuntime,
	WorkspaceRuntime,
	WorkspaceRuntimeId,
} from "./types";
import type { ListSessionsResponse } from "../terminal-host/types";

const STUB_CAPABILITIES: TerminalCapabilities = {
	persistent: true,
	coldRestore: true,
};

const STUB_MANAGEMENT: TerminalManagement = {
	listSessions: async () => {
		console.log("[STUB] LocalTerminalRuntime.listSessions");
		return { sessions: [] };
	},
	killAllSessions: async () => {
		console.log("[STUB] LocalTerminalRuntime.killAllSessions");
	},
	resetHistoryPersistence: async () => {
		console.log("[STUB] LocalTerminalRuntime.resetHistoryPersistence");
	},
};

class StubTerminalRuntime
	extends EventEmitter
	implements TerminalRuntime
{
	readonly management: TerminalManagement = STUB_MANAGEMENT;
	readonly capabilities: TerminalCapabilities = STUB_CAPABILITIES;

	createOrAttach = async () => {
		console.log("[STUB] LocalTerminalRuntime.createOrAttach");
		return {
			isNew: true,
			scrollback: "",
			wasRecovered: false,
		};
	};

	cancelCreateOrAttach = (_params: { paneId: string; requestId: string }) => {
		console.log("[STUB] LocalTerminalRuntime.cancelCreateOrAttach");
	};

	write = (_params: { paneId: string; data: string }) => {
		console.log("[STUB] LocalTerminalRuntime.write");
	};

	resize = (_params: { paneId: string; cols: number; rows: number }) => {
		console.log("[STUB] LocalTerminalRuntime.resize");
	};

	signal = (_params: { paneId: string; signal?: string }) => {
		console.log("[STUB] LocalTerminalRuntime.signal");
	};

	kill = async (_params: { paneId: string }) => {
		console.log("[STUB] LocalTerminalRuntime.kill");
	};

	detach = (_params: { paneId: string }) => {
		console.log("[STUB] LocalTerminalRuntime.detach");
	};

	clearScrollback = (_params: { paneId: string }) => {
		console.log("[STUB] LocalTerminalRuntime.clearScrollback");
	};

	ackColdRestore = (_paneId: string) => {
		console.log("[STUB] LocalTerminalRuntime.ackColdRestore");
	};

	getSession = (_paneId: string) => {
		console.log("[STUB] LocalTerminalRuntime.getSession");
		return { isAlive: true, cwd: "/stub", lastActive: Date.now() };
	};

	killByWorkspaceId = async (_workspaceId: string) => {
		console.log("[STUB] LocalTerminalRuntime.killByWorkspaceId");
		return { killed: 0, failed: 0 };
	};

	getSessionCountByWorkspaceId = async (_workspaceId: string) => {
		console.log("[STUB] LocalTerminalRuntime.getSessionCountByWorkspaceId");
		return 0;
	};

	refreshPromptsForWorkspace = (_workspaceId: string) => {
		console.log("[STUB] LocalTerminalRuntime.refreshPromptsForWorkspace");
	};

	cleanup = async () => {
		console.log("[STUB] LocalTerminalRuntime.cleanup");
	};

	detachAllListeners(): void {
		console.log("[STUB] LocalTerminalRuntime.detachAllListeners");
	}
}

export class LocalWorkspaceRuntime implements WorkspaceRuntime {
	readonly id: WorkspaceRuntimeId;
	readonly terminal: TerminalRuntime;
	readonly capabilities: WorkspaceRuntime["capabilities"];

	constructor() {
		this.id = "local";
		this.terminal = new StubTerminalRuntime();
		this.capabilities = {
			terminal: STUB_CAPABILITIES,
		};
	}
}
