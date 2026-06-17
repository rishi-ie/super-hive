import { initTRPC } from "@trpc/server";
import superjson from "superjson";
import { observable } from "@trpc/server/observable";
import { z } from "zod";
import { stubLog } from "../../stub-data";

const t = initTRPC.create({ transformer: superjson });

const searchFilesInput = z.object({
	rootPath: z.string(),
	query: z.string(),
	includeHidden: z.boolean().default(false),
	limit: z.number().default(20),
});

const mcpOverviewInput = z.object({
	sessionId: z.string().uuid(),
	cwd: z.string().optional(),
});

const mcpServerAuthInput = z.object({
	sessionId: z.string().uuid(),
	cwd: z.string().optional(),
	serverName: z.string().min(1),
});

const sessionIdInput = z.object({
	sessionId: z.string().uuid(),
	cwd: z.string().optional(),
});

const displayStateInput = z.object({
	sessionId: z.string().uuid(),
	cwd: z.string().optional(),
});

const listMessagesInput = z.object({
	sessionId: z.string().uuid(),
	cwd: z.string().optional(),
});

const sendMessagePayloadSchema = z.object({
	content: z.string(),
	files: z
		.array(
			z.object({
				data: z.string(),
				mediaType: z.string(),
				filename: z.string().optional(),
			}),
		)
		.optional(),
});

const approvalPayloadSchema = z.object({
	decision: z.enum(["approve", "decline", "always_allow_category"]),
});

const questionPayloadSchema = z.object({
	questionId: z.string(),
	answer: z.string(),
});

const planPayloadSchema = z.object({
	planId: z.string(),
	response: z.object({
		action: z.enum(["approved", "rejected"]),
		feedback: z.string().optional(),
	}),
});

const sendMessageInput = z.object({
	sessionId: z.string().uuid(),
	cwd: z.string().optional(),
	payload: sendMessagePayloadSchema,
	metadata: z
		.object({
			model: z.string().optional(),
			thinkingLevel: z.enum(["off", "low", "medium", "high", "xhigh"]).optional(),
		})
		.optional(),
});

const restartFromMessageInput = z.object({
	sessionId: z.string().uuid(),
	cwd: z.string().optional(),
	messageId: z.string().min(1),
	payload: sendMessagePayloadSchema,
	metadata: z
		.object({
			model: z.string().optional(),
			thinkingLevel: z.enum(["off", "low", "medium", "high", "xhigh"]).optional(),
		})
		.optional(),
});

const approvalRespondInput = z.object({
	sessionId: z.string().uuid(),
	cwd: z.string().optional(),
	payload: approvalPayloadSchema,
});

const questionRespondInput = z.object({
	sessionId: z.string().uuid(),
	cwd: z.string().optional(),
	payload: questionPayloadSchema,
});

const planRespondInput = z.object({
	sessionId: z.string().uuid(),
	cwd: z.string().optional(),
	payload: planPayloadSchema,
});

export const createChatRuntimeServiceRouter = () => {
	return t.router({
		workspace: t.router({
			searchFiles: t.procedure
				.input(searchFilesInput)
				.query(({ input }) => {
					stubLog("chatRuntimeService", "workspace.searchFiles", input);
					return [];
				}),

			getMcpOverview: t.procedure
				.input(mcpOverviewInput)
				.query(({ input }) => {
					stubLog("chatRuntimeService", "workspace.getMcpOverview", input);
					return { sourcePath: null, servers: [] };
				}),

			authenticateMcpServer: t.procedure
				.input(mcpServerAuthInput)
				.mutation(({ input }) => {
					stubLog("chatRuntimeService", "workspace.authenticateMcpServer", input);
					return { sourcePath: null, servers: [] };
				}),
		}),

		session: t.router({
			getDisplayState: t.procedure
				.input(displayStateInput)
				.query(({ input }) => {
					stubLog("chatRuntimeService", "session.getDisplayState", input);
					return {
						currentMessage: null,
						pendingQuestion: null,
						errorMessage: null,
					};
				}),

			listMessages: t.procedure
				.input(listMessagesInput)
				.query(({ input }) => {
					stubLog("chatRuntimeService", "session.listMessages", input);
					return [];
				}),

			sendMessage: t.procedure
				.input(sendMessageInput)
				.mutation(({ input }) => {
					stubLog("chatRuntimeService", "session.sendMessage", input);
					return {
						sessionId: input.sessionId,
						message: {
							id: `stub-${Date.now()}`,
							role: "assistant",
							content: [{ type: "text" as const, text: "stub response" }],
							stopReason: "end_turn" as const,
						},
					};
				}),

			restartFromMessage: t.procedure
				.input(restartFromMessageInput)
				.mutation(({ input }) => {
					stubLog("chatRuntimeService", "session.restartFromMessage", input);
				}),

			stop: t.procedure
				.input(sessionIdInput)
				.mutation(({ input }) => {
					stubLog("chatRuntimeService", "session.stop", input);
				}),

			abort: t.procedure
				.input(sessionIdInput)
				.mutation(({ input }) => {
					stubLog("chatRuntimeService", "session.abort", input);
				}),

			approval: t.router({
				respond: t.procedure
					.input(approvalRespondInput)
					.mutation(({ input }) => {
						stubLog("chatRuntimeService", "session.approval.respond", input);
					}),
			}),

			question: t.router({
				respond: t.procedure
					.input(questionRespondInput)
					.mutation(({ input }) => {
						stubLog("chatRuntimeService", "session.question.respond", input);
					}),
			}),

			plan: t.router({
				respond: t.procedure
					.input(planRespondInput)
					.mutation(({ input }) => {
						stubLog("chatRuntimeService", "session.plan.respond", input);
					}),
				}),
		}),
	});
};