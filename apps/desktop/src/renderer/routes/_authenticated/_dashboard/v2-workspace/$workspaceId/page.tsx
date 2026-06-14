import { createFileRoute, Navigate } from "@tanstack/react-router";

export const Route = createFileRoute(
	"/_authenticated/_dashboard/v2-workspace/$workspaceId/",
)({
	component: V2WorkspaceDetail,
});

function V2WorkspaceDetail() {
	const { workspaceId } = Route.useParams();
	void workspaceId;
	return <Navigate to="/_authenticated/_dashboard" replace />;
}
