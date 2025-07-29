import { Icon } from './common';

export  interface ChipProps {
  dismissible?: boolean;
  icon?: Icon;
  interactive?: boolean;
  modelValue?: string | string[] | boolean;
  size?: 'sm' | 'md' | 'lg';
  tag?: string;
  text?: string;
  value?: string;
}
