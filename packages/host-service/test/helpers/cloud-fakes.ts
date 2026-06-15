// Stub for cloud-fakes - tests in this environment are stubbed
// and don't make real cloud API calls.

export const cloudOk = (data: unknown = {}) => ({
	ok: true,
	data,
});

export const cloudFlows = {
	flows: {
		afterCreate: () => {},
		beforeAddMember: () => {},
		afterAddMember: () => {},
		beforeRemoveMember: () => {},
		afterRemoveMember: () => {},
	},
};
