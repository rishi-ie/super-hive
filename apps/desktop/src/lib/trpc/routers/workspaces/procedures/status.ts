import { z } from "zod";
import { publicProcedure, router } from "../../..";
import { stubLog, STUB_WORKSPCES } from "../../../../stub-data";

export const createStatusProcedures = () => {
	return router({
		reorder: publicProcedure
			.input(
				z.object({
					projectId: z.string(),
					fromIndex: z.number(),
					toIndex: z.number(),
				}),
			)
			.mutation(({ input }) => {
				stubLog("workspaces.status", "reorder", input);
				return { success: true };
			}),

		reorderProjectChildren: publicProcedure
			.input(
				z.object({
					projectId: z.string(),
					fromIndex: z.number(),
					toIndex: z.number(),
				}),
			)
			.mutation(({ input }) => {
				stubLog("workspaces.status", "reorderProjectChildren", input);
				return { success: true };
			}),

		update: publicProcedure
			.input(
				z.object({
					id: z.string(),
					patch: z.object({
						name: z.string().optional(),
						preserveUnnamedStatus: z.boolean().optional(),
						isUnnamed: z.boolean().optional(),
					}),
				}),
			)
			.mutation(({ input }) => {
				stubLog("workspaces.status", "update", input);
				return STUB_WORKSPCES[0];
			}),

		setUnread: publicProcedure
			.input(z.object({ id: z.string(), isUnread: z.boolean() }))
			.mutation(({ input }) => {
				stubLog("workspaces.status", "setUnread", input);
				return { success: true, isUnread: input.isUnread };
			}),

		setActive: publicProcedure
			.input(z.object({ workspaceId: z.string() }))
			.mutation(({ input }) => {
				stubLog("workspaces.status", "setActive", input);
				return { success: true, workspaceId: input.workspaceId };
			}),

		syncBranch: publicProcedure
			.input(
				z.object({
					workspaceId: z.string(),
					branch: z.string(),
				}),
			)
			.mutation(({ input }) => {
				stubLog("workspaces.status", "syncBranch", input);
				return { success: true, changed: false };
			}),
	});
};