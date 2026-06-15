import type {
	SelectAgentCommand,
	SelectAutomation,
	SelectAutomationRun,
	SelectChatSession,
	SelectGithubPullRequest,
	SelectGithubRepository,
	SelectIntegrationConnection,
	SelectInvitation,
	SelectMember,
	SelectOrganization,
	SelectProject,
	SelectSubscription,
	SelectTask,
	SelectTaskStatus,
	SelectTeam,
	SelectTeamMember,
	SelectUser,
	SelectV2Client,
	SelectV2Host,
	SelectV2Project,
	SelectV2UsersHosts,
	SelectV2Workspace,
	SelectWorkspace,
} from "@superset/db/schema";
import type { AppRouter as HostServiceAppRouter } from "@superset/host-service";
import type { AppRouter } from "@superset/trpc";
import { BasicIndex } from "@tanstack/db";
import type {
	Collection,
	LocalStorageCollectionUtils,
} from "@tanstack/react-db";
import {
	createCollection,
	localStorageCollectionOptions,
} from "@tanstack/react-db";
import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";
import type { inferRouterOutputs } from "@trpc/server";
import { env } from "renderer/env.renderer";
import {
	authClient,
	getAuthToken,
	getJwt,
	setJwt,
} from "renderer/lib/auth-client";
import { getHostServiceClientByUrl } from "renderer/lib/host-service-client";
import superjson from "superjson";
import { z } from "zod";
import {
	type DashboardSidebarProjectRow,
	type DashboardSidebarSectionRow,
	dashboardSidebarProjectSchema,
	dashboardSidebarSectionSchema,
	type FailedWorkspaceCreateRow,
	failedWorkspaceCreateSchema,
	healV2UserPreferences,
	healWorkspaceLocalState,
	type V2TerminalPresetRow,
	type V2UserPreferencesRow,
	v2TerminalPresetSchema,
	v2UserPreferencesSchema,
	type WorkspaceLocalStateRow,
	type WorkspacesCreateInput,
	workspaceLocalStateSchema,
} from "./dashboardSidebarLocal";
import { withReadHeal } from "./withReadHeal";




type HostWorkspacesCreateResult =
	inferRouterOutputs<HostServiceAppRouter>["workspaces"]["create"];

export interface WorkspaceCreateMutationMetadata {
	hostUrl: string;
	input: WorkspacesCreateInput;
	result?: HostWorkspacesCreateResult;
	[key: string]: unknown;
}


const indexDefaults = {
	autoIndex: "eager",
	defaultIndexType: BasicIndex,
} as const;
const basicIndexConfig = { indexType: BasicIndex } as const;

const createIndexedCollection = ((
	config: Parameters<typeof createCollection>[0],
) =>
	createCollection({ ...config, ...indexDefaults })) as typeof createCollection;

const createLocalCollection = <T extends object>(
	config: Parameters<typeof localStorageCollectionOptions>[0] & { itemType?: T },
) =>
	createIndexedCollection(
		localStorageCollectionOptions({
			...config,
			// biome-ignore lint/suspicious/noExplicitAny: local storage requires explicit type
		}) as any,
	) as any;


const apiKeyDisplaySchema = z.object({
	id: z.string(),
	name: z.string().nullable(),
	start: z.string().nullable(),
	createdAt: z.coerce.date(),
	lastRequest: z.coerce.date().nullable(),
});

type ApiKeyDisplay = z.infer<typeof apiKeyDisplaySchema>;

type IntegrationConnectionDisplay = Omit<
	SelectIntegrationConnection,
	"accessToken" | "refreshToken"
>;

