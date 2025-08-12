import type { AlertKind } from './alert';
import type { Icon } from './common';

export interface BannerProps {
  dismissible?: boolean;
  icon?: Icon;
  kind?: AlertKind;
  linkText?: string;
}
