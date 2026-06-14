import { STUB_ORG, STUB_USER } from "./stub";

async function seedDevAccount(): Promise<void> {
	if (process.env.NODE_ENV !== "development") {
		throw new Error(
			"seed-dev is local-dev only; run with NODE_ENV=development",
		);
	}

	console.log(`Using stub dev account: ${STUB_USER.email}`);
	console.log(`Stub organization: ${STUB_ORG.name} (${STUB_ORG.slug})`);
	console.log(`Dev account ready (stub mode - no actual database seeding)`);
}

seedDevAccount()
	.then(() => process.exit(0))
	.catch((error) => {
		console.error("seed-dev failed:", error);
		process.exit(1);
	});
