import { createFileRoute, Navigate } from "@tanstack/react-router";

export const Route = createFileRoute(
	"/_authenticated/_dashboard/tasks/$taskId/",
)({
	component: TaskDetail,
});

function TaskDetail() {
	const { taskId } = Route.useParams();
	void taskId;
	return <Navigate to="/_authenticated/_dashboard" replace />;
}
