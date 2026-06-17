import { publicProcedure, router } from "..";
import { STUB_MACHINE_ID, stubLog } from "../../stub-data";

export const createDeviceRouter = () => {
	return router({
		getMachineId: publicProcedure.query((): { machineId: string } => {
			stubLog("device", "getMachineId");
			return { machineId: STUB_MACHINE_ID };
		}),
	});
};
