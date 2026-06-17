import { router } from "../index";
import { observable } from "@trpc/server/observable";
import { initTRPC } from "@trpc/server";

const t = initTRPC.create();

const stubAgentsRouter = t.router({
	list: t.procedure.query(() => {
		console.info("[STUB] hostService.agents.list");
		return [];
	}),
	getById: t.procedure.query(() => {
		console.info("[STUB] hostService.agents.getById");
		return null;
	}),
});

const stubAttachmentsRouter = t.router({
	list: t.procedure.query(() => {
		console.info("[STUB] hostService.attachments.list");
		return [];
	}),
	upload: t.procedure.mutation(() => {
		console.info("[STUB] hostService.attachments.upload");
		return { success: true };
	}),
});

const stubAuthRouter = t.router({
	getStatus: t.procedure.query(() => {
		console.info("[STUB] hostService.auth.getStatus");
		return { authenticated: false };
	}),
	login: t.procedure.mutation(() => {
		console.info("[STUB] hostService.auth.login");
		return { success: true };
	}),
	logout: t.procedure.mutation(() => {
		console.info("[STUB] hostService.auth.logout");
		return { success: true };
	}),
});

const stubHealthRouter = t.router({
	check: t.procedure.query(() => {
		console.info("[STUB] hostService.health.check");
		return { status: "ok" };
	}),
});

const stubHostRouter = t.router({
	getInfo: t.procedure.query(() => {
		console.info("[STUB] hostService.host.getInfo");
		return null;
	}),
});

const stubChatRouter = t.router({
	list: t.procedure.query(() => {
		console.info("[STUB] hostService.chat.list");
		return [];
	}),
	getMessages: t.procedure.query(() => {
		console.info("[STUB] hostService.chat.getMessages");
		return [];
	}),
	sendMessage: t.procedure.mutation(() => {
		console.info("[STUB] hostService.chat.sendMessage");
		return { success: true };
	}),
});

const stubConfigRouter = t.router({
	get: t.procedure.query(() => {
		console.info("[STUB] hostService.config.get");
		return null;
	}),
	set: t.procedure.mutation(() => {
		console.info("[STUB] hostService.config.set");
		return { success: true };
	}),
});

const stubFilesystemRouter = t.router({
	read: t.procedure.query(() => {
		console.info("[STUB] hostService.filesystem.read");
		return null;
	}),
	write: t.procedure.mutation(() => {
		console.info("[STUB] hostService.filesystem.write");
		return { success: true };
	}),
	list: t.procedure.query(() => {
		console.info("[STUB] hostService.filesystem.list");
		return [];
	}),
});

const stubGitRouter = t.router({
	status: t.procedure.query(() => {
		console.info("[STUB] hostService.git.status");
		return null;
	}),
	log: t.procedure.query(() => {
		console.info("[STUB] hostService.git.log");
		return [];
	}),
	diff: t.procedure.query(() => {
		console.info("[STUB] hostService.git.diff");
		return null;
	}),
});

const stubGithubRouter = t.router({
	listRepos: t.procedure.query(() => {
		console.info("[STUB] hostService.github.listRepos");
		return [];
	}),
	getRepo: t.procedure.query(() => {
		console.info("[STUB] hostService.github.getRepo");
		return null;
	}),
});

const stubCloudRouter = t.router({
	listServices: t.procedure.query(() => {
		console.info("[STUB] hostService.cloud.listServices");
		return [];
	}),
});

const stubIssuesRouter = t.router({
	list: t.procedure.query(() => {
		console.info("[STUB] hostService.issues.list");
		return [];
	}),
	getById: t.procedure.query(() => {
		console.info("[STUB] hostService.issues.getById");
		return null;
	}),
	create: t.procedure.mutation(() => {
		console.info("[STUB] hostService.issues.create");
		return { success: true };
	}),
});

const stubNotificationsRouter = t.router({
	list: t.procedure.query(() => {
		console.info("[STUB] hostService.notifications.list");
		return [];
	}),
	markRead: t.procedure.mutation(() => {
		console.info("[STUB] hostService.notifications.markRead");
		return { success: true };
	}),
});

