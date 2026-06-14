export interface V2Workspace {
	id: string;
	projectId: string;
	projectName: string;
	name: string;
	branch: string;
	hostType: string;
	hostName: string;
}

interface UseAccessibleV2WorkspacesOptions {
	searchQuery?: string;
}

export function useAccessibleV2Workspaces(
	_options?: UseAccessibleV2WorkspacesOptions,
) {
	return { all: [] as V2Workspace[], isLoading: false };
}
