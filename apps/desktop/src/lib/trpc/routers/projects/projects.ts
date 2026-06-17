import {
	BRANCH_PREFIX_MODES,
	EXTERNAL_APPS,
} from "@superset/local-db";
import { z } from "zod";
import { publicProcedure, router } from "../..";
import { stubLog, STUB_PROJECTS } from "../../stub-data";

type Project = (typeof STUB_PROJECTS)[number];

type OpenNewCanceled = { canceled: true };
type OpenNewError = { canceled: false; error: string };
type OpenNewResult =
	| OpenNewCanceled
	| { canceled: false; project: Project }
	| { canceled: false; needsGitInit: true; selectedPath: string }
	| OpenNewError;

type FolderOutcome =
	| { status: "success"; project: Project }
	| { status: "needsGitInit"; selectedPath: string }
	| { status: "error"; selectedPath: string; error: string };

type OpenNewMultiResult =
	| OpenNewCanceled
	| { canceled: false; multi: true; results: FolderOutcome[] }
	| OpenNewError;

export const createProjectsRouter = (getWindow: () => BrowserWindow | null) => {
	return router({
		get: publicProcedure
			.input(z.object({ id: z.string() }))
			.query(({ input }): Project => {
				stubLog("projects", "get", input);
				return STUB_PROJECTS[0];
			}),

		getDefaultApp: publicProcedure
			.input(z.object({ projectId: z.string() }))
			.query(({ input }) => {
				stubLog("projects", "getDefaultApp", input);
				return null;
			}),

		getRecents: publicProcedure.query((): Project[] => {
			stubLog("projects", "getRecents");
			return STUB_PROJECTS;
		}),

		listPullRequests: publicProcedure
			.input(
				z.object({
					projectId: z.string(),
					includeClosed: z.boolean().optional(),
				}),
			)
			.query(async ({ input }) => {
				stubLog("projects", "listPullRequests", input);
				return [];
			}),

		searchPullRequests: publicProcedure
			.input(
				z.object({
					projectId: z.string(),
					query: z.string(),
					includeClosed: z.boolean().optional(),
				}),
			)
			.query(async ({ input }) => {
				stubLog("projects", "searchPullRequests", input);
				return [];
			}),

		listIssues: publicProcedure
			.input(
				z.object({
					projectId: z.string(),
					includeClosed: z.boolean().optional(),
				}),
			)
			.query(async ({ input }) => {
				stubLog("projects", "listIssues", input);
				return [];
			}),

		getIssueContent: publicProcedure
			.input(
				z.object({
					projectId: z.string(),
					issueNumber: z.number().int().positive(),
				}),
			)
			.query(async ({ input }) => {
				stubLog("projects", "getIssueContent", input);
				return {
					number: input.issueNumber,
					title: "Mock Issue Title",
					body: "Mock issue body content",
					url: "https://github.com/mock/repo/issues/1",
					state: "open" as const,
					author: "mock-author",
					createdAt: "2024-01-01T00:00:00Z",
					updatedAt: "2024-01-01T00:00:00Z",
				};
			}),

		selectDirectory: publicProcedure
			.input(
				z.object({
					defaultPath: z.string().optional(),
				}),
			)
			.mutation(async ({ input }) => {
				stubLog("projects", "selectDirectory", input);
				return { canceled: false as const, path: "/mock/path" };
			}),

		getBranchesLocal: publicProcedure
			.input(z.object({ projectId: z.string() }))
			.query(
				async ({
					input,
				}): Promise<{
					branches: Array<{
						name: string;
						lastCommitDate: number;
						isLocal: boolean;
						isRemote: boolean;
					}>;
					defaultBranch: string;
				}> => {
					stubLog("projects", "getBranchesLocal", input);
					return { branches: [], defaultBranch: "main" };
				},
			),

		getBranches: publicProcedure
			.input(z.object({ projectId: z.string() }))
			.query(
				async ({
					input,
				}): Promise<{
					branches: Array<{
						name: string;
						lastCommitDate: number;
						isLocal: boolean;
						isRemote: boolean;
					}>;
					defaultBranch: string;
				}> => {
					stubLog("projects", "getBranches", input);
					return { branches: [], defaultBranch: "main" };
				},
			),

		searchBranches: publicProcedure
			.input(
				z.object({
					projectId: z.string(),
					search: z.string().default(""),
					limit: z.number().min(1).max(5000).default(50),
					offset: z.number().min(0).default(0),
				}),
			)
			.query(
				async ({
					input,
				}): Promise<{
					branches: Array<{
						name: string;
						lastCommitDate: number;
						isLocal: boolean;
						isRemote: boolean;
					}>;
					defaultBranch: string;
					totalCount: number;
					hasMore: boolean;
				}> => {
					stubLog("projects", "searchBranches", input);
					return { branches: [], defaultBranch: "main", totalCount: 0, hasMore: false };
				},
			),

		openNew: publicProcedure.mutation(async (): Promise<OpenNewMultiResult> => {
			stubLog("projects", "openNew");
			return {
				canceled: false,
				multi: true,
				results: [{ status: "success", project: STUB_PROJECTS[0] }],
			};
		}),

		openFromPath: publicProcedure
			.input(z.object({ path: z.string() }))
			.mutation(async ({ input }): Promise<OpenNewResult> => {
				stubLog("projects", "openFromPath", input);
				return { canceled: false, project: STUB_PROJECTS[0] };
			}),

		initGitAndOpen: publicProcedure
			.input(z.object({ path: z.string() }))
			.mutation(async ({ input }) => {
				stubLog("projects", "initGitAndOpen", input);
				return { project: STUB_PROJECTS[0] };
			}),

		cloneRepo: publicProcedure
			.input(
				z.object({
					url: z
						.string()
						.min(1)
						.refine(
							(val) => {
								try {
									const parsed = new URL(val);
									return ["http:", "https:", "ssh:", "git:"].includes(parsed.protocol);
								} catch {
									return /^[\w.-]+@[\w.-]+:[\w./-]+$/.test(val);
								}
							},
							{ message: "Must be a valid Git URL (HTTPS or SSH)" },
						),
					targetDirectory: z
						.string()
						.trim()
						.optional()
						.transform((v) => (v && v.length > 0 ? v : undefined)),
				}),
			)
			.mutation(async ({ input }) => {
				stubLog("projects", "cloneRepo", input);
				return { canceled: false, success: true, project: STUB_PROJECTS[0] };
			}),

		createEmptyRepo: publicProcedure
			.input(
				z.object({
					name: z
						.string()
						.min(1)
						.refine(
							(val) => /^[a-zA-Z0-9._\- ]+$/.test(val) && !/^\.+$/.test(val),
							{
								message:
									"Name can only contain letters, numbers, dots, underscores, hyphens, and spaces",
							},
						),
					parentDir: z.string().min(1),
				}),
			)
			.mutation(async ({ input }) => {
				stubLog("projects", "createEmptyRepo", input);
				return { canceled: false, success: true, project: STUB_PROJECTS[0] };
			}),

		update: publicProcedure
			.input(
				z.object({
					id: z.string(),
					patch: z.object({
						name: z.string().trim().min(1).optional(),
						color: z
							.string()
							.refine(
								(value) => ["#ff0000", "#00ff00", "#0000ff", "#ffff00", "#ff00ff", "#00ffff"].includes(value),
								"Invalid project color",
							)
							.optional(),
						branchPrefixMode: z.enum(BRANCH_PREFIX_MODES).nullable().optional(),
						branchPrefixCustom: z.string().nullable().optional(),
						workspaceBaseBranch: z.string().nullable().optional(),
						worktreeBaseDir: z.string().nullable().optional(),
						hideImage: z.boolean().optional(),
						defaultApp: z.enum(EXTERNAL_APPS).nullable().optional(),
					}),
				}),
			)
			.mutation(({ input }) => {
				stubLog("projects", "update", input);
				return { success: true };
			}),

		reorder: publicProcedure
			.input(
				z.object({
					fromIndex: z.number(),
					toIndex: z.number(),
				}),
			)
			.mutation(({ input }) => {
				stubLog("projects", "reorder", input);
				return { success: true };
			}),

		refreshDefaultBranch: publicProcedure
			.input(z.object({ id: z.string() }))
			.mutation(async ({ input }) => {
				stubLog("projects", "refreshDefaultBranch", input);
				return { success: true };
			}),

		close: publicProcedure
			.input(z.object({ id: z.string() }))
			.mutation(async ({ input }) => {
				stubLog("projects", "close", input);
				return { success: true, terminalWarning: undefined };
			}),

		linkToNeon: publicProcedure
			.input(z.object({ id: z.string(), neonProjectId: z.string() }))
			.mutation(({ input }) => {
				stubLog("projects", "linkToNeon", input);
				return { success: true };
			}),

		getGitHubAvatar: publicProcedure
			.input(z.object({ id: z.string() }))
			.query(async ({ input }) => {
				stubLog("projects", "getGitHubAvatar", input);
				return null;
			}),

		getGitAuthor: publicProcedure
			.input(z.object({ id: z.string() }))
			.query(async ({ input }) => {
				stubLog("projects", "getGitAuthor", input);
				return null;
			}),

		triggerFaviconDiscovery: publicProcedure
			.input(z.object({ id: z.string() }))
			.mutation(async ({ input }) => {
				stubLog("projects", "triggerFaviconDiscovery", input);
				return { iconUrl: null };
			}),

		setProjectIcon: publicProcedure
			.input(
				z.object({
					id: z.string(),
					icon: z.string().nullable(),
				}),
			)
			.mutation(async ({ input }) => {
				stubLog("projects", "setProjectIcon", input);
				return { iconUrl: null };
			}),
	});
};

export type ProjectsRouter = ReturnType<typeof createProjectsRouter>;
