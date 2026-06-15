import type { TRPCRouterRecord } from "@trpc/server";
import { z } from "zod";
import { protectedProcedure } from "../../../trpc";

export const githubRouter = {
	getInstallation: protectedProcedure
		.input(z.object({ organizationId: z.string().uuid() }))
		.query(() => null),

	disconnect: protectedProcedure
		.input(z.object({ organizationId: z.string().uuid() }))
		.mutation(() => ({ success: true })),

	triggerSync: protectedProcedure
		.input(z.object({ organizationId: z.string().uuid() }))
		.mutation(() => ({ success: true })),

	listRepositories: protectedProcedure
		.input(z.object({ organizationId: z.string().uuid() }))
		.query(() => []),

	listPullRequests: protectedProcedure
		.input(
			z.object({
				organizationId: z.string().uuid(),
				repositoryId: z.string().uuid().optional(),
				state: z.enum(["open", "closed", "all"]).optional().default("open"),
			}),
		)
		.query(() => []),

	getStats: protectedProcedure
		.input(z.object({ organizationId: z.string().uuid() }))
		.query(() => ({
			repositoryCount: 0,
			openPullRequestCount: 0,
			pendingChecksCount: 0,
			failedChecksCount: 0,
		})),
} satisfies TRPCRouterRecord;
