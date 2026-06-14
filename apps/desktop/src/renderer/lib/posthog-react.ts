export function useFeatureFlagEnabled(_flag: string): boolean {
	return false;
}

export function useFeatureFlagPayload<_T>(
	_flag: string,
): { [key: string]: unknown } | null {
	return null;
}
