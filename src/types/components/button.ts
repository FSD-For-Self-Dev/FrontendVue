import type { IconProps } from "./icon";

export interface ButtonProps {
  type: "text" | "left-icon" | "right-icon";
  icon?: IconProps['type']
  size: "normal" | "medium" | "small" ;
  variant: "primary" | "secondary" | "success" | "danger";
  additionalText?: string;
}