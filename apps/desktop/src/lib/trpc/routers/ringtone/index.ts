import { z } from "zod";
import { publicProcedure, router } from "../..";
import { stubLog } from "../../stub-data";

export const createRingtoneRouter = () => {
	return router({
		preview: publicProcedure
			.input(
				z.object({
					ringtoneId: z.string(),
					volume: z.number().min(0).max(100).optional(),
				}),
			)
			.mutation(({ input }) => {
				stubLog("ringtone", "preview", input);
				return { success: true as const };
			}),

		playNotification: publicProcedure
			.input(
				z.object({
					ringtoneId: z.string(),
					volume: z.number().min(0).max(100).optional(),
				}),
			)
			.mutation(({ input }) => {
				stubLog("ringtone", "playNotification", input);
				return { success: true as const };
			}),

		stop: publicProcedure.mutation(() => {
			stubLog("ringtone", "stop");
			return { success: true as const };
		}),

		getCustom: publicProcedure.query(() => {
			stubLog("ringtone", "getCustom");
			return null;
		}),

		importCustom: publicProcedure.mutation(() => {
			stubLog("ringtone", "importCustom");
			return { canceled: false as const, ringtone: null };
		}),
	});
};
