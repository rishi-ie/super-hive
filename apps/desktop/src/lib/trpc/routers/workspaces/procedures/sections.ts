import { z } from "zod";
import { publicProcedure, router } from "../../..";
import { stubLog } from "../../../../stub-data";

export const createSectionsProcedures = () => {
	return router({
		createSection: publicProcedure
			.input(
				z.object({
					projectId: z.string(),
					name: z.string(),
				}),
			)
			.mutation(({ input }) => {
				stubLog("workspaces.sections", "createSection", input);
				return { id: "stub-section-id", projectId: input.projectId, name: input.name, tabOrder: 0, color: "#007aff", isCollapsed: false };
			}),

		setSectionColor: publicProcedure
			.input(
				z.object({
					id: z.string(),
					color: z.string().nullable(),
				}),
			)
			.mutation(({ input }) => {
				stubLog("workspaces.sections", "setSectionColor", input);
				return { success: true };
			}),

		renameSection: publicProcedure
			.input(
				z.object({
					id: z.string(),
					name: z.string(),
				}),
			)
			.mutation(({ input }) => {
				stubLog("workspaces.sections", "renameSection", input);
				return { success: true };
			}),

		deleteSection: publicProcedure
			.input(z.object({ id: z.string() }))
			.mutation(({ input }) => {
				stubLog("workspaces.sections", "deleteSection", input);
				return { success: true };
			}),

		reorderSections: publicProcedure
			.input(
				z.object({
					projectId: z.string(),
					fromIndex: z.number(),
					toIndex: z.number(),
				}),
			)
			.mutation(({ input }) => {
				stubLog("workspaces.sections", "reorderSections", input);
				return { success: true };
			}),

		toggleSectionCollapsed: publicProcedure
			.input(z.object({ id: z.string() }))
			.mutation(({ input }) => {
				stubLog("workspaces.sections", "toggleSectionCollapsed", input);
				return { success: true, isCollapsed: false };
			}),

		reorderWorkspacesInSection: publicProcedure
			.input(
				z.object({
					sectionId: z.string(),
					fromIndex: z.number(),
					toIndex: z.number(),
				}),
			)
			.mutation(({ input }) => {
				stubLog("workspaces.sections", "reorderWorkspacesInSection", input);
				return { success: true };
			}),

		moveWorkspacesToSection: publicProcedure
			.input(
				z.object({
					workspaceIds: z.array(z.string()).min(1),
					sectionId: z.string().nullable(),
					rootPlacement: z.enum(["top", "bottom"]).optional(),
				}),
			)
			.mutation(({ input }) => {
				stubLog("workspaces.sections", "moveWorkspacesToSection", input);
				return { success: true };
			}),

		moveWorkspaceToSection: publicProcedure
			.input(
				z.object({
					workspaceId: z.string(),
					sectionId: z.string().nullable(),
					rootPlacement: z.enum(["top", "bottom"]).optional(),
				}),
			)
			.mutation(({ input }) => {
				stubLog("workspaces.sections", "moveWorkspaceToSection", input);
				return { success: true };
			}),
	});
};