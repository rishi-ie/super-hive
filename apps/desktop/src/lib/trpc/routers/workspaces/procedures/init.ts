import { z } from "zod";
import { publicProcedure, router } from "../../..";
import { stubLog, stubObservable } from "../../../../stub-data";
import type { WorkspaceInitProgress } from "shared/types/workspace-init";

export const createInitProcedures = () => {
	return router({
		onInitProgress: publicProcedure
			.input(
				z.object({ workspaceIds: z.array(z.string()).optional() }).optional(),
			)
			.subscription(({ input }) => {
				stubLog("workspaces.init", "onInitProgress", input);
				return stubObservable<WorkspaceInitProgress>();
			}),

		retryInit: publicProcedure
			.input(
				z.object({
					workspaceId: z.string(),
					deduplicateBranchName: z.boolean().optional().default(false),
				}),
			)
			.mutation(({ input }) => {
				stubLog("workspaces.init", "retryInit", input);
				return { success: true };
			}),

		getInitProgress: publicProcedure
			.input(z.object({ workspaceId: z.string() }))
			.query(({ input }) => {
				stubLog("workspaces.init", "getInitProgress", input);
				return { progress: 100, step: "complete", message: "done", error: null };
			}),

		getSetupCommands: publicProcedure
			.input(z.object({ workspaceId: z.string() }))
			.query(({ input }) => {
				stubLog("workspaces.init", "getSetupCommands", input);
				return { projectId: "stub-project-id", initialCommands: null, defaultPresets: [] };
			}),
	});
};