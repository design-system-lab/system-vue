import { Icon, SlotOrText } from './common';

export interface SelectOptionDefault {
  icon?: Icon;
  selected?: boolean;
  value: string;
}

export type SelectOption = SlotOrText & SelectOptionDefault;