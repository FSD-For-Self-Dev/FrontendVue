export interface InputProps {
  label: string,
  modelValue: string,
  showLabel: boolean,
  validationError?: string,
  serverError?: string,
  iconComponent?: string,
  iconPos?: "left" | "right",
}
