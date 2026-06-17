/**
 * Notification Manager - STUB IMPLEMENTATION
 *
 * This is a stub that does nothing for all operations.
 */

import type {
	AgentLifecycleEvent,
	NotificationIds,
} from "shared/notification-types";

export interface NativeNotification {
	show(): void;
	close(): void;
	on(event: "click", handler: () => void): void;
	on(event: "close", handler: () => void): void;
}

export interface NotificationManagerDeps {
	isSupported: () => boolean;
	createNotification: (opts: {
		title: string;
		body: string;
		silent: boolean;
	}) => NativeNotification;
	playSound: () => void;
	onNotificationClick: (ids: NotificationIds) => void;
	getVisibilityContext: () => {
		isFocused: boolean;
		currentWorkspaceId: string | null;
		tabsState:
			| {
					activeTabIds?: Record<string, string | null>;
					focusedPaneIds?: Record<string, string>;
			  }
			| undefined;
	};
	getWorkspaceName: (workspaceId: string | undefined) => string;
	getNotificationTitle: (event: AgentLifecycleEvent) => string;
}

interface TrackedEntry {
	notification: NativeNotification;
	createdAt: number;
}

export class NotificationManager {
	private active = new Map<string, TrackedEntry>();
	private counter = 0;
	private sweepTimer: ReturnType<typeof setInterval> | null = null;

	constructor(private _deps: NotificationManagerDeps) {}

	start(): void {
		console.log("[STUB] NotificationManager.start");
	}

	handleAgentLifecycle(_event: AgentLifecycleEvent): void {
		console.log("[STUB] NotificationManager.handleAgentLifecycle");
	}

	get activeCount(): number {
		console.log("[STUB] NotificationManager.activeCount");
		return 0;
	}

	dispose(): void {
		console.log("[STUB] NotificationManager.dispose");
	}
}