export interface OrgCollections {
	tasks: Collection<SelectTask>;
	taskStatuses: Collection<SelectTaskStatus>;
	projects: Collection<SelectProject>;
	v2Hosts: Collection<SelectV2Host>;
	v2Clients: Collection<SelectV2Client>;
	v2UsersHosts: Collection<SelectV2UsersHosts>;
	v2Projects: Collection<SelectV2Project>;
	v2Workspaces: Collection<SelectV2Workspace>;
	workspaces: Collection<SelectWorkspace>;
	members: Collection<SelectMember>;
	users: Collection<SelectUser>;
	invitations: Collection<SelectInvitation>;
	teams: Collection<SelectTeam>;
	teamMembers: Collection<SelectTeamMember>;
	agentCommands: Collection<SelectAgentCommand>;
	integrationConnections: Collection<IntegrationConnectionDisplay>;
	subscriptions: Collection<SelectSubscription>;
	apiKeys: Collection<ApiKeyDisplay>;
	chatSessions: Collection<SelectChatSession>;
	githubRepositories: Collection<SelectGithubRepository>;
	githubPullRequests: Collection<SelectGithubPullRequest>;
	automations: Collection<SelectAutomation>;
	automationRuns: Collection<SelectAutomationRun>;
	v2SidebarProjects: Collection<
		DashboardSidebarProjectRow,
		string,
		LocalStorageCollectionUtils,
		typeof dashboardSidebarProjectSchema,
		z.input<typeof dashboardSidebarProjectSchema>
	>;
	v2WorkspaceLocalState: Collection<
		WorkspaceLocalStateRow,
		string,
		LocalStorageCollectionUtils,
		typeof workspaceLocalStateSchema,
		z.input<typeof workspaceLocalStateSchema>
	>;
	v2SidebarSections: Collection<
		DashboardSidebarSectionRow,
		string,
		LocalStorageCollectionUtils,
		typeof dashboardSidebarSectionSchema,
		z.input<typeof dashboardSidebarSectionSchema>
	>;
	v2TerminalPresets: Collection<
		V2TerminalPresetRow,
		string,
		LocalStorageCollectionUtils,
		typeof v2TerminalPresetSchema,
		z.input<typeof v2TerminalPresetSchema>
	>;
	v2UserPreferences: Collection<
		V2UserPreferencesRow,
		string,
		LocalStorageCollectionUtils,
		typeof v2UserPreferencesSchema,
		z.input<typeof v2UserPreferencesSchema>
	>;
	failedWorkspaceCreates: Collection<
		FailedWorkspaceCreateRow,
		string,
		LocalStorageCollectionUtils,
		typeof failedWorkspaceCreateSchema,
		z.input<typeof failedWorkspaceCreateSchema>
	>;
}

// Per-org collections cache
const collectionsCache = new Map<string, OrgCollections>();

function getCollectionsCacheKey(organizationId: string): string {
	return organizationId;
}

// Singleton API client with dynamic auth headers
const apiClient = createTRPCProxyClient<AppRouter>({
	links: [
		httpBatchLink({
			url: `${env.NEXT_PUBLIC_API_URL}/api/trpc`,
			headers: () => {
				const token = getAuthToken();
				return token ? { Authorization: `Bearer ${token}` } : {};
			},
			transformer: superjson,
		}),
	],
});


const organizationsCollection = createLocalCollection({
	id: "organizations",
	storageKey: "organizations",
	getKey: (item) => item.id,
});

