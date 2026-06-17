import { observable } from "@trpc/server/observable";
import type { OpenSettingsEvent, OpenWorkspaceEvent } from "main/lib/menu-events";
import { publicProcedure, router } from "..";
import { stubLog } from "../../stub-data";

type MenuEvent =
	| { type: "open-settings"; data: OpenSettingsEvent }
	| { type: "open-workspace"; data: OpenWorkspaceEvent }
	| { type: "open-project" };

export const createMenuRouter = () => {
	return router({
		subscribe: publicProcedure.subscription(() => {
			stubLog("menu", "subscribe");
			return observable<MenuEvent>(() => {
				return () => {};
			});
		}),
	});
};
