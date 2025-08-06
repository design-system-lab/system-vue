import { Icon } from "./common";
import { SelectOption } from "./forms";

export type MenuDirection = 'top' | 'bottom';
export type MenuPlacement = 'attached' | 'global';

export interface MenuProps {
  alignment?: 'left' | 'right';
  checkboxEnd?: boolean;
  direction?: MenuDirection;
  focusItem?: number;
  items: SelectOption[];
  menuPlacement?: MenuPlacement;
  minWidth?: string;
  modelValue?: string[];
  multiple?: boolean;
  parent: HTMLElement | null;
  showFocus?: boolean;
  size?: number;
  small?: boolean;
  width?: string;
}

export interface MenuButtonProps {
  alignment?: 'left' | 'right';
  direction?: MenuDirection;
  icon?: Icon;
  items?: SelectOption[];
  prependIcon?: Icon;
}
