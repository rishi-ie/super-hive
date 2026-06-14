import { createFileRoute, Navigate } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/_dashboard/automations/")({
	component: AutomationsIndex,
});

function AutomationsIndex() {
	return <Navigate to="/_authenticated/_dashboard" replace />;
}
