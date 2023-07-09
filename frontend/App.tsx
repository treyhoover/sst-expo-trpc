import { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { httpBatchLink } from "@trpc/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NativeWindStyleSheet } from "nativewind";
import { trpc } from "./utils/trpc";
import { API_URL } from "@env";
import { Todo } from "./components/Todo";

NativeWindStyleSheet.setOutput({
  default: "native",
});

function App() {
  const createTodo = trpc.todo.create.useMutation();
  const todos = trpc.todo.getAll.useQuery();
  const [newTodoTitle, setNewTodoTitle] = useState("");
  const [newTodoDescription, setNewTodoDescription] = useState("");

  return (
    <View className="flex-1 bg-white p-4">
      {todos.data?.map((todo) => (
        <Todo key={todo.id} {...todo} />
      ))}

      <View className="flex flex-row">
        <TextInput
          value={newTodoTitle}
          onChangeText={setNewTodoTitle}
          placeholder="Title"
        />
        <TextInput
          value={newTodoDescription}
          onChangeText={setNewTodoDescription}
          placeholder="Description"
        />
        <TouchableOpacity
          onPress={() => {
            createTodo.mutate({
              title: newTodoTitle,
              description: newTodoDescription,
            });
            setNewTodoTitle("");
            setNewTodoDescription("");
          }}
        >
          <Text>Create TODO</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default function Root() {
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() => {
    return trpc.createClient({
      transformer: {
        serialize: (data) => data,
        deserialize: (data) => data,
      },
      links: [
        httpBatchLink({
          url: API_URL,
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
