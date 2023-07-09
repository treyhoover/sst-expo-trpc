import { z } from "zod";
import { createDb, eq, todo } from "@notes/db";
import { Config } from "sst/node/config";
import { publicProcedure, router } from "../utils";

export const todoRouter = router({
  getAll: publicProcedure.query(async () => {
    const db = createDb(Config.DB_URL);

    return db.query.todo.findMany();
  }),
  getById: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ input: { id } }) => {
      const db = createDb(Config.DB_URL);

      const counter = await db.query.todo.findFirst({
        where: eq(todo.id, id),
      });

      if (!counter) {
        throw new Error(`No results found for todo ${id}`);
      }

      return counter;
    }),
  create: publicProcedure
    .input(z.object({ title: z.string(), description: z.string() }))
    .mutation(async ({ input: { title, description } }) => {
      const db = createDb(Config.DB_URL);
      const res = await db.insert(todo).values({ title, description });

      return res;
    }),
});
