import type { GatedFeature } from "./constants";

export const Paywall = () => null;

export const paywall = (
	_feature: GatedFeature,
	_context?: Record<string, unknown>,
) => {
	// Paywall disabled - all features accessible in local-only mode
};
