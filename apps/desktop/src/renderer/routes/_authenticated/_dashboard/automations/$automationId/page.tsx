import { createFileRoute, Navigate } from "@tanstack/react-router";

export const Route = createFileRoute(
	"/_authenticated/_dashboard/automations/$automationId/",
)({
	component: AutomationDetail,
});

function AutomationDetail() {
	const { automationId } = Route.useParams();
	void automationId;
	return <Navigate to="/_authenticated/_dashboard" replace />;
}
