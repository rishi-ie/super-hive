import { publicProcedure, router } from "..";
import { stubLog } from "../../stub-data";

export const createPermissionsRouter = () => {
	return router({
		getStatus: publicProcedure.query(() => {
			stubLog("permissions", "getStatus");
			return {
				fullDiskAccess: "granted" as const,
				accessibility: "granted" as const,
				microphone: "granted" as const,
				appleEvents: "granted" as const,
				localNetwork: "granted" as const,
			};
		}),

		requestFullDiskAccess: publicProcedure.mutation(async () => {
			stubLog("permissions", "requestFullDiskAccess");
			return "granted";
		}),

		requestAccessibility: publicProcedure.mutation(async () => {
			stubLog("permissions", "requestAccessibility");
			return "granted";
		}),

		requestMicrophone: publicProcedure.mutation(async () => {
			stubLog("permissions", "requestMicrophone");
			return "granted";
		}),

		requestAppleEvents: publicProcedure.mutation(async () => {
			stubLog("permissions", "requestAppleEvents");
			return "granted";
		}),

		requestLocalNetwork: publicProcedure.mutation(async () => {
			stubLog("permissions", "requestLocalNetwork");
			return "granted";
		}),
	});
};

export type PermissionsRouter = ReturnType<typeof createPermissionsRouter>;
