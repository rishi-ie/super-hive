import { STUB_ORG_ID, STUB_USER_ID } from "@superset/auth/stub";
import { initTRPC } from "@trpc/server";
import superjson from "superjson";
import { ZodError } from "zod";

export type TRPCContext = {
	headers: Headers;
	userId: string;
	activeOrganizationId: string;
};

export const createTRPCContext = (opts: TRPCContext): TRPCContext => opts;

const t = initTRPC.context<TRPCContext>().create({
	transformer: superjson,
	errorFormatter({ shape, error }) {
		return {
			...shape,
			data: {
				...shape.data,
				zodError:
					error.cause instanceof ZodError ? error.cause.flatten() : null,
			},
		};
	},
});

export const createTRPCRouter = t.router;

export const createCallerFactory = t.createCallerFactory;

export const publicProcedure = t.procedure;

export const protectedProcedure = t.procedure;

export const jwtProcedure = t.procedure.use(async ({ ctx, next }) => {
	return next({
		ctx: {
			...ctx,
			userId: STUB_USER_ID,
			activeOrganizationId: STUB_ORG_ID,
		},
	});
});

export const adminProcedure = protectedProcedure;
