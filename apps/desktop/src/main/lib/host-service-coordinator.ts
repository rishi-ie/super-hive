import { EventEmitter } from "node:events";
import log from "electron-log/main";

export type HostServiceStatus = "starting" | "running" | "stopped";

export interface Connection {
	port: number;
	secret: string;
	machineId: string;
}

export interface HostServiceStatusEvent {
	organizationId: string;
	status: HostServiceStatus;
	previousStatus: HostServiceStatus | null;
}

export interface SpawnConfig {
	authToken: string;
	cloudApiUrl: string;
}

export class HostServiceCoordinator extends EventEmitter {
	async start(
		_organizationId: string,
		_config: SpawnConfig,
	): Promise<Connection> {
		log.info("[STUB] hostServiceCoordinator.start");
		return { port: 3000, secret: "stub", machineId: "stub" };
	}

	stop(_organizationId: string): void {
		log.info("[STUB] hostServiceCoordinator.stop");
	}

	stopAll(): void {
		log.info("[STUB] hostServiceCoordinator.stopAll");
	}

	async restart(
		_organizationId: string,
		_config: SpawnConfig,
	): Promise<Connection> {
		log.info("[STUB] hostServiceCoordinator.restart");
		return { port: 3000, secret: "stub", machineId: "stub" };
	}

	async reset(
		_organizationId: string,
		_config: SpawnConfig,
	): Promise<Connection> {
		log.info("[STUB] hostServiceCoordinator.reset");
		return { port: 3000, secret: "stub", machineId: "stub" };
	}

	getConnection(_organizationId: string): Connection | null {
		log.info("[STUB] hostServiceCoordinator.getConnection");
		return { port: 3000, secret: "stub", machineId: "stub" };
	}

	getProcessStatus(_organizationId: string): HostServiceStatus {
		log.info("[STUB] hostServiceCoordinator.getProcessStatus");
		return "running";
	}

	getActiveOrganizationIds(): string[] {
		log.info("[STUB] hostServiceCoordinator.getActiveOrganizationIds");
		return [];
	}

	async restartAll(_config: SpawnConfig): Promise<void> {
		log.info("[STUB] hostServiceCoordinator.restartAll");
		return Promise.resolve();
	}

	enableDevReload(
		_configProvider: () => Promise<SpawnConfig | null>,
	): () => void {
		log.info("[STUB] hostServiceCoordinator.enableDevReload");
		return () => {};
	}
}

let coordinator: HostServiceCoordinator | null = null;

export function getHostServiceCoordinator(): HostServiceCoordinator {
	if (!coordinator) {
		coordinator = new HostServiceCoordinator();
	}
	return coordinator;
}