import { memo } from "react";
import type { TerminalProps } from "./types";

export const Terminal = memo(function Terminal({
	paneId,
	tabId,
	workspaceId,
}: TerminalProps) {
	return (
		<div
			className="flex h-full w-full items-center justify-center bg-neutral-900 text-neutral-400"
			data-pane-id={paneId}
			data-tab-id={tabId}
			data-workspace-id={workspaceId}
		>
			Terminal stubbed
		</div>
	);
});
