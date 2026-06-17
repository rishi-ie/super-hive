import {
	type AgentCustomDefinition,
	type AgentPresetOverrideEnvelope,
	BRANCH_PREFIX_MODES,
	EXECUTION_MODES,
	EXTERNAL_APPS,
	FILE_OPEN_MODES,
	NON_EDITOR_APPS,
	TERMINAL_LINK_BEHAVIORS,
	type TerminalPreset,
} from "@superset/local-db";
import {
	AGENT_PRESET_COMMANDS,
	AGENT_PRESET_DESCRIPTIONS,
	DEFAULT_TERMINAL_PRESET_AGENT_TYPES,
} from "@superset/shared/agent-command";
import { z } from "zod";
import { publicProcedure, router } from "../..";
import { STUB_SETTINGS, stubLog } from "../../stub-data";

export const createSettingsRouter = () => {
	return router({
		getTerminalPresets: publicProcedure.query(() => {
			stubLog("settings", "getTerminalPresets");
			return STUB_SETTINGS.terminalPresets;
		}),
		getAgentPresets: publicProcedure.query(() => {
			stubLog("settings", "getAgentPresets");
			return STUB_SETTINGS.agentPresets;
		}),
		createCustomAgent: publicProcedure
			.input(
				z.object({
					name: z.string(),
					description: z.string().optional(),
					cwd: z.string(),
					commands: z.array(z.string()),
					kind: z.enum(["terminal"]).optional(),
				}),
			)
			.mutation(({ input }) => {
				stubLog("settings", "createCustomAgent", input);
				return { success: true };
			}),
		updateCustomAgent: publicProcedure
			.input(
				z.object({
					id: z.string(),
					patch: z.object({
						name: z.string().optional(),
						description: z.string().optional(),
						cwd: z.string().optional(),
						commands: z.array(z.string()).optional(),
						kind: z.enum(["terminal"]).optional(),
					}),
				}),
			)
			.mutation(({ input }) => {
				stubLog("settings", "updateCustomAgent", input);
				return { success: true };
			}),
		deleteCustomAgent: publicProcedure
			.input(z.object({ id: z.string().regex(/^custom:/) }))
			.mutation(({ input }) => {
				stubLog("settings", "deleteCustomAgent", input);
				return { success: true };
			}),
		updateAgentPreset: publicProcedure
			.input(
				z.object({
					id: z.string(),
					patch: z.object({
						name: z.string().optional(),
						description: z.string().optional(),
						cwd: z.string().optional(),
						commands: z.array(z.string()).optional(),
						projectIds: z.array(z.string()).nullable().optional(),
						pinnedToBar: z.boolean().optional(),
						useAsWorkspaceRun: z.boolean().optional(),
						executionMode: z.enum(EXECUTION_MODES).optional(),
					}),
				}),
			)
			.mutation(({ input }) => {
				stubLog("settings", "updateAgentPreset", input);
				return { success: true };
			}),
		resetAgentPreset: publicProcedure
			.input(z.object({ id: z.string().min(1) }))
			.mutation(({ input }) => {
				stubLog("settings", "resetAgentPreset", input);
				return { success: true };
			}),
		resetAllAgentPresets: publicProcedure.mutation(() => {
			stubLog("settings", "resetAllAgentPresets");
			return { success: true };
		}),
		createTerminalPreset: publicProcedure
			.input(
				z.object({
					name: z.string(),
					description: z.string().optional(),
					cwd: z.string(),
					commands: z.array(z.string()),
					projectIds: z.array(z.string()).nullable().optional(),
					pinnedToBar: z.boolean().optional(),
					useAsWorkspaceRun: z.boolean().optional(),
					executionMode: z.enum(EXECUTION_MODES).optional(),
				}),
			)
			.mutation(({ input }) => {
				stubLog("settings", "createTerminalPreset", input);
				return { success: true };
			}),

		updateTerminalPreset: publicProcedure
			.input(
				z.object({
					id: z.string(),
					patch: z.object({
						name: z.string().optional(),
						description: z.string().optional(),
						cwd: z.string().optional(),
						commands: z.array(z.string()).optional(),
						projectIds: z.array(z.string()).nullable().optional(),
						pinnedToBar: z.boolean().optional(),
						useAsWorkspaceRun: z.boolean().optional(),
						executionMode: z.enum(EXECUTION_MODES).optional(),
					}),
				}),
			)
			.mutation(({ input }) => {
				stubLog("settings", "updateTerminalPreset", input);
				return { success: true };
			}),

		deleteTerminalPreset: publicProcedure
			.input(z.object({ id: z.string() }))
			.mutation(({ input }) => {
				stubLog("settings", "deleteTerminalPreset", input);
				return { success: true };
			}),

		setPresetAutoApply: publicProcedure
			.input(
				z.object({
					id: z.string(),
					field: z.enum(["applyOnWorkspaceCreated", "applyOnNewTab"]),
					enabled: z.boolean(),
				}),
			)
			.mutation(({ input }) => {
				stubLog("settings", "setPresetAutoApply", input);
				return { success: true };
			}),

		reorderTerminalPresets: publicProcedure
			.input(
				z.object({
					presetId: z.string(),
					targetIndex: z.number().int().min(0),
				}),
			)
			.mutation(({ input }) => {
				stubLog("settings", "reorderTerminalPresets", input);
				return { success: true };
			}),

		getWorkspaceCreationPresets: publicProcedure
			.input(
				z
					.object({
						projectId: z.string().nullable().optional(),
					})
					.optional(),
			)
			.query(({ input }) => {
				stubLog("settings", "getWorkspaceCreationPresets", input);
				return STUB_SETTINGS.terminalPresets;
			}),

		getNewTabPresets: publicProcedure
			.input(
				z
					.object({
						projectId: z.string().nullable().optional(),
					})
					.optional(),
			)
			.query(({ input }) => {
				stubLog("settings", "getNewTabPresets", input);
				return STUB_SETTINGS.terminalPresets;
			}),

		getSelectedRingtoneId: publicProcedure.query(() => {
			stubLog("settings", "getSelectedRingtoneId");
			return "default";
		}),

		setSelectedRingtoneId: publicProcedure
			.input(z.object({ ringtoneId: z.string() }))
			.mutation(({ input }) => {
				stubLog("settings", "setSelectedRingtoneId", input);
				return { success: true };
			}),

		getConfirmOnQuit: publicProcedure.query(() => {
			stubLog("settings", "getConfirmOnQuit");
			return STUB_SETTINGS.confirmOnQuit;
		}),

		setConfirmOnQuit: publicProcedure
			.input(z.object({ enabled: z.boolean() }))
			.mutation(({ input }) => {
				stubLog("settings", "setConfirmOnQuit", input);
				return { success: true };
			}),

		getExposeHostServiceViaRelay: publicProcedure.query(() => {
			stubLog("settings", "getExposeHostServiceViaRelay");
			return STUB_SETTINGS.exposeHostServiceViaRelay;
		}),

		setExposeHostServiceViaRelay: publicProcedure
			.input(z.object({ enabled: z.boolean() }))
			.mutation(({ input }) => {
				stubLog("settings", "setExposeHostServiceViaRelay", input);
				return { success: true };
			}),

		getShowPresetsBar: publicProcedure.query(() => {
			stubLog("settings", "getShowPresetsBar");
			return STUB_SETTINGS.showPresetsBar;
		}),

		setShowPresetsBar: publicProcedure
			.input(z.object({ enabled: z.boolean() }))
			.mutation(({ input }) => {
				stubLog("settings", "setShowPresetsBar", input);
				return { success: true };
			}),

		getUseCompactTerminalAddButton: publicProcedure.query(() => {
			stubLog("settings", "getUseCompactTerminalAddButton");
			return STUB_SETTINGS.useCompactTerminalAddButton;
		}),

		setUseCompactTerminalAddButton: publicProcedure
			.input(z.object({ enabled: z.boolean() }))
			.mutation(({ input }) => {
				stubLog("settings", "setUseCompactTerminalAddButton", input);
				return { success: true };
			}),

		getTerminalLinkBehavior: publicProcedure.query(() => {
			stubLog("settings", "getTerminalLinkBehavior");
			return STUB_SETTINGS.terminalLinkBehavior;
		}),

		setTerminalLinkBehavior: publicProcedure
			.input(z.object({ behavior: z.enum(TERMINAL_LINK_BEHAVIORS) }))
			.mutation(({ input }) => {
				stubLog("settings", "setTerminalLinkBehavior", input);
				return { success: true };
			}),

		getFileOpenMode: publicProcedure.query(() => {
			stubLog("settings", "getFileOpenMode");
			return STUB_SETTINGS.fileOpenMode;
		}),

		setFileOpenMode: publicProcedure
			.input(z.object({ mode: z.enum(FILE_OPEN_MODES) }))
			.mutation(({ input }) => {
				stubLog("settings", "setFileOpenMode", input);
				return { success: true };
			}),

		getAutoApplyDefaultPreset: publicProcedure.query(() => {
			stubLog("settings", "getAutoApplyDefaultPreset");
			return STUB_SETTINGS.autoApplyDefaultPreset;
		}),

		setAutoApplyDefaultPreset: publicProcedure
			.input(z.object({ enabled: z.boolean() }))
			.mutation(({ input }) => {
				stubLog("settings", "setAutoApplyDefaultPreset", input);
				return { success: true };
			}),

		restartApp: publicProcedure.mutation(() => {
			stubLog("settings", "restartApp");
			return { success: true };
		}),

		getBranchPrefix: publicProcedure.query(() => {
			stubLog("settings", "getBranchPrefix");
			return {
				mode: "none" as const,
				customPrefix: null,
			};
		}),

		setBranchPrefix: publicProcedure
			.input(
				z.object({
					mode: z.enum(BRANCH_PREFIX_MODES),
					customPrefix: z.string().nullable().optional(),
				}),
			)
			.mutation(({ input }) => {
				stubLog("settings", "setBranchPrefix", input);
				return { success: true };
			}),

		getGitInfo: publicProcedure.query(async () => {
			stubLog("settings", "getGitInfo");
			return {
				githubUsername: null,
				authorName: null,
				authorPrefix: null,
			};
		}),

		getDeleteLocalBranch: publicProcedure.query(() => {
			stubLog("settings", "getDeleteLocalBranch");
			return STUB_SETTINGS.deleteLocalBranch;
		}),

		setDeleteLocalBranch: publicProcedure
			.input(z.object({ enabled: z.boolean() }))
			.mutation(({ input }) => {
				stubLog("settings", "setDeleteLocalBranch", input);
				return { success: true };
			}),

		getNotificationSoundsMuted: publicProcedure.query(() => {
			stubLog("settings", "getNotificationSoundsMuted");
			return STUB_SETTINGS.notificationSoundsMuted;
		}),

		setNotificationSoundsMuted: publicProcedure
			.input(z.object({ muted: z.boolean() }))
			.mutation(({ input }) => {
				stubLog("settings", "setNotificationSoundsMuted", input);
				return { success: true };
			}),

		getNotificationVolume: publicProcedure.query(() => {
			stubLog("settings", "getNotificationVolume");
			return STUB_SETTINGS.notificationVolume;
		}),

		setNotificationVolume: publicProcedure
			.input(z.object({ volume: z.number().min(0).max(100) }))
			.mutation(({ input }) => {
				stubLog("settings", "setNotificationVolume", input);
				return { success: true };
			}),

		getFontSettings: publicProcedure.query(() => {
			stubLog("settings", "getFontSettings");
			return STUB_SETTINGS.fontSettings;
		}),

		setFontSettings: publicProcedure
			.input(
				z.object({
					terminalFontFamily: z.string().nullable().optional(),
					terminalFontSize: z.number().nullable().optional(),
					editorFontFamily: z.string().nullable().optional(),
					editorFontSize: z.number().nullable().optional(),
				}),
			)
			.mutation(({ input }) => {
				stubLog("settings", "setFontSettings", input);
				return { success: true };
			}),

		getShowResourceMonitor: publicProcedure.query(() => {
			stubLog("settings", "getShowResourceMonitor");
			return STUB_SETTINGS.showResourceMonitor;
		}),

		setShowResourceMonitor: publicProcedure
			.input(z.object({ enabled: z.boolean() }))
			.mutation(({ input }) => {
				stubLog("settings", "setShowResourceMonitor", input);
				return { success: true };
			}),

		getWorktreeBaseDir: publicProcedure.query(() => {
			stubLog("settings", "getWorktreeBaseDir");
			return STUB_SETTINGS.worktreeBaseDir;
		}),

		setWorktreeBaseDir: publicProcedure
			.input(z.object({ path: z.string().nullable() }))
			.mutation(({ input }) => {
				stubLog("settings", "setWorktreeBaseDir", input);
				return { success: true };
			}),

		getOpenLinksInApp: publicProcedure.query(() => {
			stubLog("settings", "getOpenLinksInApp");
			return STUB_SETTINGS.openLinksInApp;
		}),

		setOpenLinksInApp: publicProcedure
			.input(z.object({ enabled: z.boolean() }))
			.mutation(({ input }) => {
				stubLog("settings", "setOpenLinksInApp", input);
				return { success: true };
			}),

		getDefaultEditor: publicProcedure.query(() => {
			stubLog("settings", "getDefaultEditor");
			return STUB_SETTINGS.defaultEditor;
		}),

		setDefaultEditor: publicProcedure
			.input(
				z.object({
					editor: z
						.enum(EXTERNAL_APPS)
						.nullable()
						.refine((val) => val === null || !NON_EDITOR_APPS.includes(val), {
							message: "Non-editor apps cannot be set as the global default",
						}),
				}),
			)
			.mutation(({ input }) => {
				stubLog("settings", "setDefaultEditor", input);
				return { success: true };
			}),

		setupAgent: publicProcedure
			.input(z.object({ agentId: z.string().min(1) }))
			.mutation(({ input }) => {
				stubLog("settings", "setupAgent", input);
				return { success: true };
			}),

		getTelemetryEnabled: publicProcedure.query(() => {
			stubLog("settings", "getTelemetryEnabled");
			return true;
		}),

		setTelemetryEnabled: publicProcedure
			.input(z.object({ enabled: z.boolean() }))
			.mutation(({ input }) => {
				stubLog("settings", "setTelemetryEnabled", input);
				return { success: true };
			}),
	});
};
