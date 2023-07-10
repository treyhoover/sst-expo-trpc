import React from "react";
import clsx from "clsx";
import {
  TextInput as RNTextInput,
  TextInputProps as RNTextInputProps,
} from "react-native";

type TextInputProps = RNTextInputProps & {
  className?: string;
};

export function MyTextInput({ className, ...props }: TextInputProps) {
  return (
    <RNTextInput
      {...props}
      className={clsx("p-4 border-2 border-gray-300 rounded-md", className)}
    />
  );
}
