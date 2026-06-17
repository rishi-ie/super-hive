import { EventEmitter } from "node:events";
import { workspaces } from "@superset/local-db";
import { track } from "main/lib/analytics";
import { appState } from "main/lib/app-state";
import { localDb } from "main/lib/local-db";
import { HistoryReader, truncateUtf8ToLastBytes } from "../../terminal-history";
import {
	disposeTerminalHostClient,
	getTerminalHostClient,
	type TerminalHostClient,
} from "../../terminal-host/client";
import type { ListSessionsResponse } from "../../terminal-host/types";
import { raceWithAbort, throwIfAborted } from "../abort";
import { buildTerminalEnv, getDefaultShell } from "../env";
import { TerminalKilledError } from "../errors";
import { portManager } from "../port-manager";
import type { CreateSessionParams, SessionResult } from "../types";
import {
	CREATE_OR_ATTACH_CONCURRENCY,
	DEBUG_TERMINAL,
	MAX_KILLED_SESSION_TOMBSTONES,
	MAX_SCROLLBACK_BYTES,
	SESSION_CLEANUP_DELAY_MS,
} from "./constants";
import { HistoryManager } from "./history-manager";
import { PrioritySemaphore } from "./priority-semaphore";
import type { ColdRestoreInfo, SessionInfo } from "./types";

interface PendingCreateOrAttach {
	requestId: string;
	joinPending: boolean;
	abortController: AbortController;
	promise: Promise<SessionResult>;
}

export class DaemonTerminalManager extends EventEmitter {
	private sessions = new Map<string, SessionInfo>();
	private pendingSessions = new Map<string, PendingCreateOrAttach>();
	private killedSessionTombstones = new Map<string, number>();
	private daemonAliveSessionIds = new Set<string>();
	private daemonSessionIdsHydrated = false;
	private coldRestoreInfo = new Map<string, ColdRestoreInfo>();
	private cleanupTimeouts = new Map<string, NodeJS.Timeout>();

	constructor() {
		super();
		console.log("[STUB] DaemonTerminalManager constructed");
	}

	async reconcileOnStartup(): Promise<void> {
		console.log("[STUB] DaemonTerminalManager.reconcileOnStartup()");
	}

	async createOrAttach(params: CreateSessionParams): Promise<SessionResult> {
		console.log("[STUB] DaemonTerminalManager.createOrAttach(...)");
		return {
			isNew: true,
			scrollback: "",
			wasRecovered: false,
			snapshot: {
				snapshotAnsi: "",
				rehydrateSequences: "",
				cwd: null,
				modes: {},
				cols: 80,
				rows: 24,
				scrollbackLines: 0,
			},
		};
	}

	cancelCreateOrAttach(params: { paneId: string; requestId: string }): void {
		console.log("[STUB] DaemonTerminalManager.cancelCreateOrAttach(...)");
	}

	async listDaemonSessions(): Promise<ListSessionsResponse> {
		console.log("[STUB] DaemonTerminalManager.listDaemonSessions()");
		return { sessions: [] };
	}

	write(params: { paneId: string; data: string }): void {
		console.log(`[STUB] DaemonTerminalManager.write(${params.paneId}, ...)`);
	}

	ackColdRestore(paneId: string): void {
		console.log(`[STUB] DaemonTerminalManager.ackColdRestore(${paneId})`);
	}

	resize(params: { paneId: string; cols: number; rows: number }): void {
		console.log(`[STUB] DaemonTerminalManager.resize(${params.paneId}, ${params.cols}, ${params.rows})`);
	}

	signal(params: { paneId: string; signal?: string }): void {
		console.log(`[STUB] DaemonTerminalManager.signal(${params.paneId}, ${params.signal})`);
	}

	async kill(params: { paneId: string; deleteHistory?: boolean }): Promise<void> {
		console.log(`[STUB] DaemonTerminalManager.kill(${params.paneId}, ${params.deleteHistory})`);
	}

	detach(params: { paneId: string }): void {
		console.log(`[STUB] DaemonTerminalManager.detach(${params.paneId})`);
	}

	async clearScrollback(params: { paneId: string }): Promise<void> {
		console.log(`[STUB] DaemonTerminalManager.clearScrollback(${params.paneId})`);
	}

	async resetHistoryPersistence(): Promise<void> {
		console.log("[STUB] DaemonTerminalManager.resetHistoryPersistence()");
	}

	getSession(paneId: string): { isAlive: boolean; cwd: string; lastActive: number } | null {
		console.log(`[STUB] DaemonTerminalManager.getSession(${paneId})`);
		return null;
	}

	async killByWorkspaceId(workspaceId: string): Promise<{ killed: number; failed: number }> {
		console.log(`[STUB] DaemonTerminalManager.killByWorkspaceId(${workspaceId})`);
		return { killed: 0, failed: 0 };
	}

	async getSessionCountByWorkspaceId(workspaceId: string): Promise<number> {
		console.log(`[STUB] DaemonTerminalManager.getSessionCountByWorkspaceId(${workspaceId})`);
		return 0;
	}

	refreshPromptsForWorkspace(workspaceId: string): void {
		console.log(`[STUB] DaemonTerminalManager.refreshPromptsForWorkspace(${workspaceId})`);
	}

	detachAllListeners(): void {
		console.log("[STUB] DaemonTerminalManager.detachAllListeners()");
	}

	async cleanup(): Promise<void> {
		console.log("[STUB] DaemonTerminalManager.cleanup()");
	}

	async forceKillAll(): Promise<void> {
		console.log("[STUB] DaemonTerminalManager.forceKillAll()");
	}

	reset(): void {
		console.log("[STUB] DaemonTerminalManager.reset()");
	}

	private recordKilledSession(paneId: string): void {}
	private isSessionKilled(paneId: string): boolean { return false; }
	private clearKilledSession(paneId: string): void {}
	private initializeClient(): void {}
	private async listExistingDaemonSessions(): Promise<ListSessionsResponse> { return { sessions: [] }; }
	private async ensureDaemonSessionIdsHydrated(): Promise<void> {}
	private setupClientEventHandlers(): void {}
	private async doCreateOrAttach(params: CreateSessionParams, signal: AbortSignal): Promise<SessionResult> {
		return {
			isNew: true,
			scrollback: "",
			wasRecovered: false,
			snapshot: {
				snapshotAnsi: "",
				rehydrateSequences: "",
				cwd: null,
				modes: {},
				cols: 80,
				rows: 24,
				scrollbackLines: 0,
			},
		};
	}
	private async attemptColdRestore(params: { paneId: string; workspaceId: string; cols: number; rows: number }): Promise<SessionResult | null> { return null; }
	private getCreateOrAttachPriority(params: CreateSessionParams): number { return 1; }
	private cancelPendingCleanup(paneId: string): void {}
	private abortPendingSessions(): void {}
}
