import type { AlertKind } from './alert';
import type { Icon, TshirtSizeNormalized } from './common';

export interface BadgeProps {
  kind?: AlertKind;
  mode?: 'filled' | 'outline';
  showIndicator?: boolean;
  icon?: Icon;
  prependIcon?: Icon;
  appendIcon?: Icon;
  truncate?: boolean;
  maxWidth?: string;
  size?: TshirtSizeNormalized;
}
