import type { ChangedFile, GitChangesStatus } from "shared/changes-types";
import { z } from "zod";
import { publicProcedure, router } from "../..";
import { stubLog } from "../../stub-data";

export const createStatusRouter = () => {
	return router({
		getStatus: publicProcedure
			.input(
				z.object({
					worktreePath: z.string(),
					defaultBranch: z.string().optional(),
				}),
			)
			.query(async ({ input }): Promise<GitChangesStatus> => {
				stubLog("changes.status", "getStatus", input);
				return {
					current: "main",
					tracking: "origin/main",
					ahead: 0,
					behind: 0,
					staged: [],
					unstaged: [],
					untracked: [],
				};
			}),

		getCommitFiles: publicProcedure
			.input(
				z.object({
					worktreePath: z.string(),
					commitHash: z.string(),
				}),
			)
			.query(async ({ input }): Promise<ChangedFile[]> => {
				stubLog("changes.status", "getCommitFiles", input);
				return [];
			}),
	});
};