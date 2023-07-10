import { trpc } from "../utils/trpc";

export function useCreateTodo() {
  const utils = trpc.useContext();
  const createTodo = trpc.todo.create.useMutation({
    // When mutate is called
    onMutate: async (args) => {
      // Cancel any outgoing refetches
      // (so they don't overwrite our optimistic update)
      await utils.todo.getAll.cancel();

      // Snapshot the previous value
      const prev = utils.todo.getAll.getData() ?? [];
      const next = [...prev, { id: Math.random(), ...args }];

      // Optimistically update to the new value
      utils.todo.getAll.setData(undefined, next);

      // Return a context object with the snapshotted value
      return {
        args,
        prev,
      };
    },
    // If the mutation fails,
    // use the context returned from onMutate to roll back
    onError: (err, newTodo, context) => {
      console.log("rolling back");

      utils.todo.getAll.setData(undefined, context?.prev);
    },
    // Always refetch after error or success:
    onSettled: () => {
      utils.todo.invalidate();
    },
  });

  return createTodo;
}
