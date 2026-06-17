import { observable } from "@trpc/server/observable";
import { z } from "zod";
import { publicProcedure, router } from "../..";
import { stubLog } from "../../stub-data";

export const createBrowserRouter = () => {
	return router({
		register: publicProcedure
			.input(z.object({ paneId: z.string(), webContentsId: z.number() }))
			.mutation(({ input }) => {
				stubLog("browser", "register", input);
				return { success: true };
			}),

		unregister: publicProcedure
			.input(z.object({ paneId: z.string() }))
			.mutation(({ input }) => {
				stubLog("browser", "unregister", input);
				return { success: true };
			}),

		navigate: publicProcedure
			.input(z.object({ paneId: z.string(), url: z.string() }))
			.mutation(({ input }) => {
				stubLog("browser", "navigate", input);
				return { success: true };
			}),

		goBack: publicProcedure
			.input(z.object({ paneId: z.string() }))
			.mutation(({ input }) => {
				stubLog("browser", "goBack", input);
				return { success: true };
			}),

		goForward: publicProcedure
			.input(z.object({ paneId: z.string() }))
			.mutation(({ input }) => {
				stubLog("browser", "goForward", input);
				return { success: true };
			}),

		reload: publicProcedure
			.input(z.object({ paneId: z.string(), hard: z.boolean().optional() }))
			.mutation(({ input }) => {
				stubLog("browser", "reload", input);
				return { success: true };
			}),

		screenshot: publicProcedure
			.input(z.object({ paneId: z.string() }))
			.mutation(({ input }) => {
				stubLog("browser", "screenshot", input);
				return { dataUrl: "stub-screenshot" };
			}),

		evaluateJS: publicProcedure
			.input(z.object({ paneId: z.string(), code: z.string() }))
			.mutation(({ input }) => {
				stubLog("browser", "evaluateJS", input);
				return { result: null };
			}),

		getConsoleLogs: publicProcedure
			.input(z.object({ paneId: z.string() }))
			.query(({ input }) => {
				stubLog("browser", "getConsoleLogs", input);
				return [];
			}),

		consoleStream: publicProcedure
			.input(z.object({ paneId: z.string() }))
			.subscription(({ input }) => {
				stubLog("browser", "consoleStream", input);
				return observable<{
					level: string;
					message: string;
					timestamp: number;
				}>((emit) => {
					return () => {};
				});
			}),

		onNewWindow: publicProcedure
			.input(z.object({ paneId: z.string() }))
			.subscription(({ input }) => {
				stubLog("browser", "onNewWindow", input);
				return observable<{ url: string }>((emit) => {
					return () => {};
				});
			}),

		onContextMenuAction: publicProcedure
			.input(z.object({ paneId: z.string() }))
			.subscription(({ input }) => {
				stubLog("browser", "onContextMenuAction", input);
				return observable<{ action: string; url: string }>((emit) => {
					return () => {};
				});
			}),

		onClosePane: publicProcedure
			.input(z.object({ paneId: z.string() }))
			.subscription(({ input }) => {
				stubLog("browser", "onClosePane", input);
				return observable<void>((emit) => {
					return () => {};
				});
			}),

		onReloadPane: publicProcedure
			.input(z.object({ paneId: z.string() }))
			.subscription(({ input }) => {
				stubLog("browser", "onReloadPane", input);
				return observable<void>((emit) => {
					return () => {};
				});
			}),

		openDevTools: publicProcedure
			.input(z.object({ paneId: z.string() }))
			.mutation(({ input }) => {
				stubLog("browser", "openDevTools", input);
				return { success: true };
			}),

		getPageInfo: publicProcedure
			.input(z.object({ paneId: z.string() }))
			.query(({ input }) => {
				stubLog("browser", "getPageInfo", input);
				return {
					url: "https://stub.url",
					title: "Stub",
					canGoBack: false,
					canGoForward: false,
					isLoading: false,
				};
			}),

		clearBrowsingData: publicProcedure
			.input(
				z.object({
					type: z.enum(["cookies", "cache", "storage", "all"]),
				}),
			)
			.mutation(({ input }) => {
				stubLog("browser", "clearBrowsingData", input);
				return { success: true };
			}),
	});
};
