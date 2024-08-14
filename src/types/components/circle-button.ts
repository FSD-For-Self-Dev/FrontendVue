import type { IconProps } from './icon';

export interface CircleButtonProps {
  icon:  IconProps['type']
  size: "normal" | "large";
  variant: "primary" | "secondary" | "ghost";
}
