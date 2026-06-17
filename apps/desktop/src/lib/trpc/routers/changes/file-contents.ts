import type { FileContents } from "shared/changes-types";
import { z } from "zod";
import { publicProcedure, router } from "../..";
import { stubLog } from "../../stub-data";

export const createFileContentsRouter = () => {
	return router({
		getGitFileContents: publicProcedure
			.input(
				z.object({
					worktreePath: z.string(),
					absolutePath: z.string(),
					oldAbsolutePath: z.string().optional(),
					category: z.enum(["against-base", "committed", "staged"]),
					commitHash: z.string().optional(),
					defaultBranch: z.string().optional(),
				}),
			)
			.query(async ({ input }): Promise<FileContents> => {
				stubLog("changes.file-contents", "getGitFileContents", input);
				return { original: "", modified: "" };
			}),

		getGitOriginalContent: publicProcedure
			.input(
				z.object({
					worktreePath: z.string(),
					absolutePath: z.string(),
					oldAbsolutePath: z.string().optional(),
				}),
			)
			.query(async ({ input }): Promise<{ content: string }> => {
				stubLog("changes.file-contents", "getGitOriginalContent", input);
				return { content: "" };
			}),
	});
};