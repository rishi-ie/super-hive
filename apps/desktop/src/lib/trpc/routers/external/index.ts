import { z } from "zod";
import { publicProcedure, router } from "../..";
import { stubLog } from "../../stub-data";
import { observable } from "@trpc/server/observable";

const ExternalAppSchema = z.enum(["cursor", "vscode", "zed", "finder", "terminal", "difftool"]);

export const createExternalRouter = () => {
	return router({
		openUrl: publicProcedure.input(z.string()).mutation(async ({ input }) => {
			stubLog("external", "openUrl", input);
			return { success: true };
		}),

		openInFinder: publicProcedure
			.input(z.string())
			.mutation(async ({ input }) => {
				stubLog("external", "openInFinder", input);
				return { success: true };
			}),

		openInApp: publicProcedure
			.input(
				z.object({
					path: z.string(),
					app: ExternalAppSchema,
					projectId: z.string().optional(),
				}),
			)
			.mutation(async ({ input }) => {
				stubLog("external", "openInApp", input);
				return { success: true };
			}),

		copyPath: publicProcedure.input(z.string()).mutation(async ({ input }) => {
			stubLog("external", "copyPath", input);
			return { success: true };
		}),

		copyText: publicProcedure.input(z.string()).mutation(async ({ input }) => {
			stubLog("external", "copyText", input);
			return { success: true };
		}),

		resolvePath: publicProcedure
			.input(
				z.object({
					path: z.string(),
					worktreePath: z.string().optional(),
				}),
			)
			.query(({ input }) => {
				stubLog("external", "resolvePath", input);
				return "/mock/resolved/path";
			}),

		statPath: publicProcedure
			.input(
				z.object({
					path: z.string(),
					workspaceId: z.string().optional(),
				}),
			)
			.mutation(({ input }) => {
				stubLog("external", "statPath", input);
				return { isDirectory: false, resolvedPath: "/mock/resolved/path" };
			}),

		openFileInEditor: publicProcedure
			.input(
				z.object({
					path: z.string(),
					line: z.number().optional(),
					column: z.number().optional(),
					worktreePath: z.string().optional(),
					projectId: z.string().optional(),
					app: ExternalAppSchema.optional(),
				}),
			)
			.mutation(({ input }) => {
				stubLog("external", "openFileInEditor", input);
				return { success: true };
			}),
	});
};

export type ExternalRouter = ReturnType<typeof createExternalRouter>;
