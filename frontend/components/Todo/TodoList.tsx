import React from "react";
import { FlatList } from "react-native";
import { TodoItem, TodoItemProps } from "./TodoItem";

type TodoListProps = {
  items: {
    id: number;
    title: string;
    description: string;
  }[];
  onDelete: TodoItemProps["onDelete"];
};

export function TodoList({ items, onDelete }: TodoListProps) {
  return (
    <FlatList
      data={items}
      renderItem={({ item }) => <TodoItem {...item} onDelete={onDelete} />}
      keyExtractor={(item) => item.id.toString()}
    />
  );
}
