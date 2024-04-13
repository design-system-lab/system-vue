import { Icon, SlotOrText } from './common';

export interface CheckboxGroupCheckbox {
  disabled?: boolean;
  errors?: string[];
  id: string;
  indeterminate?: boolean;
  inputAttrs?: Record<string, string>;
  label: string;
  modelValue?: boolean;
  readonly?: boolean;
  slotName?: string;
  small?: boolean;
  value: string;
}

export interface SelectOptionDefault {
  icon?: Icon;
  selected?: boolean;
  value: string;
}

export type SelectOption = SlotOrText & SelectOptionDefault;