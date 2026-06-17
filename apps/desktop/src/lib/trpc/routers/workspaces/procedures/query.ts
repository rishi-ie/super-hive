import { z } from "zod";
import { publicProcedure, router } from "../../..";
import {
	stubLog,
	STUB_PROJECTS,
	STUB_WORKSPCES,
} from "../../../../stub-data";

export const createQueryProcedures = () => {
	return router({
		get: publicProcedure
			.input(z.object({ id: z.string() }))
			.query(({ input }) => {
				stubLog("workspaces.query", "get", input);
				const workspace = STUB_WORKSPCES[0];
				return {
					...workspace,
					type: "worktree" as const,
					worktreePath: workspace.path,
					project: STUB_PROJECTS[0],
					worktree: {
						branch: workspace.branch,
						gitStatus: null,
						createdBySuperset: true,
					},
				};
			}),

		getAll: publicProcedure.query(() => {
			stubLog("workspaces.query", "getAll");
			return STUB_WORKSPCES;
		}),

		getAllGrouped: publicProcedure.query(() => {
			stubLog("workspaces.query", "getAllGrouped");
			return [
				{
					project: STUB_PROJECTS[0],
					workspaces: [...STUB_WORKSPCES.filter((w) => w.projectId === "p1")],
					sections: [],
					topLevelItems: [],
				},
			];
		}),

		getPreviousWorkspace: publicProcedure
			.input(z.object({ id: z.string() }))
			.query(({ input }) => {
				stubLog("workspaces.query", "getPreviousWorkspace", input);
				return STUB_WORKSPCES[0].id;
			}),

		getNextWorkspace: publicProcedure
			.input(z.object({ id: z.string() }))
			.query(({ input }) => {
				stubLog("workspaces.query", "getNextWorkspace", input);
				return null;
			}),

		getResolvedRunCommands: publicProcedure
			.input(z.object({ workspaceId: z.string() }))
			.query(({ input }) => {
				stubLog("workspaces.query", "getResolvedRunCommands", input);
				return { commands: [] };
			}),

		getWorkspaceRunDefinition: publicProcedure
			.input(z.object({ workspaceId: z.string() }))
			.query(({ input }) => {
				stubLog("workspaces.query", "getWorkspaceRunDefinition", input);
				return null;
			}),
	});
};