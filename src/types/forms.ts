import { ErrorMessages, Icon, SlotOrText } from './common';

export interface SelectOptionDefault {
  icon?: Icon;
  selected?: boolean;
  value: string;
}

export type SelectOption = SlotOrText & SelectOptionDefault;

export interface InputFieldProps {
  appendIcon?: Icon;
  assistiveText?: string;
  describedby?: string;
  disabled?: boolean;
  errors?: string[];
  errorMessages?: ErrorMessages;
  id: string;
  inputAttrs?: Record<string, string>;
  label?: string;
  labelledby?: string;
  modelValue?: string;
  persistentAssistiveText?: boolean;
  placeholder?: string;
  prependIcon?: Icon;
  readonly?: boolean;
  small?: boolean;
  type?: string;
}

export interface InputPostTextProps {
  assistiveText?: string;
  errors?: string[];
  errorMessages?: ErrorMessages;
  id?: string;
  persistentAssistiveText?: boolean;
}
