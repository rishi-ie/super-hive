import { z } from "zod";
import { publicProcedure, router } from "../..";
import { stubLog } from "../../stub-data";

const fileViewerStateSchema = z.object({
	filePath: z.string(),
	viewMode: z.enum(["rendered", "raw", "diff"]),
	isPinned: z.boolean(),
	diffLayout: z.enum(["inline", "side-by-side"]),
	diffCategory: z
		.enum(["against-base", "committed", "staged", "unstaged"])
		.optional(),
	commitHash: z.string().optional(),
	oldPath: z.string().optional(),
});

const chatLaunchConfigSchema = z.object({
	initialPrompt: z.string().optional(),
	metadata: z
		.object({
			model: z.string().optional(),
		})
		.optional(),
	retryCount: z.number().int().min(0).optional(),
});

const paneSchema = z.object({
	id: z.string(),
	tabId: z.string(),
	type: z.enum(["terminal", "webview", "file-viewer", "chat", "devtools"]),
	name: z.string(),
	isNew: z.boolean().optional(),
	status: z.enum(["idle", "working", "permission", "review"]).optional(),
	initialCwd: z.string().optional(),
	url: z.string().optional(),
	cwd: z.string().nullable().optional(),
	cwdConfirmed: z.boolean().optional(),
	fileViewer: fileViewerStateSchema.optional(),
	chat: z
		.object({
			sessionId: z.string().nullable(),
			launchConfig: chatLaunchConfigSchema.nullable().optional(),
		})
		.optional(),
	browser: z
		.object({
			currentUrl: z.string(),
			history: z.array(
				z.object({
					url: z.string(),
					title: z.string(),
					timestamp: z.number(),
					faviconUrl: z.string().optional(),
				}),
			),
			historyIndex: z.number(),
			isLoading: z.boolean(),
			viewport: z
				.object({
					name: z.string(),
					width: z.number(),
					height: z.number(),
				})
				.nullable()
				.optional(),
		})
		.optional(),
	devtools: z
		.object({
			targetPaneId: z.string(),
		})
		.optional(),
	workspaceRun: z
		.object({
			workspaceId: z.string(),
			state: z.enum(["running", "stopped-by-user", "stopped-by-exit"]),
		})
		.optional(),
});

type MosaicNode =
	| string
	| {
			direction: "row" | "column";
			first: MosaicNode;
			second: MosaicNode;
			splitPercentage?: number;
	  };
const mosaicNodeSchema: z.ZodType<MosaicNode> = z.lazy(() =>
	z.union([
		z.string(),
		z.object({
			direction: z.enum(["row", "column"]),
			first: mosaicNodeSchema,
			second: mosaicNodeSchema,
			splitPercentage: z.number().optional(),
		}),
	]),
);

const tabSchema = z.object({
	id: z.string(),
	name: z.string(),
	userTitle: z.string().optional(),
	workspaceId: z.string(),
	createdAt: z.number(),
	layout: mosaicNodeSchema,
});

const tabsStateSchema = z.object({
	tabs: z.array(tabSchema),
	panes: z.record(z.string(), paneSchema),
	activeTabIds: z.record(z.string(), z.string().nullable()),
	focusedPaneIds: z.record(z.string(), z.string()),
	tabHistoryStacks: z.record(z.string(), z.array(z.string())),
});

const uiColorsSchema = z.object({
	background: z.string(),
	foreground: z.string(),
	card: z.string(),
	cardForeground: z.string(),
	popover: z.string(),
	popoverForeground: z.string(),
	primary: z.string(),
	primaryForeground: z.string(),
	secondary: z.string(),
	secondaryForeground: z.string(),
	muted: z.string(),
	mutedForeground: z.string(),
	accent: z.string(),
	accentForeground: z.string(),
	tertiary: z.string(),
	tertiaryActive: z.string(),
	destructive: z.string(),
	destructiveForeground: z.string(),
	border: z.string(),
	input: z.string(),
	ring: z.string(),
	sidebar: z.string(),
	sidebarForeground: z.string(),
	sidebarPrimary: z.string(),
	sidebarPrimaryForeground: z.string(),
	sidebarAccent: z.string(),
	sidebarAccentForeground: z.string(),
	sidebarBorder: z.string(),
	sidebarRing: z.string(),
	chart1: z.string(),
	chart2: z.string(),
	chart3: z.string(),
	chart4: z.string(),
	chart5: z.string(),
	highlightMatch: z.string(),
	highlightActive: z.string(),
	highlight: z.string().optional(),
	highlightForeground: z.string().optional(),
});

