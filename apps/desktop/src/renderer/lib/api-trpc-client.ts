import type { AppRouter } from "@superset/trpc";
import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";
import { env } from "renderer/env.renderer";
import superjson from "superjson";
import { getAuthToken } from "./auth-client";

const createRealApiTrpcClient = () =>
	createTRPCProxyClient<AppRouter>({
		links: [
			httpBatchLink({
				url: `${env.NEXT_PUBLIC_API_URL}/api/trpc`,
				transformer: superjson,
				headers: () => {
					const token = getAuthToken();
					if (token) {
						return {
							Authorization: `Bearer ${token}`,
						};
					}
					return {};
				},
			}),
		],
	});

const createStubApiTrpcClient = () => {
	const noop = async () => undefined;
	const stub = {
		task: {
			byId: { query: noop, mutate: noop },
		},
		support: {
			submitPrompt: { mutate: noop },
		},
		workspace: {
			ensure: { mutate: noop },
		},
		user: {
			uploadAvatar: { mutate: async () => ({ url: "" }) },
			updateProfile: { mutate: async () => ({}) },
		},
		apiKey: {
			create: { mutate: async () => ({ id: "", name: "", key: "", createdAt: "" }) },
			delete: { mutate: noop },
			list: { query: async () => ({ items: [] }) },
		},
		v2Project: {
			uploadIcon: { mutate: async () => ({}) },
			resetIconToGitHub: { mutate: noop },
			removeIcon: { mutate: noop },
		},
		chat: {
			uploadAttachment: { mutate: async () => ({ id: "", url: "" }) },
			getModels: { query: async () => ({ models: [] }) },
		},
		integration: {
			github: {
				getInstallation: { query: async () => ({ installed: false }) },
			},
		},
		project: {
			create: { mutate: async () => ({ id: "" }) },
			secrets: {
				getDecrypted: { query: async () => ({ items: [] }) },
				upsert: { mutate: noop },
				delete: { mutate: noop },
			},
		},
	} as unknown as ReturnType<typeof createRealApiTrpcClient>;

	return stub;
};

export const apiTrpcClient =
	env.NEXT_PUBLIC_API_URL === "" || env.NEXT_PUBLIC_API_URL === "http://localhost:3000"
		? createStubApiTrpcClient()
		: createRealApiTrpcClient();
