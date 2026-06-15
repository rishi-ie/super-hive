import { ORGANIZATION_HEADER } from "@superset/shared/constants";
import type { AppRouter } from "@superset/trpc";
import { createTRPCClient, httpBatchLink, type TRPCLink } from "@trpc/client";
import { observable } from "@trpc/server/observable";
import SuperJSON from "superjson";
import type { ApiAuthProvider } from "../../providers/auth";
import type { ApiClient } from "../../types";

function isUnauthorizedError(err: unknown): boolean {
	if (!err || typeof err !== "object") return false;
	const e = err as { data?: { code?: string; httpStatus?: number } };
	return e.data?.code === "UNAUTHORIZED" || e.data?.httpStatus === 401;
}

function retryOnUnauthorizedLink(
	authProvider: ApiAuthProvider,
): TRPCLink<AppRouter> {
	return () =>
		({ op, next }) =>
			observable((observer) => {
				let attempted = false;
				let subscription: { unsubscribe: () => void } | undefined;

				const start = () => {
					subscription = next(op).subscribe({
						next: (value) => observer.next(value),
						error: (err) => {
							if (!attempted && isUnauthorizedError(err)) {
								attempted = true;
								authProvider.invalidateCache();
								start();
								return;
							}
							observer.error(err);
						},
						complete: () => observer.complete(),
					});
				};

				start();

				return () => {
					subscription?.unsubscribe();
				};
			});
}

function createStubApiClient(): ApiClient {
	return createTRPCClient<AppRouter>({
		links: [
			() =>
				({ op, next }) =>
					observable((observer) => {
						console.warn(`[stub-api] Called ${op.path} (${op.type}), returning empty response`);
						if (op.type === "query") {
							observer.next({ data: undefined } as never);
							observer.complete();
						} else {
							observer.next({ data: undefined } as never);
							observer.complete();
						}
						return () => {};
					}),
		],
	});
}

export function createApiClient(
	baseUrl: string,
	authProvider: ApiAuthProvider,
	organizationId: string,
): ApiClient {
	if (!baseUrl) {
		console.warn("[api] SUPERSET_API_URL not set, using stub API client");
		return createStubApiClient();
	}

	return createTRPCClient<AppRouter>({
		links: [
			retryOnUnauthorizedLink(authProvider),
			httpBatchLink({
				url: `${baseUrl}/api/trpc`,
				transformer: SuperJSON,
				async headers() {
					return {
						...(await authProvider.getHeaders()),
						[ORGANIZATION_HEADER]: organizationId,
					};
				},
			}),
		],
	});
}
