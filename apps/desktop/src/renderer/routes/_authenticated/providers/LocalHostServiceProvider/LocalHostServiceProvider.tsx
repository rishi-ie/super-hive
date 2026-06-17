import { createContext, type ReactNode, useContext, useMemo } from "react";
import type { HostServiceAvailabilityStatus } from "renderer/lib/host-service-unavailable";

interface LocalHostServiceContextValue {
	machineId: string;
	activeHostUrl: string | null;
	activeOrganizationId: string | null;
	activeOrganizationName: string | null;
	hostServiceStatus: HostServiceAvailabilityStatus;
}

const LocalHostServiceContext =
	createContext<LocalHostServiceContextValue | null>(null);

export function LocalHostServiceProvider({
	children,
}: {
	children: ReactNode;
}) {
	const value = useMemo<LocalHostServiceContextValue>(
		() => ({
			machineId: "stub-machine-id",
			activeHostUrl: null,
			activeOrganizationId: "stub-org",
			activeOrganizationName: null,
			hostServiceStatus: "unknown",
		}),
		[],
	);

	return (
		<LocalHostServiceContext.Provider value={value}>
			{children}
		</LocalHostServiceContext.Provider>
	);
}

export function useLocalHostService(): LocalHostServiceContextValue {
	const context = useContext(LocalHostServiceContext);
	if (!context) {
		throw new Error(
			"useLocalHostService must be used within LocalHostServiceProvider",
		);
	}
	return context;
}
