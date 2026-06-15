export type PlanTier = "free" | "pro" | "team" | "enterprise";

export const ACTIVE_SUBSCRIPTION_STATUSES = [
	"active",
	"trialing",
	"past_due",
] as const;

export function isActiveSubscriptionStatus(
	status: string | null | undefined,
): boolean {
	if (!status) return false;
	return (ACTIVE_SUBSCRIPTION_STATUSES as readonly string[]).includes(status);
}

export function isPaidPlan(plan: string | null | undefined): boolean {
	if (!plan) return false;
	return plan !== "free";
}

export function formatPrice(amount: number, currency = "usd"): string {
	return new Intl.NumberFormat("en-US", {
		style: "currency",
		currency: currency.toUpperCase(),
	}).format(amount / 100);
}
