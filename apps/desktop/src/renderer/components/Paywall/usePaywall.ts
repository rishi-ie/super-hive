import type { GatedFeature } from "./constants";

export function usePaywall() {
	function hasAccess(_feature: GatedFeature): boolean {
		return true;
	}

	function gateFeature(
		_feature: GatedFeature,
		_callback: () => void | Promise<void>,
		_context?: Record<string, unknown>,
	): void {
		// All features are accessible in local-only mode
	}

	return {
		hasAccess,
		gateFeature,
		userPlan: "free" as const,
		isReady: true,
	};
}
