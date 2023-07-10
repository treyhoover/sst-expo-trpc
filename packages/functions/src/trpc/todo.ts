import { z } from "zod";
import { createDb, eq, todo } from "@notes/db/index";
import { Config } from "sst/node/config";
import { publicProcedure, router } from "../utils";

export const todoRouter = router({
  getAll: publicProcedure.query(async () => {
    const db = createDb(Config.DB_URL);
    const res = await db.query.todo.findMany();

    return res;
  }),
  getById: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ input: { id } }) => {
      const db = createDb(Config.DB_URL);
      const res = await db.query.todo.findFirst({
        where: eq(todo.id, id),
      });

      if (!res) {
        throw new Error(`No results found for todo ${id}`);
      }

      return res;
    }),
  create: publicProcedure
    .input(z.object({ title: z.string(), description: z.string() }))
    .mutation(async ({ input: { title, description } }) => {
      const db = createDb(Config.DB_URL);
      const res = await db.insert(todo).values({ title, description });

      return res;
    }),
  deleteById: publicProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input: { id } }) => {
      const db = createDb(Config.DB_URL);
      const res = await db.delete(todo).where(eq(todo.id, id));

      return res;
    }),
});
