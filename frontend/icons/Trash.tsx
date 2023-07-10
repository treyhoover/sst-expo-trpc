import { IconProps } from "../types/icon";
import React from "react";
import Svg, { Path } from "react-native-svg";

export function TrashIcon(props: IconProps) {
  return (
    <Svg
      fill="none"
      viewBox="0 0 24 24"
      width="1em"
      height="1em"
      stroke="currentColor"
      {...props}
    >
      <Path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m5-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
      />
    </Svg>
  );
}
