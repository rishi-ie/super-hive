import { publicProcedure, router } from "../..";
import { stubLog } from "../../stub-data";

export const createMigrationRouter = () => {
	return router({
		readV1Projects: publicProcedure.query(() => {
			stubLog("migration", "readV1Projects");
			return [];
		}),

		readV1Workspaces: publicProcedure.query(() => {
			stubLog("migration", "readV1Workspaces");
			return [];
		}),

		readV1Worktrees: publicProcedure.query(() => {
			stubLog("migration", "readV1Worktrees");
			return [];
		}),
	});
};
