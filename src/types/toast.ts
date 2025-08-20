import type { Icon } from './common';
import type { AlertKind } from './alert';

export type ToastKind = Exclude<AlertKind, 'default'>;

export interface Toast {
  duration?: number,
  id?: string,
  offset?: number,
  position?: 'top-left' | 'top-right' | 'bottom-right' | 'bottom-left',
  props?: Record<string, unknown>,
  onAppear?: () => void,
  onDismiss?: () => void,
  onClickLink?: () => void,
  onLeave?: () => void
}

export interface MappedToasts {
  'top-left': Toast[],
  'top-right': Toast[],
  'bottom-right': Toast[],
  'bottom-left': Toast[]
}

export interface ToastProps {
  content?: string;
  description?: string;
  dismissible?: boolean;
  icon?: Icon;
  kind?: ToastKind;
  linkText?: string;
  showTimestamp?: boolean;
}

export interface ToasterProps {
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
  toasts?: Toast[];
}
