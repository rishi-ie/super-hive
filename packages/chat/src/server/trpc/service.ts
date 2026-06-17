import { initTRPC } from "@trpc/server";
import { observable } from "@trpc/server/observable";
import superjson from "superjson";

export interface ChatRuntimeServiceOptions {
	headers: () => Record<string, string> | Promise<Record<string, string>>;
	apiUrl: string;
	onLifecycleEvent?: (event: unknown) => void;
}

export class ChatRuntimeService {
	constructor(readonly opts: ChatRuntimeServiceOptions) {}

	createRouter() {
		const t = initTRPC.create({ transformer: superjson });

		return t.router({
			workspace: t.router({
				searchFiles: t.procedure.query(async () => {
					console.info("[STUB] ChatRuntimeService.workspace.searchFiles");
					return { files: [] };
				}),

				getMcpOverview: t.procedure.query(async () => {
					console.info("[STUB] ChatRuntimeService.workspace.getMcpOverview");
					return { sourcePath: null, servers: [] };
				}),

				authenticateMcpServer: t.procedure.mutation(async () => {
					console.info("[STUB] ChatRuntimeService.workspace.authenticateMcpServer");
					return { sourcePath: null, servers: [] };
				}),
			}),

			session: t.router({
				getDisplayState: t.procedure.query(async () => {
					console.info("[STUB] ChatRuntimeService.session.getDisplayState");
					return {
						currentMessage: null,
						pendingQuestion: null,
						errorMessage: null,
					};
				}),

				listMessages: t.procedure.query(async () => {
					console.info("[STUB] ChatRuntimeService.session.listMessages");
					return [];
				}),

				sendMessage: t.procedure.mutation(async () => {
					console.info("[STUB] ChatRuntimeService.session.sendMessage");
					return {
						sessionId: "",
						message: {
							id: "stub-message-id",
							role: "assistant" as const,
							content: [{ type: "text" as const, text: "stub response" }],
							stopReason: "end_turn" as const,
						},
					};
				}),

				restartFromMessage: t.procedure.mutation(async () => {
					console.info("[STUB] ChatRuntimeService.session.restartFromMessage");
				}),

				stop: t.procedure.mutation(async () => {
					console.info("[STUB] ChatRuntimeService.session.stop");
				}),

				abort: t.procedure.mutation(async () => {
					console.info("[STUB] ChatRuntimeService.session.abort");
				}),

				approval: t.router({
					respond: t.procedure.mutation(async () => {
						console.info("[STUB] ChatRuntimeService.session.approval.respond");
					}),
				}),

				question: t.router({
					respond: t.procedure.mutation(async () => {
						console.info("[STUB] ChatRuntimeService.session.question.respond");
					}),
				}),

				plan: t.router({
					respond: t.procedure.mutation(async () => {
						console.info("[STUB] ChatRuntimeService.session.plan.respond");
					}),
				}),
			}),
		});
	}
}

export type ChatRuntimeServiceRouter = ReturnType<
	ChatRuntimeService["createRouter"]
>;
