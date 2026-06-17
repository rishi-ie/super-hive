import { z } from "zod";
import { publicProcedure, router } from "../../..";
import { stubLog } from "../../../../stub-data";

export const createGenerateBranchNameProcedures = () => {
	return router({
		generateBranchName: publicProcedure
			.input(
				z.object({
					prompt: z.string(),
					projectId: z.string(),
				}),
			)
			.mutation(({ input }) => {
				stubLog("workspaces.generate-branch-name", "generateBranchName", input);
				return { branchName: "stub-branch-name" };
			}),
	});
};