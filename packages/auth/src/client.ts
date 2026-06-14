"use client";

import { STUB_ORG, STUB_SESSION, STUB_USER } from "./stub";

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
	token: () => "stub-token",
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
