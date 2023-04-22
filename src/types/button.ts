import { RouteLocationRaw } from 'vue-router';
import { Icon } from './common';

export type ButtonKind = 'primary' | 'secondary' | 'tertiary' | 'tertiary-neutral' | 'link' | 'destructive';

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
