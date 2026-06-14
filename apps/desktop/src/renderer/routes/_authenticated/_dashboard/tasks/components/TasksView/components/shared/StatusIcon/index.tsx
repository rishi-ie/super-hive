export type StatusType =
	| "success"
	| "error"
	| "warning"
	| "progress"
	| "pending";

interface StatusIconProps {
	type: StatusType;
	color?: string;
	progress?: number;
	className?: string;
}

export function StatusIcon({ className }: StatusIconProps) {
	return <span className={className} />;
}