function createOrgCollections(organizationId: string): OrgCollections {
	const tasks = createLocalCollection({
		id: `tasks-${organizationId}`,
		storageKey: `tasks-${organizationId}`,
		getKey: (item) => item.id,
	});

	const taskStatuses = createLocalCollection({
		id: `task_statuses-${organizationId}`,
		storageKey: `task_statuses-${organizationId}`,
		getKey: (item) => item.id,
	});

	const projects = createLocalCollection({
		id: `projects-${organizationId}`,
		storageKey: `projects-${organizationId}`,
		getKey: (item) => item.id,
	});

	const v2Projects = createLocalCollection({
		id: `v2_projects-${organizationId}`,
		storageKey: `v2_projects-${organizationId}`,
		getKey: (item) => item.id,
	});
	v2Projects.createIndex(
		(project) => project.githubRepositoryId,
		basicIndexConfig,
	);

	const v2Hosts = createLocalCollection({
		id: `v2_hosts-${organizationId}`,
		storageKey: `v2_hosts-${organizationId}`,
		getKey: (item) => item.machineId,
	});
	v2Hosts.createIndex((host) => host.machineId, basicIndexConfig);

	const v2Clients = createLocalCollection({
		id: `v2_clients-${organizationId}`,
		storageKey: `v2_clients-${organizationId}`,
		getKey: (item) => `${item.userId}:${item.machineId}`,
	});

	const v2UsersHosts = createLocalCollection({
		id: `v2_users_hosts-${organizationId}`,
		storageKey: `v2_users_hosts-${organizationId}`,
		getKey: (item) => `${item.userId}:${item.hostId}`,
	});
	v2UsersHosts.createIndex((userHost) => userHost.hostId, basicIndexConfig);
	v2UsersHosts.createIndex((userHost) => userHost.userId, basicIndexConfig);

	const v2Workspaces = createLocalCollection({
		id: `v2_workspaces-${organizationId}`,
		storageKey: `v2_workspaces-${organizationId}`,
		getKey: (item) => item.id,
	});
	v2Workspaces.createIndex((workspace) => workspace.hostId, basicIndexConfig);
	v2Workspaces.createIndex(
		(workspace) => workspace.projectId,
		basicIndexConfig,
	);
	v2Workspaces.createIndex((workspace) => workspace.type, basicIndexConfig);

	const workspaces = createLocalCollection({
		id: `workspaces-${organizationId}`,
		storageKey: `workspaces-${organizationId}`,
		getKey: (item) => item.id,
	});

	const members = createLocalCollection({
		id: `members-${organizationId}`,
		storageKey: `members-${organizationId}`,
		getKey: (item) => item.id,
	});

	const users = createLocalCollection({
		id: `users-${organizationId}`,
		storageKey: `users-${organizationId}`,
		getKey: (item) => item.id,
	});

	const invitations = createLocalCollection({
		id: `invitations-${organizationId}`,
		storageKey: `invitations-${organizationId}`,
		getKey: (item) => item.id,
	});

	const teams = createLocalCollection({
		id: `teams-${organizationId}`,
		storageKey: `teams-${organizationId}`,
		getKey: (item) => item.id,
	});

	const teamMembers = createLocalCollection({
		id: `team_members-${organizationId}`,
		storageKey: `team_members-${organizationId}`,
		getKey: (item) => item.id,
	});

	const agentCommands = createLocalCollection({
		id: `agent_commands-${organizationId}`,
		storageKey: `agent_commands-${organizationId}`,
		getKey: (item) => item.id,
	});

	const integrationConnections = createLocalCollection({
		id: `integration_connections-${organizationId}`,
		storageKey: `integration_connections-${organizationId}`,
		getKey: (item) => item.id,
	});

	const subscriptions = createLocalCollection({
		id: `subscriptions-${organizationId}`,
		storageKey: `subscriptions-${organizationId}`,
		getKey: (item) => item.id,
	});

	const apiKeys = createLocalCollection({
		id: `api_keys-${organizationId}`,
		storageKey: `api_keys-${organizationId}`,
		getKey: (item) => item.id,
	});

	const chatSessions = createLocalCollection({
		id: `chat_sessions-${organizationId}`,
		storageKey: `chat_sessions-${organizationId}`,
		getKey: (item) => item.id,
	});

	const githubRepositories = createLocalCollection({
		id: `github_repositories-${organizationId}`,
		storageKey: `github_repositories-${organizationId}`,
		getKey: (item) => item.id,
	});

	const githubPullRequests = createLocalCollection({
		id: `github_pull_requests-${organizationId}`,
		storageKey: `github_pull_requests-${organizationId}`,
		getKey: (item) => item.id,
	});

	const automations = createLocalCollection({
		id: `automations-${organizationId}`,
		storageKey: `automations-${organizationId}`,
		getKey: (item) => item.id,
	});

	const automationRuns = createLocalCollection({
		id: `automation_runs-${organizationId}`,
		storageKey: `automation_runs-${organizationId}`,
		getKey: (item) => item.id,
	});

	const v2SidebarProjects = createIndexedCollection(
		localStorageCollectionOptions({
			id: `v2_sidebar_projects-${organizationId}`,
			storageKey: `v2-sidebar-projects-${organizationId}`,
			schema: dashboardSidebarProjectSchema,
			getKey: (item) => item.projectId,
		}),
	);
	v2SidebarProjects.createIndex(
		(sidebarProject) => sidebarProject.tabOrder,
		basicIndexConfig,
	);

	const v2WorkspaceLocalState = createIndexedCollection(
		localStorageCollectionOptions(
			withReadHeal(
				{
					id: `v2_workspace_local_state-${organizationId}`,
					storageKey: `v2-workspace-local-state-${organizationId}`,
					schema: workspaceLocalStateSchema,
					// Explicit type so `withReadHeal`'s passthrough generic keeps the
					// linkage between schema and getKey for downstream inference.
					getKey: (item: WorkspaceLocalStateRow) => item.workspaceId,
				},
				healWorkspaceLocalState,
			),
		),
	);
	v2WorkspaceLocalState.createIndex(
		(localState) => localState.sidebarState.projectId,
		basicIndexConfig,
	);
	v2WorkspaceLocalState.createIndex(
		(localState) => localState.sidebarState.sectionId,
		basicIndexConfig,
	);
	v2WorkspaceLocalState.createIndex(
		(localState) => localState.sidebarState.tabOrder,
		basicIndexConfig,
	);

	const v2SidebarSections = createIndexedCollection(
		localStorageCollectionOptions({
			id: `v2_sidebar_sections-${organizationId}`,
			storageKey: `v2-sidebar-sections-${organizationId}`,
			schema: dashboardSidebarSectionSchema,
			getKey: (item) => item.sectionId,
		}),
	);
	v2SidebarSections.createIndex(
		(section) => section.projectId,
		basicIndexConfig,
	);
	v2SidebarSections.createIndex(
		(section) => section.tabOrder,
		basicIndexConfig,
	);

	const v2TerminalPresets = createIndexedCollection(
		localStorageCollectionOptions({
			id: `v2_terminal_presets-${organizationId}`,
			storageKey: `v2-terminal-presets-${organizationId}`,
			schema: v2TerminalPresetSchema,
			getKey: (item) => item.id,
		}),
	);

	const v2UserPreferences = createCollection(
		localStorageCollectionOptions(
			withReadHeal(
				{
					id: `v2_user_preferences-${organizationId}`,
					storageKey: `v2-user-preferences-${organizationId}`,
					schema: v2UserPreferencesSchema,
					// Cast widens the inferred literal "preferences" key to string so
					// the collection slots into the shared OrgCollections.{...<TKey=string>}
					// shape alongside the other v2 collections. Explicit `item` type so
					// `withReadHeal`'s passthrough generic keeps schema/getKey linkage.
					getKey: (item: V2UserPreferencesRow) => item.id as string,
				},
				healV2UserPreferences,
			),
		),
	);

	const failedWorkspaceCreates = createIndexedCollection(
		localStorageCollectionOptions({
			id: `failed_workspace_creates-${organizationId}`,
			storageKey: `failed-workspace-creates-${organizationId}`,
			schema: failedWorkspaceCreateSchema,
			getKey: (item) => item.id,
		}),
	);

	return {
		tasks,
		taskStatuses,
		projects,
		v2Hosts,
		v2Clients,
		v2UsersHosts,
		v2Projects,
		v2Workspaces,
		workspaces,
		members,
		users,
		invitations,
		teams,
		teamMembers,
		agentCommands,
		integrationConnections,
		subscriptions,
		apiKeys,
		chatSessions,
		githubRepositories,
		githubPullRequests,
		automations,
		automationRuns,
		v2SidebarProjects,
		v2WorkspaceLocalState,
		v2SidebarSections,
		v2TerminalPresets,
		v2UserPreferences,
		failedWorkspaceCreates,
	} as OrgCollections;
}

