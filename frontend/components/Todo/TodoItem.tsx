import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { TrashIcon } from "../../icons/Trash";

export type TodoItemProps = {
  id: number;
  title: string;
  description: string;
  onDelete: (id: number) => void;
};

export function TodoItem({ id, title, description, onDelete }: TodoItemProps) {
  return (
    <View className="flex-row items-center p-3 m-2 bg-gray-200 rounded-md">
      <Text className="text-lg flex justify-center">{title}</Text>

      <TouchableOpacity className="ml-auto" onPress={() => onDelete(id)}>
        <TrashIcon className="text-lg" />
      </TouchableOpacity>
    </View>
  );
}
