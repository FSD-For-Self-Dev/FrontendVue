export interface ButtonProps {
  contentType: "text" | "left-icon" | "right-icon";
  text: string;
  size: "normal" | "medium" | "small" ;
  variant: "primary" | "secondary" | "success" | "danger";
  additionalText?: string;
}