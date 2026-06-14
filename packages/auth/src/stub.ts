export const STUB_USER_ID = "stub-user-id";
export const STUB_ORG_ID = "stub-org-id";

export const STUB_USER = {
	id: STUB_USER_ID,
	name: "Local Dev",
	email: "dev@local.test",
	emailVerified: true,
	image: null,
	organizationIds: [STUB_ORG_ID],
	onboardedAt: new Date().toISOString(),
	createdAt: new Date().toISOString(),
	updatedAt: new Date().toISOString(),
};

export const STUB_ORG = {
	id: STUB_ORG_ID,
	name: "Local Org",
	slug: "local",
	logo: null,
	createdAt: new Date().toISOString(),
	metadata: null,
	stripeCustomerId: null,
	allowedDomains: [],
};

export const STUB_SESSION = {
	id: "stub-session",
	expiresAt: new Date(Date.now() + 86400000).toISOString(),
	token: "stub-token",
	createdAt: new Date().toISOString(),
	updatedAt: new Date().toISOString(),
	ipAddress: null,
	userAgent: null,
	userId: STUB_USER_ID,
	activeOrganizationId: STUB_ORG_ID,
	activeTeamId: null,
};

export const STUB_SESSION_COOKIE = "stub-session-cookie";
