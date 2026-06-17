import { EventEmitter } from "node:events";
import { clipboard, Menu, webContents } from "electron";
import { safeOpenExternal } from "main/lib/safe-url";

interface ConsoleEntry {
	level: "log" | "warn" | "error" | "info" | "debug";
	message: string;
	timestamp: number;
}

const MAX_CONSOLE_ENTRIES = 500;

function sanitizeUrl(url: string): string {
	if (/^https?:\/\//i.test(url) || url.startsWith("about:")) {
		return url;
	}
	if (url.startsWith("localhost") || url.startsWith("127.0.0.1")) {
		return `http://${url}`;
	}
	if (url.includes(".")) {
		return `https://${url}`;
	}
	return `https://www.google.com/search?q=${encodeURIComponent(url)}`;
}

class BrowserManager extends EventEmitter {
	private paneWebContentsIds = new Map<string, number>();
	private consoleLogs = new Map<string, ConsoleEntry[]>();
	private consoleListeners = new Map<string, () => void>();
	private contextMenuListeners = new Map<string, () => void>();
	private beforeInputListeners = new Map<string, () => void>();

	register(paneId: string, webContentsId: number): void {
		console.log(`[STUB] BrowserManager.register(${paneId}, ${webContentsId})`);
		this.paneWebContentsIds.set(paneId, webContentsId);
	}

	unregister(paneId: string): void {
		console.log(`[STUB] BrowserManager.unregister(${paneId})`);
		this.paneWebContentsIds.delete(paneId);
		this.consoleLogs.delete(paneId);
	}

	unregisterAll(): void {
		console.log("[STUB] BrowserManager.unregisterAll()");
		this.paneWebContentsIds.clear();
		this.consoleLogs.clear();
	}

	getWebContents(paneId: string): Electron.WebContents | null {
		console.log(`[STUB] BrowserManager.getWebContents(${paneId})`);
		return null;
	}

	navigate(paneId: string, url: string): void {
		console.log(`[STUB] BrowserManager.navigate(${paneId}, ${url})`);
	}

	async screenshot(paneId: string): Promise<string> {
		console.log(`[STUB] BrowserManager.screenshot(${paneId})`);
		return "";
	}

	async evaluateJS(paneId: string, code: string): Promise<unknown> {
		console.log(`[STUB] BrowserManager.evaluateJS(${paneId}, ...)`);
		return undefined;
	}

	getConsoleLogs(paneId: string): ConsoleEntry[] {
		console.log(`[STUB] BrowserManager.getConsoleLogs(${paneId})`);
		return [];
	}

	openDevTools(paneId: string): void {
		console.log(`[STUB] BrowserManager.openDevTools(${paneId})`);
	}

	private setupContextMenu(paneId: string, wc: Electron.WebContents): void {}
	private setupBeforeInput(paneId: string, wc: Electron.WebContents): void {}
	private setupConsoleCapture(paneId: string, wc: Electron.WebContents): void {}
}

export const browserManager = new BrowserManager();
