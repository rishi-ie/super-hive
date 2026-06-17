import { z } from "zod";
import { publicProcedure, router } from "../..";
import { stubLog, stubObservable } from "../../stub-data";

const SAFE_ID = z
	.string()
	.min(1)
	.refine(
		(value) =>
			!value.includes("/") && !value.includes("\\") && !value.includes(".."),
		{ message: "Invalid id" },
	);

export const createTerminalRouter = () => {
	return router({
		createOrAttach: publicProcedure
			.input(
				z.object({
					paneId: SAFE_ID,
					requestId: z.string().min(1).optional(),
					joinPending: z.boolean().optional(),
					tabId: z.string(),
					workspaceId: SAFE_ID,
					cols: z.number().optional(),
					rows: z.number().optional(),
					cwd: z.string().optional(),
					command: z.string().trim().min(1).optional(),
					skipColdRestore: z.boolean().optional(),
					allowKilled: z.boolean().optional(),
					themeType: z.enum(["dark", "light"]).optional(),
				}),
			)
			.mutation(async ({ input }) => {
				stubLog("terminal", "createOrAttach", { paneId: input.paneId });
				return {
					paneId: input.paneId,
					isNew: true,
					scrollback: [],
					wasRecovered: false,
					isColdRestore: false,
					previousCwd: null,
					snapshot: null,
				};
			}),

		cancelCreateOrAttach: publicProcedure
			.input(
				z.object({
					paneId: SAFE_ID,
					requestId: z.string().min(1),
				}),
			)
			.mutation(({ input }) => {
				stubLog("terminal", "cancelCreateOrAttach", { paneId: input.paneId });
				return { success: true };
			}),

		write: publicProcedure
			.input(
				z.object({
					paneId: z.string(),
					data: z.string(),
					throwOnError: z.boolean().optional(),
				}),
			)
			.mutation(async ({ input }) => {
				stubLog("terminal", "write", { paneId: input.paneId });
			}),

		ackColdRestore: publicProcedure
			.input(z.object({ paneId: z.string() }))
			.mutation(({ input }) => {
				stubLog("terminal", "ackColdRestore", { paneId: input.paneId });
			}),

		resize: publicProcedure
			.input(
				z.object({
					paneId: z.string(),
					cols: z.number(),
					rows: z.number(),
					seq: z.number().optional(),
				}),
			)
			.mutation(async ({ input }) => {
				stubLog("terminal", "resize", { paneId: input.paneId });
			}),

		signal: publicProcedure
			.input(
				z.object({
					paneId: z.string(),
					signal: z.string().optional(),
				}),
			)
			.mutation(async ({ input }) => {
				stubLog("terminal", "signal", { paneId: input.paneId });
			}),

		kill: publicProcedure
			.input(
				z.object({
					paneId: z.string(),
				}),
			)
			.mutation(async ({ input }) => {
				stubLog("terminal", "kill", { paneId: input.paneId });
			}),

		detach: publicProcedure
			.input(
				z.object({
					paneId: z.string(),
				}),
			)
			.mutation(async ({ input }) => {
				stubLog("terminal", "detach", { paneId: input.paneId });
			}),

		clearScrollback: publicProcedure
			.input(
				z.object({
					paneId: z.string(),
				}),
			)
			.mutation(async ({ input }) => {
				stubLog("terminal", "clearScrollback", { paneId: input.paneId });
			}),

		listDaemonSessions: publicProcedure.query(async () => {
			stubLog("terminal", "listDaemonSessions");
			return { sessions: [] };
		}),

		killAllDaemonSessions: publicProcedure.mutation(async () => {
			stubLog("terminal", "killAllDaemonSessions");
			return { killedCount: 0, remainingCount: 0 };
		}),

		killDaemonSessionsForWorkspace: publicProcedure
			.input(z.object({ workspaceId: z.string() }))
			.mutation(async ({ input }) => {
				stubLog("terminal", "killDaemonSessionsForWorkspace", {
					workspaceId: input.workspaceId,
				});
				return { killedCount: 0 };
			}),

		clearTerminalHistory: publicProcedure.mutation(async () => {
			stubLog("terminal", "clearTerminalHistory");
			return { success: true };
		}),

		restartDaemon: publicProcedure.mutation(async () => {
			stubLog("terminal", "restartDaemon");
			return { success: true };
		}),

		getSession: publicProcedure.input(z.string()).query(async ({ input }) => {
			stubLog("terminal", "getSession", { paneId: input });
			return null;
		}),

		getWorkspaceCwd: publicProcedure
			.input(z.string())
			.query(({ input }) => {
				stubLog("terminal", "getWorkspaceCwd", { workspaceId: input });
				return null;
			}),

		stream: publicProcedure
			.input(z.string())
			.subscription(({ input: paneId }) => {
				stubLog("terminal", "stream", { paneId });
				return stubObservable();
			}),
	});
};
