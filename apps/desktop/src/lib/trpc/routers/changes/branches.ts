import { z } from "zod";
import { publicProcedure, router } from "../..";
import { stubLog } from "../../stub-data";

export const createBranchesRouter = () => {
	return router({
		getBranches: publicProcedure
			.input(z.object({ worktreePath: z.string() }))
			.query(
				async ({
					input,
				}): Promise<{
					local: Array<{ branch: string; lastCommitDate: number }>;
					remote: string[];
					defaultBranch: string;
					checkedOutBranches: Record<string, string>;
					worktreeBaseBranch: string | null;
					currentBranch: string | null;
				}> => {
					stubLog("changes.branches", "getBranches", input);
					return {
						local: [],
						remote: [],
						defaultBranch: "main",
						checkedOutBranches: {},
						worktreeBaseBranch: null,
						currentBranch: "main",
					};
				},
			),

		switchBranch: publicProcedure
			.input(
				z.object({
					worktreePath: z.string(),
					branch: z.string(),
				}),
			)
			.mutation(async ({ input }): Promise<{ success: boolean }> => {
				stubLog("changes.branches", "switchBranch", input);
				return { success: true };
			}),

		updateBaseBranch: publicProcedure
			.input(
				z.object({
					worktreePath: z.string(),
					baseBranch: z.string().nullable(),
				}),
			)
			.mutation(async ({ input }): Promise<{ success: boolean }> => {
				stubLog("changes.branches", "updateBaseBranch", input);
				return { success: true };
			}),
	});
};