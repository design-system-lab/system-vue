import { PropType } from 'vue';
import { tshirt } from '../utils/validators';
import { ButtonKind } from '../types/button';
import { ButtonGroupButton } from '../types/button';
import { ErrorMessages, TshirtSize } from '../types/common';
import { CheckboxGroupCheckbox } from '../types/forms';

export const buttonGroupProps = {
  buttons: {
    type: Array as PropType<ButtonGroupButton[]>,
    default: () => [],
  },
  kind:  {
    type: String as PropType<ButtonKind>,
    default: 'primary',
  },
  modelValue: {
    type: Number,
    default: -1,
  },
  // radio functions like a true radio, where once it's on it doesn't turn off
  // alternately you could handle it with all the buttons set to toggle
  radio: {
    type: Boolean,
    default: false,
  },
  size: {
    type: String as PropType<TshirtSize>,
    default: 'md',
    validator: (opt: string) => tshirt(opt),
  },
};

export const checkboxGroupProps = {
  assistiveText: {
    type: String,
    default: undefined,
  },
  checkboxes: {
    type: Array as PropType<CheckboxGroupCheckbox[]>,
    default: () => [],
  },
  errors: {
    type: Array as PropType<string[]>,
    default: () => [],
  },
  errorMessages: {
    type: Object as PropType<ErrorMessages>,
    default: () => ({}),
  },
  id: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    default: undefined,
  },
  persistentAssistiveText: {
    type: Boolean,
    default: false,
  },
};
