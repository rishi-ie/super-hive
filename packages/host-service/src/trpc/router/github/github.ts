import { z } from "zod";
import { protectedProcedure, router } from "../../index";

const stubPR = {
	number: 0,
	title: "stub",
	state: "open",
	html_url: "",
	created_at: new Date().toISOString(),
	updated_at: new Date().toISOString(),
	merged_at: null,
	user: { login: "stub", avatar_url: "" },
	head: { ref: "stub", sha: "stub" },
	base: { ref: "main", sha: "stub" },
};

const stubRepo = {
	id: 0,
	name: "stub",
	full_name: "stub/stub",
	owner: { login: "stub", avatar_url: "" },
	html_url: "",
	description: null,
	private: false,
	fork: false,
	default_branch: "main",
};

const stubUser = {
	login: "stub",
	id: 0,
	avatar_url: "",
	html_url: "",
	type: "User",
};

const stubMerge = {
	merged: false,
	message: "stub",
	sha: "stub",
};

export const githubRouter = router({
	getPRStatus: protectedProcedure
		.input(
			z.object({
				owner: z.string(),
				repo: z.string(),
				branch: z.string(),
			}),
		)
		.query(() => null),

	getPR: protectedProcedure
		.input(
			z.object({
				owner: z.string(),
				repo: z.string(),
				pullNumber: z.number(),
			}),
		)
		.query(() => stubPR),

	listPRs: protectedProcedure
		.input(
			z.object({
				owner: z.string(),
				repo: z.string(),
				state: z.enum(["open", "closed", "all"]).default("open"),
				sort: z
					.enum(["created", "updated", "popularity", "long-running"])
					.default("updated"),
				direction: z.enum(["asc", "desc"]).default("desc"),
				perPage: z.number().min(1).max(100).default(30),
				page: z.number().min(1).default(1),
			}),
		)
		.query(() => []),

	getRepo: protectedProcedure
		.input(
			z.object({
				owner: z.string(),
				repo: z.string(),
			}),
		)
		.query(() => stubRepo),

	listDeployments: protectedProcedure
		.input(
			z.object({
				owner: z.string(),
				repo: z.string(),
				environment: z.string().optional(),
				ref: z.string().optional(),
				perPage: z.number().min(1).max(100).default(10),
			}),
		)
		.query(() => []),

	listDeploymentStatuses: protectedProcedure
		.input(
			z.object({
				owner: z.string(),
				repo: z.string(),
				deploymentId: z.number(),
				perPage: z.number().min(1).max(100).default(10),
			}),
		)
		.query(() => []),

	getUser: protectedProcedure.query(() => stubUser),

	mergePR: protectedProcedure
		.input(
			z.object({
				owner: z.string(),
				repo: z.string(),
				pullNumber: z.number(),
				mergeMethod: z.enum(["merge", "squash", "rebase"]).default("merge"),
			}),
		)
		.mutation(() => stubMerge),
});
