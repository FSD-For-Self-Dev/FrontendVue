export interface ButtonProps {
  label: string;
  size: "normal" | "medium" | "small" ;
  variant: "primary" | "secondary" | "success" | "danger";
  icon?: string;
  iconPos?: string;
  additionalLabel?: string;
}