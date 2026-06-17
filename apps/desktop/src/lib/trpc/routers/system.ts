import { publicProcedure, router } from "..";
import { stubLog } from "../../stub-data";

export const createSystemRouter = () => {
	return router({
		detectGhCli: publicProcedure.query(() => {
			stubLog("system", "detectGhCli");
			return { installed: false, version: null };
		}),
	});
};
