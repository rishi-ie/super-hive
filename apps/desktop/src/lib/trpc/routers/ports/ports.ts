import type { DetectedPort } from "shared/types";
import { z } from "zod";
import { publicProcedure, router } from "../..";
import { stubLog, stubObservable } from "../../stub-data";

type PortEvent =
	| { type: "add"; port: DetectedPort }
	| { type: "remove"; port: DetectedPort };

export const createPortsRouter = () => {
	return router({
		getAll: publicProcedure.query(() => {
			stubLog("ports", "getAll");
			return [];
		}),

		subscribe: publicProcedure.subscription(() => {
			stubLog("ports", "subscribe");
			return stubObservable<PortEvent>();
		}),

		kill: publicProcedure
			.input(
				z.object({
					workspaceId: z.string(),
					terminalId: z.string(),
					port: z.number().int().positive(),
				}),
			)
			.mutation(({ input }) => {
				stubLog("ports", "kill", input);
				return { success: true };
			}),
	});
};
