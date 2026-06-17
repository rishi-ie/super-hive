import { z } from "zod";
import { publicProcedure, router } from "../../..";
import { stubLog } from "../../../../stub-data";

export const createDeleteProcedures = () => {
	return router({
		canDelete: publicProcedure
			.input(
				z.object({
					id: z.string(),
					skipGitChecks: z.boolean().optional(),
				}),
			)
			.query(({ input }) => {
				stubLog("workspaces.delete", "canDelete", input);
				return { canDelete: true };
			}),

		delete: publicProcedure
			.input(
				z.object({
					id: z.string(),
					deleteLocalBranch: z.boolean().optional(),
					force: z.boolean().optional(),
				}),
			)
			.mutation(({ input }) => {
				stubLog("workspaces.delete", "delete", input);
				return { success: true };
			}),

		close: publicProcedure
			.input(z.object({ id: z.string() }))
			.mutation(({ input }) => {
				stubLog("workspaces.delete", "close", input);
				return { success: true };
			}),

		canDeleteWorktree: publicProcedure
			.input(
				z.object({
					worktreeId: z.string(),
					skipGitChecks: z.boolean().optional(),
				}),
			)
			.query(({ input }) => {
				stubLog("workspaces.delete", "canDeleteWorktree", input);
				return { canDelete: true };
			}),

		deleteWorktree: publicProcedure
			.input(
				z.object({
					worktreeId: z.string(),
					force: z.boolean().optional(),
				}),
			)
			.mutation(({ input }) => {
				stubLog("workspaces.delete", "deleteWorktree", input);
				return { success: true };
			}),
	});
};