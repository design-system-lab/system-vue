import { render } from '@testing-library/vue'
import FdButton from './FdButton.vue'

const props = {
  toggle: true
};

const slots = {
  default: 'BUTTON_TEXT'
};

test('increments value on click', async () => {
  const { getByText } = render(FdButton, { props, slots });

  getByText(slots.default);
})
