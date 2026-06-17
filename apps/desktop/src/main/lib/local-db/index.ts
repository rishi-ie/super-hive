import * as schema from "@superset/local-db";
export { schema };

type QueryBuilder = {
  from: (table: unknown) => QueryBuilder;
  where: (cond: unknown) => QueryBuilder;
  all: () => unknown[];
  get: () => unknown | null;
  orderBy: (...args: unknown[]) => QueryBuilder;
  limit: (n: number) => QueryBuilder;
  innerJoin?: (table: unknown, on: unknown) => QueryBuilder;
  leftJoin?: (table: unknown, on: unknown) => QueryBuilder;
};

type MutationBuilder = {
  values: (data: unknown) => MutationBuilder;
  returning: () => MutationBuilder;
  run: () => MutationBuilder;
  set: (data: unknown) => MutationBuilder;
  where: (cond: unknown) => MutationBuilder;
};

type DbType = {
  select: () => QueryBuilder;
  insert: (table: unknown) => MutationBuilder;
  update: (table: unknown) => MutationBuilder;
  delete: (table: unknown) => MutationBuilder;
};

const createQueryBuilder = (): QueryBuilder => {
  const self = (): QueryBuilder => createQueryBuilder();
  return {
    from: () => createQueryBuilder(),
    where: () => createQueryBuilder(),
    all: () => [],
    get: () => null,
    orderBy: () => createQueryBuilder(),
    limit: () => createQueryBuilder(),
    innerJoin: () => createQueryBuilder(),
    leftJoin: () => createQueryBuilder(),
  };
};

const createMutation = (): MutationBuilder => ({
  values: () => createMutation(),
  returning: () => createMutation(),
  run: () => createMutation(),
  set: () => createMutation(),
  where: () => createMutation(),
});

const stubDb: DbType = {
  select: () => createQueryBuilder(),
  insert: () => createMutation(),
  update: () => createMutation(),
  delete: () => createMutation(),
};

console.log("[local-db] Using in-memory stub database");

export const localDb = stubDb;
export type { DbType, QueryBuilder, MutationBuilder };