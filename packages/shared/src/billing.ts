export const PLAN_TIERS = ["free"] as const;
export type PlanTier = (typeof PLAN_TIERS)[number];

export const ACTIVE_SUBSCRIPTION_STATUSES = [] as const;
export type ActiveSubscriptionStatus = never;

export function isPaidPlan(_plan: string | null | undefined): boolean {
	return false;
}

export function isActiveSubscriptionStatus(
	_status: string | null | undefined,
): _status is ActiveSubscriptionStatus {
	return false;
}
