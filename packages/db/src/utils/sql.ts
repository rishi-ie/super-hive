export function buildConflictUpdateColumns(): Record<string, never> {
	return {};
}

export async function getCurrentTxid(): Promise<number> {
	return 0;
}

export async function withConnectionLock<T>(
	_connectionId: string,
	fn: () => Promise<T>,
): Promise<T> {
	return fn();
}
