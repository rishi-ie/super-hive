import { z } from "zod";
import { publicProcedure, router } from "../../..";
import {
	stubLog,
	STUB_PROJECTS,
	STUB_WORKSPCES,
} from "../../../../stub-data";

export const createCreateProcedures = () => {
	return router({
		create: publicProcedure
			.input(
				z
					.object({
						projectId: z.string(),
						name: z.string().optional(),
						prompt: z.string().optional(),
						branchName: z.string().optional(),
						compareBaseBranch: z.string().optional(),
						sourceWorkspaceId: z.string().optional(),
						useExistingBranch: z.boolean().optional(),
						applyPrefix: z.boolean().optional().default(true),
					})
					.refine(
						(data) => !(data.compareBaseBranch && data.sourceWorkspaceId),
						{
							message:
								"Cannot specify both compareBaseBranch and sourceWorkspaceId. Use one or the other.",
						},
					)
					.refine(
						(data) => !(data.useExistingBranch && data.sourceWorkspaceId),
						{
							message:
								"Cannot specify both useExistingBranch and sourceWorkspaceId.",
						},
					),
			)
			.mutation(({ input }) => {
				stubLog("workspaces.create", "create", input);
				const stubWorkspace = {
					...STUB_WORKSPCES[0],
					id: "new-stub-id",
					projectId: input.projectId,
					name: input.name ?? "New Stub Workspace",
				};
				return {
					workspace: stubWorkspace,
					initialCommands: null,
					worktreePath: stubWorkspace.path,
					projectId: input.projectId,
					isInitializing: false,
					wasExisting: false,
				};
			}),

		openMainRepoWorkspace: publicProcedure
			.input(
				z.object({
					projectId: z.string(),
					branch: z.string().optional(),
					name: z.string().optional(),
				}),
			)
			.mutation(({ input }) => {
				stubLog("workspaces.create", "openMainRepoWorkspace", input);
				const stubWorkspace = STUB_WORKSPCES[0];
				return {
					workspace: stubWorkspace,
					worktreePath: "/mock/main-repo",
					projectId: input.projectId,
					wasExisting: true,
				};
			}),

		openWorktree: publicProcedure
			.input(
				z.object({
					worktreeId: z.string(),
					name: z.string().optional(),
				}),
			)
			.mutation(({ input }) => {
				stubLog("workspaces.create", "openWorktree", input);
				const stubWorkspace = STUB_WORKSPCES[0];
				return {
					workspace: stubWorkspace,
					initialCommands: null,
					worktreePath: stubWorkspace.path,
					projectId: stubWorkspace.projectId,
				};
			}),

		openExternalWorktree: publicProcedure
			.input(
				z.object({
					projectId: z.string(),
					worktreePath: z.string(),
				}),
			)
			.mutation(({ input }) => {
				stubLog("workspaces.create", "openExternalWorktree", input);
				const stubWorkspace = STUB_WORKSPCES[0];
				return {
					workspace: stubWorkspace,
					initialCommands: null,
					worktreePath: input.worktreePath,
					projectId: input.projectId,
				};
			}),

		createFromPr: publicProcedure
			.input(
				z.object({
					projectId: z.string(),
					prUrl: z.string(),
				}),
			)
			.mutation(({ input }) => {
				stubLog("workspaces.create", "createFromPr", input);
				const stubWorkspace = STUB_WORKSPCES[0];
				return {
					workspace: stubWorkspace,
					initialCommands: null,
					worktreePath: stubWorkspace.path,
					projectId: input.projectId,
					prNumber: 123,
					prTitle: "Stub PR",
					wasExisting: false,
				};
			}),

		importAllWorktrees: publicProcedure
			.input(z.object({ projectId: z.string() }))
			.mutation(({ input }) => {
				stubLog("workspaces.create", "importAllWorktrees", input);
				return { imported: 0 };
			}),

		importExternalWorktrees: publicProcedure
			.input(
				z.object({
					projectId: z.string(),
					paths: z.array(z.string()).min(1),
				}),
			)
			.mutation(({ input }) => {
				stubLog("workspaces.create", "importExternalWorktrees", input);
				return { imported: 0 };
			}),
	});
};