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
