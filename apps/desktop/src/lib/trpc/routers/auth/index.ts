import { observable } from "@trpc/server/observable";
import { z } from "zod";
import { publicProcedure, router } from "../..";
import { stubLog } from "../../stub-data";

export const createAuthRouter = () => {
	return router({
		getStoredToken: publicProcedure.query(() => {
			stubLog("auth", "getStoredToken");
			return null;
		}),

		getDeviceInfo: publicProcedure.query(() => {
			stubLog("auth", "getDeviceInfo");
			return {
				deviceId: "stub-device-id",
				deviceName: "Mock Device",
			};
		}),

		persistToken: publicProcedure
			.input(
				z.object({
					token: z.string(),
					expiresAt: z.string(),
				}),
			)
			.mutation(({ input }) => {
				stubLog("auth", "persistToken", input);
				return { success: true };
			}),

		onTokenChanged: publicProcedure.subscription(() => {
			stubLog("auth", "onTokenChanged");
			return observable<{ token: string; expiresAt: string } | null>(() => {
				return () => {};
			});
		}),

		signIn: publicProcedure
			.input(z.object({ provider: z.enum(["github", "google"] as const) }))
			.mutation(({ input }) => {
				stubLog("auth", "signIn", input);
				return { success: true };
			}),

		signOut: publicProcedure.mutation(() => {
			stubLog("auth", "signOut");
			return { success: true };
		}),
	});
};

export type AuthRouter = ReturnType<typeof createAuthRouter>;
