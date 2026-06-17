import { observable } from "@trpc/server/observable";
import type { KeyboardLayoutData } from "main/lib/keyboardLayout";
import { publicProcedure, router } from "..";
import { stubLog } from "../../stub-data";

export const createKeyboardLayoutRouter = () => {
	return router({
		get: publicProcedure.query((): KeyboardLayoutData => {
			stubLog("keyboardLayout", "get");
			return { layout: "US", mapping: {}, deadKeys: [] };
		}),
		changes: publicProcedure.subscription(() => {
			stubLog("keyboardLayout", "changes");
			return observable<KeyboardLayoutData>(() => {
				return () => {};
			});
		}),
	});
};
