import { SlotOrText } from './common';

export interface SelectOptionDefault {
  selected?: boolean;
  value: string;
}

export type SelectOption = SlotOrText & SelectOptionDefault;