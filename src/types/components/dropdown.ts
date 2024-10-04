import type { IconProps } from "./icon";

export interface DropdownItem {
    value: string | number;
    label: string;
    icon?: IconProps['type'];
  }