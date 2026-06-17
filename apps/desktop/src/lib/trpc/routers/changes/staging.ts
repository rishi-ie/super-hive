import { z } from "zod";
import { publicProcedure, router } from "../..";
import { stubLog } from "../../stub-data";

export const createStagingRouter = () => {
	return router({
		stageFile: publicProcedure
			.input(
				z.object({
					worktreePath: z.string(),
					filePath: z.string(),
				}),
			)
			.mutation(async ({ input }): Promise<{ success: boolean }> => {
				stubLog("changes.staging", "stageFile", input);
				return { success: true };
			}),

		unstageFile: publicProcedure
			.input(
				z.object({
					worktreePath: z.string(),
					filePath: z.string(),
				}),
			)
			.mutation(async ({ input }): Promise<{ success: boolean }> => {
				stubLog("changes.staging", "unstageFile", input);
				return { success: true };
			}),

		discardChanges: publicProcedure
			.input(
				z.object({
					worktreePath: z.string(),
					filePath: z.string(),
				}),
			)
			.mutation(async ({ input }): Promise<{ success: boolean }> => {
				stubLog("changes.staging", "discardChanges", input);
				return { success: true };
			}),

		stageFiles: publicProcedure
			.input(
				z.object({
					worktreePath: z.string(),
					filePaths: z.array(z.string()).min(1),
				}),
			)
			.mutation(async ({ input }): Promise<{ success: boolean }> => {
				stubLog("changes.staging", "stageFiles", input);
				return { success: true };
			}),

		unstageFiles: publicProcedure
			.input(
				z.object({
					worktreePath: z.string(),
					filePaths: z.array(z.string()).min(1),
				}),
			)
			.mutation(async ({ input }): Promise<{ success: boolean }> => {
				stubLog("changes.staging", "unstageFiles", input);
				return { success: true };
			}),

		stageAll: publicProcedure
			.input(z.object({ worktreePath: z.string() }))
			.mutation(async ({ input }): Promise<{ success: boolean }> => {
				stubLog("changes.staging", "stageAll", input);
				return { success: true };
			}),

		unstageAll: publicProcedure
			.input(z.object({ worktreePath: z.string() }))
			.mutation(async ({ input }): Promise<{ success: boolean }> => {
				stubLog("changes.staging", "unstageAll", input);
				return { success: true };
			}),

		deleteUntracked: publicProcedure
			.input(
				z.object({
					worktreePath: z.string(),
					filePath: z.string(),
				}),
			)
			.mutation(async ({ input }): Promise<{ success: boolean }> => {
				stubLog("changes.staging", "deleteUntracked", input);
				return { success: true };
			}),

		discardAllUnstaged: publicProcedure
			.input(z.object({ worktreePath: z.string() }))
			.mutation(async ({ input }): Promise<{ success: boolean }> => {
				stubLog("changes.staging", "discardAllUnstaged", input);
				return { success: true };
			}),

		discardAllStaged: publicProcedure
			.input(z.object({ worktreePath: z.string() }))
			.mutation(async ({ input }): Promise<{ success: boolean }> => {
				stubLog("changes.staging", "discardAllStaged", input);
				return { success: true };
			}),

		stash: publicProcedure
			.input(z.object({ worktreePath: z.string() }))
			.mutation(async ({ input }): Promise<{ success: boolean }> => {
				stubLog("changes.staging", "stash", input);
				return { success: true };
			}),

		stashIncludeUntracked: publicProcedure
			.input(z.object({ worktreePath: z.string() }))
			.mutation(async ({ input }): Promise<{ success: boolean }> => {
				stubLog("changes.staging", "stashIncludeUntracked", input);
				return { success: true };
			}),

		stashPop: publicProcedure
			.input(z.object({ worktreePath: z.string() }))
			.mutation(async ({ input }): Promise<{ success: boolean }> => {
				stubLog("changes.staging", "stashPop", input);
				return { success: true };
			}),
	});
};