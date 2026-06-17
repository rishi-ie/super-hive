/**
 * Workspace Init Manager - STUB IMPLEMENTATION
 *
 * This is a stub that returns dummy data for all operations.
 */

import { EventEmitter } from "node:events";
import type {
	WorkspaceInitProgress,
	WorkspaceInitStep,
} from "shared/types/workspace-init";

const STUB_PROGRESS: WorkspaceInitProgress = {
	workspaceId: "stub-workspace-id",
	projectId: "stub-project-id",
	step: "ready",
	message: "Stubbed",
};

class WorkspaceInitManager extends EventEmitter {
	isInitializing(_workspaceId: string): boolean {
		console.log("[STUB] WorkspaceInitManager.isInitializing");
		return false;
	}

	hasFailed(_workspaceId: string): boolean {
		console.log("[STUB] WorkspaceInitManager.hasFailed");
		return false;
	}

	getProgress(_workspaceId: string): WorkspaceInitProgress | undefined {
		console.log("[STUB] WorkspaceInitManager.getProgress");
		return STUB_PROGRESS;
	}

	getAllProgress(): WorkspaceInitProgress[] {
		console.log("[STUB] WorkspaceInitManager.getAllProgress");
		return [STUB_PROGRESS];
	}

	startJob(_workspaceId: string, _projectId: string): void {
		console.log("[STUB] WorkspaceInitManager.startJob");
	}

	updateProgress(
		_workspaceId: string,
		_step: WorkspaceInitStep,
		_message: string,
		_error?: string,
		_warning?: string,
	): void {
		console.log("[STUB] WorkspaceInitManager.updateProgress");
	}

	markWorktreeCreated(_workspaceId: string): void {
		console.log("[STUB] WorkspaceInitManager.markWorktreeCreated");
	}

	wasWorktreeCreated(_workspaceId: string): boolean {
		console.log("[STUB] WorkspaceInitManager.wasWorktreeCreated");
		return false;
	}

	cancel(_workspaceId: string): void {
		console.log("[STUB] WorkspaceInitManager.cancel");
	}

	isCancelled(_workspaceId: string): boolean {
		console.log("[STUB] WorkspaceInitManager.isCancelled");
		return false;
	}

	isCancellationRequested(_workspaceId: string): boolean {
		console.log("[STUB] WorkspaceInitManager.isCancellationRequested");
		return false;
	}

	clearJob(_workspaceId: string): void {
		console.log("[STUB] WorkspaceInitManager.clearJob");
	}

	finalizeJob(_workspaceId: string): void {
		console.log("[STUB] WorkspaceInitManager.finalizeJob");
	}

	async waitForInit(_workspaceId: string, _timeoutMs = 30000): Promise<void> {
		console.log("[STUB] WorkspaceInitManager.waitForInit");
		return;
	}

	async acquireProjectLock(_projectId: string): Promise<void> {
		console.log("[STUB] WorkspaceInitManager.acquireProjectLock");
		return;
	}

	releaseProjectLock(_projectId: string): void {
		console.log("[STUB] WorkspaceInitManager.releaseProjectLock");
	}

	hasProjectLock(_projectId: string): boolean {
		console.log("[STUB] WorkspaceInitManager.hasProjectLock");
		return false;
	}
}

export const workspaceInitManager = new WorkspaceInitManager();
