import type { ErrorMessages, Icon, SlotOrText } from './common';
import type { MenuDirection, MenuPlacement } from './menu';

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

export interface RadioBaseProps {
  disabled?: boolean;
  errors?: string[];
  inputAttrs?: Record<string, string>;
  modelValue?: string;
  name: string;
  readonly?: boolean;
  value?: string;
}

export interface RadioProps {
  disabled?: boolean;
  errors?: string[];
  inputAttrs?: Record<string, string>;
  label?: string;
  modelValue?: string;
  name?: string;
  readonly?: boolean;
  value: string;
}

export interface RadioGroupProps {
  assistiveText?: string;
  disabled?: boolean;
  errors?: string[];
  errorMessages?: ErrorMessages;
  id: string;
  label?: string;
  modelValue?: string;
  name?: string;
  persistentAssistiveText?: boolean;
  radios: RadioProps[];
}

export interface SelectOptionDefault {
  icon?: Icon;
  selected?: boolean;
  value: string;
}

export type SelectOption = SlotOrText & SelectOptionDefault;

export interface SelectProps {
  assistiveText?: string;
  checkboxEnd?: boolean;
  chips?: boolean;
  chipsInteractive?: boolean;
  csv?: boolean;
  describedby?: string;
  disabled?: boolean;
  direction?: MenuDirection;
  displaySelectionIcon?: boolean;
  errors?: string[];
  errorMessages?: ErrorMessages;
  id: string;
  inputAttrs?: Record<string, string>;
  items: SelectOption[];
  label?: string;
  labelledby?: string;
  menuPlacement?: MenuPlacement;
  menuWidth?: string;
  modelValue: string[];
  multiple?: boolean;
  persistentAssistiveText?: boolean;  
  placeholder?: string;
  prependIcon?: Icon;
  readonly?: boolean;
  size?: number;
  small?: boolean;
}

export interface SelectValueProps {
  chips?: boolean;
  chipsInteractive?: boolean;
  csv?: boolean;
  modelValue: SelectOption[];
  multiple?: boolean;
  wrap?: boolean;
}

export interface TextareaProps {
  appendIcon?: Icon;
  assistiveText?: string;
  count?: number;
  describedby?: string;
  disabled?: boolean;
  enforceCount?: boolean;
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
  resize?: 'none' | 'both' | 'horizontal' | 'vertical' | 'block' | 'inline';
  rows?: string | number;
  small?: boolean;
}

export interface ToggleProps {
  hideLabel?: boolean;
  label?: string;
  id: string;
  modelValue?: boolean;
  reverseLabel?: boolean;
  showValue?: boolean;
  valueFalse?: string;
  valueTrue?: string;
}
