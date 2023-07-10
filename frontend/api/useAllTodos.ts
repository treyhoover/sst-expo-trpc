import { trpc } from "../utils/trpc";

export function useAllTodos() {
  const allTodos = trpc.todo.getAll.useQuery();

  return allTodos;
}