const stubPullRequestsRouter = t.router({
	list: t.procedure.query(() => {
		console.info("[STUB] hostService.pullRequests.list");
		return [];
	}),
	getById: t.procedure.query(() => {
		console.info("[STUB] hostService.pullRequests.getById");
		return null;
	}),
});

const stubProjectRouter = t.router({
	getInfo: t.procedure.query(() => {
		console.info("[STUB] hostService.project.getInfo");
		return null;
	}),
});

const stubPortsRouter = t.router({
	list: t.procedure.query(() => {
		console.info("[STUB] hostService.ports.list");
		return [];
	}),
	forward: t.procedure.mutation(() => {
		console.info("[STUB] hostService.ports.forward");
		return { success: true };
	}),
});

const stubSettingsRouter = t.router({
	get: t.procedure.query(() => {
		console.info("[STUB] hostService.settings.get");
		return null;
	}),
	set: t.procedure.mutation(() => {
		console.info("[STUB] hostService.settings.set");
		return { success: true };
	}),
});

const stubTerminalRouter = t.router({
	create: t.procedure.mutation(() => {
		console.info("[STUB] hostService.terminal.create");
		return { sessionId: "" };
	}),
	write: t.procedure.mutation(() => {
		console.info("[STUB] hostService.terminal.write");
		return { success: true };
	}),
	resize: t.procedure.mutation(() => {
		console.info("[STUB] hostService.terminal.resize");
		return { success: true };
	}),
	onData: t.procedure.subscription(() => {
		console.info("[STUB] hostService.terminal.onData");
		return observable(() => {
			return () => {};
		});
	}),
});

const stubTerminalAgentsRouter = t.router({
	list: t.procedure.query(() => {
		console.info("[STUB] hostService.terminalAgents.list");
		return [];
	}),
});

const stubWorkspaceRouter = t.router({
	getInfo: t.procedure.query(() => {
		console.info("[STUB] hostService.workspace.getInfo");
		return null;
	}),
	listFiles: t.procedure.query(() => {
		console.info("[STUB] hostService.workspace.listFiles");
		return [];
	}),
});

const stubWorkspacesRouter = t.router({
	list: t.procedure.query(() => {
		console.info("[STUB] hostService.workspaces.list");
		return [];
	}),
	create: t.procedure.mutation(() => {
		console.info("[STUB] hostService.workspaces.create");
		return { success: true };
	}),
	delete: t.procedure.mutation(() => {
		console.info("[STUB] hostService.workspaces.delete");
		return { success: true };
	}),
});

const stubWorkspaceCleanupRouter = t.router({
	list: t.procedure.query(() => {
		console.info("[STUB] hostService.workspaceCleanup.list");
		return [];
	}),
	cleanup: t.procedure.mutation(() => {
		console.info("[STUB] hostService.workspaceCleanup.cleanup");
		return { success: true };
	}),
});

const stubWorkspaceCreationRouter = t.router({
	create: t.procedure.mutation(() => {
		console.info("[STUB] hostService.workspaceCreation.create");
		return { success: true };
	}),
	validate: t.procedure.mutation(() => {
		console.info("[STUB] hostService.workspaceCreation.validate");
		return { valid: true };
	}),
});

export const appRouter = router({
	agents: stubAgentsRouter,
	attachments: stubAttachmentsRouter,
	auth: stubAuthRouter,
	health: stubHealthRouter,
	host: stubHostRouter,
	chat: stubChatRouter,
	config: stubConfigRouter,
	filesystem: stubFilesystemRouter,
	git: stubGitRouter,
	github: stubGithubRouter,
	cloud: stubCloudRouter,
	issues: stubIssuesRouter,
	notifications: stubNotificationsRouter,
	pullRequests: stubPullRequestsRouter,
	project: stubProjectRouter,
	ports: stubPortsRouter,
	settings: stubSettingsRouter,
	terminal: stubTerminalRouter,
	terminalAgents: stubTerminalAgentsRouter,
	workspace: stubWorkspaceRouter,
	workspaces: stubWorkspacesRouter,
	workspaceCleanup: stubWorkspaceCleanupRouter,
	workspaceCreation: stubWorkspaceCreationRouter,
});

export type AppRouter = typeof appRouter;
