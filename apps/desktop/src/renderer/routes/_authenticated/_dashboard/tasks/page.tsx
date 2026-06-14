import { createFileRoute, Navigate } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/_dashboard/tasks/")({
	component: TasksIndex,
});

function TasksIndex() {
	return <Navigate to="/_authenticated/_dashboard" replace />;
}
