import { RouteLocationRaw } from 'vue-router';
import { Icon, TshirtSize, TshirtSizeNormalized } from './common';

export type ButtonKind = 'primary' | 'danger' | 'neutral';

export type ButtonMode = 'filled' | 'outlined' | 'text';

export interface ButtonGroupButton {
  appendIcon?: Icon;
  disabled?: boolean;
  href?: string;
  icon?: Icon;
  label?: string;
  prependIcon?: Icon;
  slot?: string;
  to?: RouteLocationRaw;
  toggle?: boolean;
};

export interface ButtonProps {
  appendIcon?: Icon;
  block?: boolean;
  disabled?: boolean;
  href?: string;
  icon?: Icon;
  kind?: ButtonKind;
  mode?: ButtonMode;
  modelValue?: boolean;
  prependIcon?: Icon;
  size?: TshirtSize;
  tag?: string;
  to?: RouteLocationRaw;
  toggle?: boolean;
  type?: 'button' | 'submit' | 'reset';
}

export interface ButtonGroupProps {
  buttons: ButtonGroupButton[];
  kind?: ButtonKind;
  modelValue?: number;
  /* radio functions like a true radio, where once it's on it doesn't turn off
   alternately you could handle it with all the buttons set to toggle */
  radio?: boolean;
  size?: TshirtSize;
}

export interface CloseButtonProps {
  disabled?: boolean;
  round?: boolean;
  size?: TshirtSizeNormalized;
}
