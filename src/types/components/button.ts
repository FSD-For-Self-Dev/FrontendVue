import type { IconProps } from "./icon";

export interface ButtonProps {
  contentType: "text" | "left-icon" | "right-icon";
  icon?: IconProps['type']
  size: "normal" | "medium" | "small" ;
  variant: "primary" | "secondary" | "success" | "danger";
  additionalText?: string;
}