import type { Icon, SlotOrText, TshirtSizeNormalized } from './common';

export  interface ChipProps {
  dismissible?: boolean;
  icon?: Icon;
  interactive?: boolean;
  modelValue?: string | string[] | boolean;
  size?: TshirtSizeNormalized;
  tag?: string;
  text?: string;
  value?: string;
}

export interface ChipGroupProps {
  chips: (ChipProps & SlotOrText & { iconSlotName?: string })[];
  modelValue?: string | string[] | null;
  size?: TshirtSizeNormalized;
}
