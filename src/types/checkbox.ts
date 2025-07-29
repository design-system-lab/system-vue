import { ErrorMessages } from './common';

export interface CheckboxBaseProps {
  disabled?: boolean;
  errors?: string[];
  id: string;
  indeterminate?: boolean;
  inputAttrs?: {[key: string]: string};
  modelValue?: boolean;
  readonly?: boolean;
  small?: boolean;
  value?: string;
}

export interface CheckboxProps extends CheckboxBaseProps {
  label?: string;
}

export interface CheckboxGroupCheckbox extends CheckboxProps {
  slotName?: string;
}

export interface CheckboxGroupProps {
  assistiveText?: string;
  checkboxes: CheckboxGroupCheckbox[];
  disabled?: boolean;
  errors?: string[];
  errorMessages?: ErrorMessages;
  id: string;
  label?: string;
  modelValue?: string[];
  persistentAssistiveText?: boolean;
}
