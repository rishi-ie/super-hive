import type { PlanTier } from "@superset/shared/billing";

export function useCurrentPlan(): { plan: PlanTier; isReady: boolean } {
	return { plan: "free", isReady: true };
}
