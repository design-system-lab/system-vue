import { RouteLocationRaw } from 'vue-router';
import { Icon } from './common';

export type ButtonKind = 'primary' | 'danger' | 'neutral';

export type ButtonMode = 'filled' | 'outlined' | 'text';

export type ButtonGroupButton = {
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
