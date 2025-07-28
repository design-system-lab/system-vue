import { RouteLocationRaw } from 'vue-router';
import { Icon, TshirtSize } from './common';

export type ButtonKind = 'primary' | 'danger' | 'neutral';

export type ButtonMode = 'filled' | 'outlined' | 'text';

export interface ButtonGroupButton {
  appendIcon?: Icon;
  disabled?: boolean;
  href?: string;
  icon?: boolean;
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
