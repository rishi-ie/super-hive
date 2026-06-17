import { z } from "zod";
import { publicProcedure, router } from "../..";
import { stubLog, stubObservable } from "../../stub-data";

const orgInput = z.object({ organizationId: z.string() });

export const createHostServiceCoordinatorRouter = () => {
	return router({
		start: publicProcedure.input(orgInput).mutation(async ({ input }) => {
			stubLog("hostServiceCoordinator", "start", input);
			return { port: 3000, secret: "stub", machineId: "stub" };
		}),

		getConnection: publicProcedure.input(orgInput).query(({ input }) => {
			stubLog("hostServiceCoordinator", "getConnection", input);
			return { port: 3000, secret: "stub", machineId: "stub" };
		}),

		getProcessStatus: publicProcedure.input(orgInput).query(({ input }) => {
			stubLog("hostServiceCoordinator", "getProcessStatus", input);
			return { status: "running" };
		}),

		restart: publicProcedure.input(orgInput).mutation(async ({ input }) => {
			stubLog("hostServiceCoordinator", "restart", input);
			return { port: 3000, secret: "stub", machineId: "stub" };
		}),

		reset: publicProcedure.input(orgInput).mutation(async ({ input }) => {
			stubLog("hostServiceCoordinator", "reset", input);
			return { port: 3000, secret: "stub", machineId: "stub" };
		}),

		onStatusChange: publicProcedure.subscription(() => {
			stubLog("hostServiceCoordinator", "onStatusChange");
			return stubObservable();
		}),
	});
};
