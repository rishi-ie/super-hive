import { STUB_ORG, STUB_SESSION, STUB_USER } from "@superset/auth/stub";

let authToken: string | null = "stub-token";

export function setAuthToken(token: string | null) {
	authToken = token;
}

export function getAuthToken(): string | null {
	return authToken;
}

let jwt: string | null = "stub-jwt";

export function setJwt(token: string | null) {
	jwt = token;
}

export function getJwt(): string | null {
	return jwt;
}

export const authClient = {
	useSession: () => ({
		data: {
			user: STUB_USER,
			session: STUB_SESSION,
			organization: STUB_ORG,
		},
		isPending: false,
		error: null,
	}),
	signIn: async () => ({ user: STUB_USER, session: STUB_SESSION }),
	signOut: async () => ({ success: true }),
	token: () => authToken,
	getSession: () => ({
		user: STUB_USER,
		session: STUB_SESSION,
		organization: STUB_ORG,
	}),
	signInWithOAuth: async () => ({ user: STUB_USER, session: STUB_SESSION }),
	signInWithEmail: async () => ({ success: true }),
	sendVerificationEmail: async () => ({ success: true }),
	resetPassword: async () => ({ success: true }),
	listAccounts: async () => [],
	deleteUser: async () => ({ success: true }),
	updateUser: async () => ({ user: STUB_USER }),
	refresh: async () => ({ user: STUB_USER, session: STUB_SESSION }),
};
