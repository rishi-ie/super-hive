export async function findOrgMembership({
	userId: _userId,
	organizationId: _organizationId,
}: {
	userId: string;
	organizationId: string;
}): Promise<null> {
	return null;
}

export type OrgMembershipWithSubscription = {
	membership: null;
	subscription: null;
};

export async function findOrgMembershipWithSubscription({
	userId: _userId,
	organizationId: _organizationId,
}: {
	userId: string;
	organizationId: string;
}): Promise<OrgMembershipWithSubscription | null> {
	return null;
}
