import { useState } from "react";
import { View } from "react-native";
import { httpBatchLink } from "@trpc/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NativeWindStyleSheet } from "nativewind";
import { API_URL } from "@env";
import { trpc } from "./utils/trpc";
import { TodoList } from "./components/Todo/TodoList";
import { NewTodo } from "./components/Todo/NewTodo";
import { useCreateTodo } from "./api/useCreateTodo";
import { useAllTodos } from "./api/useAllTodos";
import { useDeleteTodo } from "./api/useDeleteTodo";

NativeWindStyleSheet.setOutput({
  default: "native",
});

function App() {
  const createTodo = useCreateTodo();
  const deleteTodo = useDeleteTodo();
  const todos = useAllTodos();

  const handleAddTodo = (text: string) => {
    createTodo.mutate({
      title: text,
      description: "",
    });
  };

  const handleDeleteTodo = (id: number) => {
    deleteTodo.mutate({ id });
  };

  const todoItems = todos.data;

  if (!todoItems) return null;

  return (
    <View className="flex-1 bg-white p-4">
      <TodoList items={todoItems} onDelete={handleDeleteTodo} />

      <View className="flex flex-row">
        <NewTodo onAdd={handleAddTodo} />
      </View>
    </View>
  );
}

export default function Root() {
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() => {
    return trpc.createClient({
      links: [
        httpBatchLink({
          url: API_URL + "/trpc",
        }),
      ],
    });
  });

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        {/* <ReactQueryDevtools initialIsOpen={false} /> */}
        <SafeAreaProvider>
          <App />
        </SafeAreaProvider>
      </QueryClientProvider>
    </trpc.Provider>
  );
}
