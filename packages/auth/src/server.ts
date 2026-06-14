import { STUB_ORG, STUB_SESSION, STUB_USER } from "./stub";

export const auth = {
	session: {
		find: async () => ({
			user: STUB_USER,
			session: STUB_SESSION,
		}),
	},
	user: {
		find: async () => STUB_USER,
	},
	organization: {
		list: async () => [STUB_ORG],
	},
} as const;

export type Auth = typeof auth;
