import { PropType } from 'vue';
import { tshirt } from '../utils/validators';
import { ButtonKind } from '../types/button';
import { ButtonGroupButton } from '../types/button';
import { TshirtSize } from '../types/common';

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
