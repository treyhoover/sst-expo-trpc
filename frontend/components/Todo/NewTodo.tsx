import React from "react";
import { Button, TextInput, View } from "react-native";

type NewTodoProps = {
  onAdd: (text: string) => void;
};

export function NewTodo({ onAdd }: NewTodoProps) {
  const [text, setText] = React.useState("");

  const handleAdd = () => {
    onAdd(text);
    setText("");
  };

  return (
    <View className="flex-row items-center p-3">
      <TextInput
        value={text}
        onChangeText={setText}
        placeholder="New todo"
        className="flex-grow p-2 bg-gray-200 rounded-md"
        onKeyPress={(e) => {
          if (e.nativeEvent.key === "Enter") handleAdd();
        }}
      />
      <Button title="Add" onPress={handleAdd} />
    </View>
  );
}
