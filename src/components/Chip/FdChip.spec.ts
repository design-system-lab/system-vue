import { render } from '@testing-library/vue'
import FdChip from './FdChip.vue'
import { CubeTransparentIcon } from '@heroicons/vue/24/solid';

// write unit tests for FdChip component checking all props, slots and events
test('renders chip text', () => {
  const { getByText } = render(FdChip, {
    props: {
      text: 'Chip Label',
    },
  });

  getByText('Chip Label');
});

test('renders chip with icon', () => {
  const { getByText, getByTestId } = render(FdChip, {
    props: {
      text: 'Chip Label',
      icon: CubeTransparentIcon,
    },
  });

  getByText('Chip Label');
  getByTestId('fd-chip__icon');
});

test('renders chip with dismiss button', () => {
  const { getByText, getByTestId } = render(FdChip, {
    props: {
      text: 'Chip Label',
      dismissible: true,
    },
  });

  getByText('Chip Label');
  getByTestId('fd-chip__dismiss');
});

test('renders interactive chip with checkmark', async () => {
  const { getByTestId } = render(FdChip, {
    props: {
      text: 'Chip Label',
      interactive: true,
      modelValue: true,
    },
  });

  getByTestId('fd-chip__selected');
});
