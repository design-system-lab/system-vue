import { render } from '@testing-library/vue'
import FdCloseButton from './FdCloseButton.vue'

const provide = {
  i18n: { t: (key: string) => key },
};

// write unit tests for FdCloseButton component checking all props, slots and events
test('renders default close button', () => {
  const { getByTestId } = render(FdCloseButton, { global: { provide } });

  getByTestId('fd-close-button__icon--20');
});

test('renders large close button', () => {
  const { getByTestId } = render(FdCloseButton, {
    props: {
      size: 'lg',
    },
    global: { provide }
  });

  getByTestId('fd-close-button__icon--24');
});

test('renders small close button', () => {
  const { getByTestId } = render(FdCloseButton, {
    props: {
      size: 'sm',
    },
    global: { provide }
  });

  getByTestId('fd-close-button__icon--16');
});
