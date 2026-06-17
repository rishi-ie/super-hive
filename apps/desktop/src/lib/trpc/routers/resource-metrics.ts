import { z } from "zod";
import { publicProcedure, router } from "..";
import {
	resourceMetricsSnapshotSchema,
	validateResourceMetricsSnapshot,
} from "./resource-metrics.schema";
import { stubLog } from "../../stub-data";

const getSnapshotInputSchema = z
	.object({
		mode: z.enum(["interactive", "idle"]).optional(),
		force: z.boolean().optional(),
		surface: z.enum(["v1", "v2"]).optional(),
		organizationId: z.string().optional(),
	})
	.optional();

export const createResourceMetricsRouter = () => {
	return router({
		getSnapshot: publicProcedure
			.input(getSnapshotInputSchema)
			.output(resourceMetricsSnapshotSchema)
			.query(({ input }) => {
				stubLog("resource-metrics", "getSnapshot", input);
				const fallback = validateResourceMetricsSnapshot({
					app: {
						cpu: 0,
						memory: 0,
						main: { cpu: 0, memory: 0 },
						renderer: { cpu: 0, memory: 0 },
						other: { cpu: 0, memory: 0 },
					},
					workspaces: [],
					host: {
						totalMemory: 0,
						freeMemory: 0,
						usedMemory: 0,
						memoryUsagePercent: 0,
						cpuCoreCount: 1,
						loadAverage1m: 0,
					},
					totalCpu: 0,
					totalMemory: 0,
					collectedAt: Date.now(),
				});
				return fallback.snapshot;
			}),
	});
};
