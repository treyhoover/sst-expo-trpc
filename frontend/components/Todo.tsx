import { View, Text } from "react-native";

export type TodoProps = {
  id: number;
  title: string;
  description: string;
};

export function Todo({ title, description }: TodoProps) {
  return (
    <View className="flex flex-row bg-white gap-4">
      <Text>{title}</Text>
      <Text>{description}</Text>
    </View>
  );
}