const terminalColorsSchema = z.object({
	background: z.string(),
	foreground: z.string(),
	cursor: z.string(),
	cursorAccent: z.string().optional(),
	selectionBackground: z.string().optional(),
	selectionForeground: z.string().optional(),
	black: z.string(),
	red: z.string(),
	green: z.string(),
	yellow: z.string(),
	blue: z.string(),
	magenta: z.string(),
	cyan: z.string(),
	white: z.string(),
	brightBlack: z.string(),
	brightRed: z.string(),
	brightGreen: z.string(),
	brightYellow: z.string(),
	brightBlue: z.string(),
	brightMagenta: z.string(),
	brightCyan: z.string(),
	brightWhite: z.string(),
});

const themeSchema = z.object({
	id: z.string(),
	name: z.string(),
	author: z.string().optional(),
	version: z.string().optional(),
	description: z.string().optional(),
	type: z.enum(["dark", "light"]),
	ui: uiColorsSchema,
	terminal: terminalColorsSchema,
	isBuiltIn: z.boolean().optional(),
	isCustom: z.boolean().optional(),
});

const themeStateSchema = z.object({
	activeThemeId: z.string(),
	customThemes: z.array(themeSchema),
	systemLightThemeId: z.string().optional(),
	systemDarkThemeId: z.string().optional(),
});

const stubTheme = {
	id: "stub-theme",
	name: "Stub Theme",
	type: "dark" as const,
	ui: {
		background: "#000000",
		foreground: "#ffffff",
		card: "#1a1a1a",
		cardForeground: "#ffffff",
		popover: "#1a1a1a",
		popoverForeground: "#ffffff",
		primary: "#007aff",
		primaryForeground: "#ffffff",
		secondary: "#2a2a2a",
		secondaryForeground: "#ffffff",
		muted: "#2a2a2a",
		mutedForeground: "#888888",
		accent: "#007aff",
		accentForeground: "#ffffff",
		tertiary: "#3a3a3a",
		tertiaryActive: "#4a4a4a",
		destructive: "#ff3b30",
		destructiveForeground: "#ffffff",
		border: "#3a3a3a",
		input: "#2a2a2a",
		ring: "#007aff",
		sidebar: "#000000",
		sidebarForeground: "#ffffff",
		sidebarPrimary: "#007aff",
		sidebarPrimaryForeground: "#ffffff",
		sidebarAccent: "#2a2a2a",
		sidebarAccentForeground: "#ffffff",
		sidebarBorder: "#3a3a3a",
		sidebarRing: "#007aff",
		chart1: "#007aff",
		chart2: "#34c759",
		chart3: "#ff9500",
		chart4: "#ff3b30",
		chart5: "#5856d6",
		highlightMatch: "#007aff",
		highlightActive: "#007aff",
	},
	terminal: {
		background: "#000000",
		foreground: "#ffffff",
		cursor: "#ffffff",
		black: "#000000",
		red: "#ff3b30",
		green: "#34c759",
		yellow: "#ff9500",
		blue: "#007aff",
		magenta: "#af52de",
		cyan: "#5ac8fa",
		white: "#ffffff",
		brightBlack: "#666666",
		brightRed: "#ff6961",
		brightGreen: "#a8e063",
		brightYellow: "#ffd93d",
		brightBlue: "#6eb5ff",
		brightMagenta: "#de5ce6",
		brightCyan: "#9aeeef",
		brightWhite: "#ffffff",
	},
};

export const createUiStateRouter = () => {
	return router({
		tabs: router({
			get: publicProcedure.query(() => {
				stubLog("ui-state", "tabs.get");
				return null;
			}),

			set: publicProcedure
				.input(tabsStateSchema)
				.mutation(({ input }) => {
					stubLog("ui-state", "tabs.set", input);
					return { success: true };
				}),
		}),

		theme: router({
			get: publicProcedure.query(() => {
				stubLog("ui-state", "theme.get");
				return {
					activeThemeId: stubTheme.id,
					customThemes: [],
					systemLightThemeId: undefined,
					systemDarkThemeId: undefined,
				};
			}),

			set: publicProcedure
				.input(themeStateSchema)
				.mutation(({ input }) => {
					stubLog("ui-state", "theme.set", input);
					return { success: true };
				}),
		}),

		hotkeys: router({
			get: publicProcedure.query(() => {
				stubLog("ui-state", "hotkeys.get");
				return null;
			}),
		}),
	});
};
