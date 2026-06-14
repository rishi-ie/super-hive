import type { inferRouterInputs, inferRouterOutputs } from "@trpc/server";

import { agentRouter } from "./router/agent";
import { apiKeyRouter } from "./router/api-key";
import { chatRouter } from "./router/chat";
import { deviceRouter } from "./router/device";
import { hostRouter } from "./router/host";
import { organizationRouter } from "./router/organization";
import { projectRouter } from "./router/project";
import { taskRouter } from "./router/task";
import { teamRouter } from "./router/team";
import { userRouter } from "./router/user";
import { v2HostRouter } from "./router/v2-host";
import { v2ProjectRouter } from "./router/v2-project";
import { v2WorkspaceRouter } from "./router/v2-workspace";
import { workspaceRouter } from "./router/workspace";
import { createCallerFactory, createTRPCRouter } from "./trpc";

export const appRouter = createTRPCRouter({
	agent: agentRouter,
	apiKey: apiKeyRouter,
	chat: chatRouter,
	device: deviceRouter,
	host: hostRouter,
	organization: organizationRouter,
	project: projectRouter,
	task: taskRouter,
	team: teamRouter,
	user: userRouter,
	v2Host: v2HostRouter,
	v2Project: v2ProjectRouter,
	v2Workspace: v2WorkspaceRouter,
	workspace: workspaceRouter,
});

export type AppRouter = typeof appRouter;
export type RouterInputs = inferRouterInputs<AppRouter>;
export type RouterOutputs = inferRouterOutputs<AppRouter>;

export const createCaller = createCallerFactory(appRouter);
