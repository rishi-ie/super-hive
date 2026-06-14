import { env } from "renderer/env.renderer";

/**
 * Returns the relay base URL. In local-only mode, relay is not available.
 * Returns the env.RELAY_URL directly.
 */
export function useRelayUrl(): string {
	return env.RELAY_URL;
}
