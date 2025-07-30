import { Icon, SlotOrText } from './common';

export type ChipSize = 'sm' | 'md' | 'lg';

export  interface ChipProps {
  dismissible?: boolean;
  icon?: Icon;
  interactive?: boolean;
  modelValue?: string | string[] | boolean;
  size?: ChipSize;
  tag?: string;
  text?: string;
  value?: string;
}

export interface ChipGroupProps {
  chips: (ChipProps & SlotOrText & { iconSlotName?: string })[];
  modelValue?: string | string[] | null;
  size?: ChipSize;
}
