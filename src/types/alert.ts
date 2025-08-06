import type { Icon } from './common';

export type AlertKind = 'default' | 'info' | 'success' | 'warning' | 'danger' | 'neutral';

export interface AlertProps {
  dismissible?: boolean;
  icon?: Icon;
  kind?: AlertKind;
  linkText?: string;
}
