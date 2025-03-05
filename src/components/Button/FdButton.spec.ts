import { render } from '@testing-library/vue'
import FdButton from './FdButton.vue'
import { CubeTransparentIcon } from '@heroicons/vue/24/solid';

const props = {
  appendIcon: CubeTransparentIcon,
  prependIcon: CubeTransparentIcon,
};

const slots = {
  default: 'BUTTON_TEXT'
};

const namedSlots = {
  'append-icon': 'APPEND_TEXT',
  icon: 'ICON_TEXT',
  'prepend-icon': 'PREPEND_TEXT',
}

test('renders button text', () => {
  const { getByText } = render(FdButton, { props, slots });

  getByText(slots.default);
});

test('renders named slots text', () => {
  const { getByText } = render(FdButton, { props, slots: namedSlots });

  getByText(namedSlots['append-icon'], {exact: false});
  getByText(namedSlots['icon'], {exact: false});
  getByText(namedSlots['prepend-icon'], {exact: false});
});
