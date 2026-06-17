import { z } from "zod";
import { publicProcedure, router } from "../../..";
import { stubLog, STUB_GIT_STATUS } from "../../../../stub-data";

export const createGitStatusProcedures = () => {
	return router({
		refreshGitStatus: publicProcedure
			.input(z.object({ workspaceId: z.string() }))
			.mutation(({ input }) => {
				stubLog("workspaces.git-status", "refreshGitStatus", input);
				return { gitStatus: STUB_GIT_STATUS, defaultBranch: "main" };
			}),

		getAheadBehind: publicProcedure
			.input(z.object({ workspaceId: z.string() }))
			.query(({ input }) => {
				stubLog("workspaces.git-status", "getAheadBehind", input);
				return { ahead: 0, behind: 0 };
			}),

		getGitHubStatus: publicProcedure
			.input(z.object({ workspaceId: z.string() }))
			.query(({ input }) => {
				stubLog("workspaces.git-status", "getGitHubStatus", input);
				return null;
			}),

		getGitHubPRComments: publicProcedure
			.input(
				z.object({
					workspaceId: z.string(),
					prNumber: z.number().int().positive().optional(),
					repoUrl: z.string().optional(),
					upstreamUrl: z.string().optional(),
					isFork: z.boolean().optional(),
				}),
			)
			.query(({ input }) => {
				stubLog("workspaces.git-status", "getGitHubPRComments", input);
				return [];
			}),

		resolveReviewThread: publicProcedure
			.input(
				z.object({
					workspaceId: z.string(),
					threadId: z.string(),
					resolve: z.boolean(),
				}),
			)
			.mutation(({ input }) => {
				stubLog("workspaces.git-status", "resolveReviewThread", input);
				return { success: true };
			}),

		getWorktreeInfo: publicProcedure
			.input(z.object({ workspaceId: z.string() }))
			.query(({ input }) => {
				stubLog("workspaces.git-status", "getWorktreeInfo", input);
				return null;
			}),

		getWorktreesByProject: publicProcedure
			.input(z.object({ projectId: z.string() }))
			.query(({ input }) => {
				stubLog("workspaces.git-status", "getWorktreesByProject", input);
				return [];
			}),

		getExternalWorktrees: publicProcedure
			.input(z.object({ projectId: z.string() }))
			.query(({ input }) => {
				stubLog("workspaces.git-status", "getExternalWorktrees", input);
				return [];
			}),
	});
};