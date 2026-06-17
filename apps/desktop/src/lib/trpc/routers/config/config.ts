import type { SetupAction, SetupDetectionResult } from "shared/types/config";
import { z } from "zod";
import { publicProcedure, router } from "../..";
import {
	stubLog,
	STUB_PROJECTS,
} from "../../stub-data";
import { loadSetupConfig } from "../workspaces/utils/setup";

export const createConfigRouter = () => {
	return router({
		shouldShowSetupCard: publicProcedure
			.input(z.object({ projectId: z.string() }))
			.query(async ({ input }) => {
				stubLog("config", "shouldShowSetupCard", input);
				return false;
			}),

		dismissSetupCard: publicProcedure
			.input(z.object({ projectId: z.string() }))
			.mutation(({ input }) => {
				stubLog("config", "dismissSetupCard", input);
				return { success: true };
			}),

		getConfigFilePath: publicProcedure
			.input(z.object({ projectId: z.string() }))
			.query(({ input }) => {
				stubLog("config", "getConfigFilePath", input);
				return "/mock/.superset/config.json";
			}),

		getConfigContent: publicProcedure
			.input(z.object({ projectId: z.string() }))
			.query(({ input }) => {
				stubLog("config", "getConfigContent", input);
				return { content: '{"setup":[],"teardown":[],"run":[]}', exists: true };
			}),

		getSetupOnboardingDefaults: publicProcedure
			.input(z.object({ projectId: z.string() }))
			.query(async ({ input }): Promise<SetupDetectionResult> => {
				stubLog("config", "getSetupOnboardingDefaults", input);
				return {
					projectSummary: "Mock project summary.",
					actions: [],
					setupTemplate: [],
					signals: {},
				};
			}),

		updateConfig: publicProcedure
			.input(
				z.object({
					projectId: z.string(),
					setup: z.array(z.string()),
					teardown: z.array(z.string()),
					run: z.array(z.string()).optional(),
				}),
			)
			.mutation(({ input }) => {
				stubLog("config", "updateConfig", input);
				return { success: true };
			}),
	});
};

export type ConfigRouter = ReturnType<typeof createConfigRouter>;
