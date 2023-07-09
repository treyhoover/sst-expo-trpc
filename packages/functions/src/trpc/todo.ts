import { z } from "zod";
import { InferModel, createDb, eq, todo } from "@notes/db/index";
import { Config } from "sst/node/config";
import { publicProcedure, router } from "../utils";

type Todo = InferModel<typeof todo>;

export const todoRouter = router({
  getAll: publicProcedure.query(async () => {
    const db = createDb(Config.DB_URL);
    const todos: Todo[] = await db.query.todo.findMany();

    return todos;
  }),
  getById: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ input: { id } }) => {
      const db = createDb(Config.DB_URL);

      const matchedTodo = await db.query.todo.findFirst({
        where: eq(todo.id, id),
      });

      if (!matchedTodo) {
        throw new Error(`No results found for todo ${id}`);
      }

      return matchedTodo;
    }),
  create: publicProcedure
    .input(z.object({ title: z.string(), description: z.string() }))
    .mutation(async ({ input: { title, description } }) => {
      const db = createDb(Config.DB_URL);
      const res = await db.insert(todo).values({ title, description });

      return res;
    }),
});
