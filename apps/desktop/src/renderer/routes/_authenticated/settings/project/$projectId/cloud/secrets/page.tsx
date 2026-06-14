import { createFileRoute, Navigate } from "@tanstack/react-router";

export const Route = createFileRoute(
	"/_authenticated/settings/project/$projectId/cloud/secrets/",
)({
	component: CloudSecretsIndex,
});

function CloudSecretsIndex() {
	const { projectId } = Route.useParams();
	return (
		<Navigate
			to="/settings/projects/$projectId"
			params={{ projectId }}
			replace
		/>
	);
}
