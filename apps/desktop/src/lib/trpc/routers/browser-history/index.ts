import { z } from "zod";
import { publicProcedure, router } from "../..";
import { stubLog } from "../../stub-data";

export const createBrowserHistoryRouter = () => {
	return router({
		getAll: publicProcedure.query(() => {
			stubLog("browserHistory", "getAll");
			return [];
		}),

		search: publicProcedure
			.input(z.object({ query: z.string() }))
			.query(({ input }) => {
				stubLog("browserHistory", "search", input);
				return [];
			}),

		upsert: publicProcedure
			.input(
				z.object({
					url: z.string(),
					title: z.string(),
					faviconUrl: z.string().nullable().optional(),
				}),
			)
			.mutation(({ input }) => {
				stubLog("browserHistory", "upsert", input);
				return { success: true };
			}),

		clear: publicProcedure.mutation(() => {
			stubLog("browserHistory", "clear");
			return { success: true };
		}),
	});
};
