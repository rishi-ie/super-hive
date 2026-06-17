import { initTRPC } from "@trpc/server";
import superjson from "superjson";
import { z } from "zod";
import { stubLog } from "../../stub-data";

const t = initTRPC.create({ transformer: superjson });

const searchFilesInput = z.object({
	rootPath: z.string(),
	query: z.string(),
	includeHidden: z.boolean().default(false),
	limit: z.number().default(20),
});

const getSlashCommandsInput = z.object({
	cwd: z.string(),
});

const getMcpOverviewInput = z.object({
	cwd: z.string(),
});

const resolveSlashCommandInput = z.object({
	cwd: z.string(),
	text: z.string(),
});

const anthropicOAuthCodeInput = z.object({
	code: z.string().min(1),
});

const openAIOAuthCodeInput = z.object({
	code: z.string().optional(),
});

const anthropicApiKeyInput = z.object({
	apiKey: z.string().min(1),
});

const anthropicEnvConfigInput = z.object({
	envText: z.string(),
});

const openAIApiKeyInput = z.object({
	apiKey: z.string().min(1),
});

const STUB_AUTH_STATUS = {
	authenticated: false,
	method: null,
	source: null,
	issue: null,
};

const createChatServiceRouter = () => {
	return t.router({
		workspace: t.router({
			searchFiles: t.procedure
				.input(searchFilesInput)
				.query(({ input }) => {
					stubLog("chatService", "workspace.searchFiles", input);
					return [];
				}),

			getSlashCommands: t.procedure
				.input(getSlashCommandsInput)
				.query(({ input }) => {
					stubLog("chatService", "workspace.getSlashCommands", input);
					return [];
				}),

			getMcpOverview: t.procedure
				.input(getMcpOverviewInput)
				.query(({ input }) => {
					stubLog("chatService", "workspace.getMcpOverview", input);
					return { sourcePath: null, servers: [] };
				}),

			resolveSlashCommand: t.procedure
				.input(resolveSlashCommandInput)
				.mutation(({ input }) => {
					stubLog("chatService", "workspace.resolveSlashCommand", input);
					return null;
				}),

			previewSlashCommand: t.procedure
				.input(resolveSlashCommandInput)
				.query(({ input }) => {
					stubLog("chatService", "workspace.previewSlashCommand", input);
					return null;
				}),
		}),

		auth: t.router({
			getAnthropicStatus: t.procedure.query(() => {
				stubLog("chatService", "auth.getAnthropicStatus");
				return STUB_AUTH_STATUS;
			}),

			getOpenAIStatus: t.procedure.query(() => {
				stubLog("chatService", "auth.getOpenAIStatus");
				return STUB_AUTH_STATUS;
			}),

			startOpenAIOAuth: t.procedure.mutation(() => {
				stubLog("chatService", "auth.startOpenAIOAuth");
				return { url: "", instructions: "" };
			}),

			completeOpenAIOAuth: t.procedure
				.input(openAIOAuthCodeInput)
				.mutation(({ input }) => {
					stubLog("chatService", "auth.completeOpenAIOAuth", input);
					return { success: true };
				}),

			cancelOpenAIOAuth: t.procedure.mutation(() => {
				stubLog("chatService", "auth.cancelOpenAIOAuth");
				return { success: true };
			}),

			consumeOpenAIOAuthCallback: t.procedure.query(() => {
				stubLog("chatService", "auth.consumeOpenAIOAuthCallback");
				return { callbackUrl: null };
			}),

			disconnectOpenAIOAuth: t.procedure.mutation(() => {
				stubLog("chatService", "auth.disconnectOpenAIOAuth");
				return { success: true };
			}),

			startAnthropicOAuth: t.procedure.mutation(() => {
				stubLog("chatService", "auth.startAnthropicOAuth");
				return { url: "", instructions: "" };
			}),

			completeAnthropicOAuth: t.procedure
				.input(anthropicOAuthCodeInput)
				.mutation(({ input }) => {
					stubLog("chatService", "auth.completeAnthropicOAuth", input);
					return { success: true, expiresAt: 0 };
				}),

			cancelAnthropicOAuth: t.procedure.mutation(() => {
				stubLog("chatService", "auth.cancelAnthropicOAuth");
				return { success: true };
			}),

			disconnectAnthropicOAuth: t.procedure.mutation(() => {
				stubLog("chatService", "auth.disconnectAnthropicOAuth");
				return { success: true };
			}),

			setAnthropicApiKey: t.procedure
				.input(anthropicApiKeyInput)
				.mutation(({ input }) => {
					stubLog("chatService", "auth.setAnthropicApiKey", input);
					return { success: true };
				}),

			getAnthropicEnvConfig: t.procedure.query(() => {
				stubLog("chatService", "auth.getAnthropicEnvConfig");
				return { envText: "", variables: {} };
			}),

			setAnthropicEnvConfig: t.procedure
				.input(anthropicEnvConfigInput)
				.mutation(({ input }) => {
					stubLog("chatService", "auth.setAnthropicEnvConfig", input);
					return { success: true };
				}),

			clearAnthropicEnvConfig: t.procedure.mutation(() => {
				stubLog("chatService", "auth.clearAnthropicEnvConfig");
				return { success: true };
			}),

			clearAnthropicApiKey: t.procedure.mutation(() => {
				stubLog("chatService", "auth.clearAnthropicApiKey");
				return { success: true };
			}),

			setOpenAIApiKey: t.procedure
				.input(openAIApiKeyInput)
				.mutation(({ input }) => {
					stubLog("chatService", "auth.setOpenAIApiKey", input);
					return { success: true };
				}),

			clearOpenAIApiKey: t.procedure.mutation(() => {
				stubLog("chatService", "auth.clearOpenAIApiKey");
				return { success: true };
			}),
		}),
	});
};

export { createChatServiceRouter };

export type ChatServiceDesktopRouter = ReturnType<typeof createChatServiceRouter>;