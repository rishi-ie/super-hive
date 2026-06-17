import { observable } from "@trpc/server/observable";
import { publicProcedure, router } from "../..";
import { stubLog } from "../../stub-data";

export const createAutoUpdateRouter = () => {
	return router({
		subscribe: publicProcedure.subscription(() => {
			stubLog("auto-update", "subscribe");
			return observable((emit) => {
				return () => {};
			});
		}),

		getStatus: publicProcedure.query(() => {
			stubLog("auto-update", "getStatus");
			return { status: "idle" as const, version: "0.0.0", progress: 0 };
		}),

		check: publicProcedure.mutation(() => {
			stubLog("auto-update", "check");
			return { success: true };
		}),

		checkInteractive: publicProcedure.mutation(() => {
			stubLog("auto-update", "checkInteractive");
			return { success: true };
		}),

		install: publicProcedure.mutation(() => {
			stubLog("auto-update", "install");
			return { success: true };
		}),

		dismiss: publicProcedure.mutation(() => {
			stubLog("auto-update", "dismiss");
			return { success: true };
		}),

		simulateReady: publicProcedure.mutation(() => {
			stubLog("auto-update", "simulateReady");
			return { success: true };
		}),

		simulateDownloading: publicProcedure.mutation(() => {
			stubLog("auto-update", "simulateDownloading");
			return { success: true };
		}),

		simulateError: publicProcedure.mutation(() => {
			stubLog("auto-update", "simulateError");
			return { success: true };
		}),
	});
};
