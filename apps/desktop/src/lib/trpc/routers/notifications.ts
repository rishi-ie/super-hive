import type { V2NotificationSourceFocusTarget } from "shared/notification-types";
import { z } from "zod";
import { publicProcedure, router } from "..";
import { stubLog, stubObservable } from "../../stub-data";

type NotificationEvent =
	| {
			type: "agent-lifecycle";
			data?: unknown;
	  }
	| { type: "focus-tab"; data?: unknown }
	| {
			type: "focus-v2-notification-source";
			data?: V2NotificationSourceFocusTarget;
	  }
	| { type: "terminal-exit"; data?: unknown };

const v2NotificationSourceSchema = z.discriminatedUnion("type", [
	z.object({ type: z.literal("terminal"), id: z.string().min(1) }),
	z.object({ type: z.literal("chat"), id: z.string().min(1) }),
]);

const showNativeInputSchema = z.object({
	title: z.string().min(1),
	body: z.string(),
	silent: z.boolean().default(true),
	clickTarget: z
		.object({
			workspaceId: z.string().min(1),
			source: v2NotificationSourceSchema,
		})
		.optional(),
});

export const createNotificationsRouter = () => {
	return router({
		showNative: publicProcedure
			.input(showNativeInputSchema)
			.mutation(({ input }) => {
				stubLog("notifications", "showNative", input);
				return { success: true };
			}),

		subscribe: publicProcedure.subscription(() => {
			stubLog("notifications", "subscribe");
			return stubObservable<NotificationEvent>();
		}),
	});
};
