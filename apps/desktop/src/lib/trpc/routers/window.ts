import { z } from "zod";
import { publicProcedure, router } from "..";
import { stubLog } from "../../stub-data";

export const createWindowRouter = () => {
	return router({
		minimize: publicProcedure.mutation(() => {
			stubLog("window", "minimize");
			return { success: true };
		}),

		maximize: publicProcedure.mutation(() => {
			stubLog("window", "maximize");
			return { success: true };
		}),

		close: publicProcedure.mutation(() => {
			stubLog("window", "close");
			return { success: true };
		}),

		isMaximized: publicProcedure.query(() => {
			stubLog("window", "isMaximized");
			return false;
		}),

		getPlatform: publicProcedure.query(() => {
			stubLog("window", "getPlatform");
			return "darwin";
		}),

		getHomeDir: publicProcedure.query(() => {
			stubLog("window", "getHomeDir");
			return "/mock/home";
		}),

		getDirectoryStatus: publicProcedure
			.input(
				z.object({
					path: z.string(),
				}),
			)
			.query(({ input }) => {
				stubLog("window", "getDirectoryStatus", input);
				return { exists: true };
			}),

		selectDirectory: publicProcedure
			.input(
				z
					.object({
						title: z.string().optional(),
						defaultPath: z.string().optional(),
					})
					.optional(),
			)
			.mutation(({ input }) => {
				stubLog("window", "selectDirectory", input);
				return { canceled: false, path: "/mock/path" };
			}),

		selectImageFile: publicProcedure.mutation(() => {
			stubLog("window", "selectImageFile");
			return { canceled: false, dataUrl: null };
		}),
	});
};
