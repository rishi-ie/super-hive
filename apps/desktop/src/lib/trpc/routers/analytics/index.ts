import { z } from "zod";
import { publicProcedure, router } from "../..";
import { stubLog } from "../../stub-data";

export const createAnalyticsRouter = () => {
	return router({
		setUserId: publicProcedure
			.input(z.object({ userId: z.string().nullable() }))
			.mutation(({ input }) => {
				stubLog("analytics", "setUserId", input);
				return { success: true };
			}),
	});
};

export type AnalyticsRouter = ReturnType<typeof createAnalyticsRouter>;
