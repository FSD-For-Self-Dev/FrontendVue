export interface InputProps {
  label: string,
  placeholder?: string,
  modelValue: string,
  showLabel: boolean,
  size: "standart" | "big",
  validationError?: string,
  serverError?: string,
  icon?: string,
  iconPos?: "left" | "right",
  additionalIcon?: string,
}
