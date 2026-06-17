import type { AuthStatus } from "./auth-storage-types";

interface ChatServiceOptions {
	anthropicEnvConfigPath?: string;
}

export class ChatService {
	constructor(_options?: ChatServiceOptions) {}

	async getAnthropicAuthStatus(): Promise<AuthStatus> {
		console.info("[STUB] ChatService.getAnthropicAuthStatus");
		return {
			authenticated: false,
			method: null,
			source: null,
			issue: "not_connected",
		};
	}

	async getOpenAIAuthStatus(): Promise<AuthStatus> {
		console.info("[STUB] ChatService.getOpenAIAuthStatus");
		return {
			authenticated: false,
			method: null,
			source: null,
			issue: "not_connected",
		};
	}

	async setOpenAIApiKey(_input: { apiKey: string }): Promise<{ success: true }> {
		console.info("[STUB] ChatService.setOpenAIApiKey");
		return { success: true };
	}

	async clearOpenAIApiKey(): Promise<{ success: true }> {
		console.info("[STUB] ChatService.clearOpenAIApiKey");
		return { success: true };
	}

	async startOpenAIOAuth(): Promise<{ url: string; instructions: string }> {
		console.info("[STUB] ChatService.startOpenAIOAuth");
		return { url: "", instructions: "" };
	}

	consumeOpenAIOAuthCallback(): { callbackUrl: string | null } {
		console.info("[STUB] ChatService.consumeOpenAIOAuthCallback");
		return { callbackUrl: null };
	}

	cancelOpenAIOAuth(): { success: true } {
		console.info("[STUB] ChatService.cancelOpenAIOAuth");
		return { success: true };
	}

	async disconnectOpenAIOAuth(): Promise<{ success: true }> {
		console.info("[STUB] ChatService.disconnectOpenAIOAuth");
		return { success: true };
	}

	async completeOpenAIOAuth(_input: {
		code?: string;
	}): Promise<{ success: true }> {
		console.info("[STUB] ChatService.completeOpenAIOAuth");
		return { success: true };
	}

	async setAnthropicApiKey(_input: {
		apiKey: string;
	}): Promise<{ success: true }> {
		console.info("[STUB] ChatService.setAnthropicApiKey");
		return { success: true };
	}

	async clearAnthropicApiKey(): Promise<{ success: true }> {
		console.info("[STUB] ChatService.clearAnthropicApiKey");
		return { success: true };
	}

	getAnthropicEnvConfig(): {
		envText: string;
		variables: Record<string, string>;
	} {
		console.info("[STUB] ChatService.getAnthropicEnvConfig");
		return { envText: "", variables: {} };
	}

	async setAnthropicEnvConfig(_input: {
		envText: string;
	}): Promise<{ success: true }> {
		console.info("[STUB] ChatService.setAnthropicEnvConfig");
		return { success: true };
	}

	async clearAnthropicEnvConfig(): Promise<{ success: true }> {
		console.info("[STUB] ChatService.clearAnthropicEnvConfig");
		return { success: true };
	}

	async startAnthropicOAuth(): Promise<{ url: string; instructions: string }> {
		console.info("[STUB] ChatService.startAnthropicOAuth");
		return { url: "", instructions: "" };
	}

	cancelAnthropicOAuth(): { success: true } {
		console.info("[STUB] ChatService.cancelAnthropicOAuth");
		return { success: true };
	}

	async disconnectAnthropicOAuth(): Promise<{ success: true }> {
		console.info("[STUB] ChatService.disconnectAnthropicOAuth");
		return { success: true };
	}

	async completeAnthropicOAuth(_input: {
		code?: string;
	}): Promise<{ success: true; expiresAt: number }> {
		console.info("[STUB] ChatService.completeAnthropicOAuth");
		return { success: true, expiresAt: 0 };
	}
}
