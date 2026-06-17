import { publicProcedure, router } from "../..";
import { stubLog } from "../../stub-data";

export const createCacheRouter = () => {
	return router({
		clearElectricCache: publicProcedure.mutation(async () => {
			stubLog("cache", "clearElectricCache");
			return { success: true };
		}),
	});
};

export type CacheRouter = ReturnType<typeof createCacheRouter>;
