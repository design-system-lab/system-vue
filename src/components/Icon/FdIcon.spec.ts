import { h } from 'vue';
import { render } from '@testing-library/vue'
import FdIcon from './FdIcon.vue'
import { BeakerIcon } from '@heroicons/vue/24/solid';

test('renders content passed within slot', async () => {
  const slots = {
    default: 'TEST_CONTENT',
  }

  const { getByText } = render(FdIcon, { slots });

  getByText(slots.default);
})

test('renders icon passed as prop', async () => {
  const icon = h(BeakerIcon);
  const props = {
    icon,
  };

  const { container } = render(FdIcon, { props });

  expect(container.querySelector('svg')).toBeTruthy();
})