/**
 * Preload collections for an organization by starting Electric sync.
 * Collections are lazy — they don't fetch data until subscribed or preloaded.
 * Call this eagerly so data is ready when the user switches orgs.
 */
export async function preloadCollections(
	organizationId: string,
): Promise<void> {
	const collections = getCollections(organizationId);
	const collectionsToPreload = Object.entries(collections)
		.filter(([name]) => name !== "organizations")
		.map(([, collection]) => collection as Collection<object>);

	await Promise.allSettled(
		collectionsToPreload.map((c) => (c as Collection<object>).preload()),
	);
}

/**
 * Get collections for an organization, creating them if needed.
 * Collections are cached per org for instant switching.
 * Auth token is read dynamically via getAuthToken() - no need to pass it.
 */
export function getCollections(organizationId: string) {
	const cacheKey = getCollectionsCacheKey(organizationId);

	// Get or create org-specific collections
	if (!collectionsCache.has(cacheKey)) {
		collectionsCache.set(cacheKey, createOrgCollections(organizationId));
	}

	const orgCollections = collectionsCache.get(cacheKey);
	if (!orgCollections) {
		throw new Error(`Collections not found for org: ${organizationId}`);
	}

	return {
		...orgCollections,
		organizations: organizationsCollection,
	};
}

export type AppCollections = ReturnType<typeof getCollections>;
