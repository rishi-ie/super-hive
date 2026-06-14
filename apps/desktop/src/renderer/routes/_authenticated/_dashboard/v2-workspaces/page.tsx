import { createFileRoute, Navigate } from "@tanstack/react-router";

export const Route = createFileRoute(
	"/_authenticated/_dashboard/v2-workspaces/",
)({
	component: V2WorkspacesIndex,
});

function V2WorkspacesIndex() {
	return <Navigate to="/_authenticated/_dashboard" replace />;
}
