import { render } from '@testing-library/vue'
import FdCheckbox from './FdCheckbox.vue'

// write unit test for FdCheckbox component
test('renders checkbox text', () => {
  const { getByText } = render(FdCheckbox, {
    props: {
      id: 'checkbox',
      label: 'Checkbox Label',
      value: 'checkbox',
    },
  });

  getByText('Checkbox Label');
});

// write unit test for disabled FdCheckbox component
test('renders disabled checkbox', () => {``
  const { getByText } = render(FdCheckbox, {
    props: {
      id: 'checkbox',
      label: 'Checkbox Label',
      value: 'checkbox',
      disabled: true,
    },
  });

  getByText('Checkbox Label');
  // check if checkbox is disabled
  const checkbox = document.querySelector('input[type="checkbox"]:disabled');
  expect(checkbox).toBeDefined();
});

// write unit test for checked FdCheckbox component
test('renders checked checkbox', () => {
  const { getByText } = render(FdCheckbox, {
    props: {
      id: 'checkbox',
      label: 'Checkbox Label',
      value: 'checkbox',
      modelValue: true,
    },
  });

  getByText('Checkbox Label');
  // check if checkbox is checked
  const checkbox = document.querySelector('input[type="checkbox"]:checked');
  expect(checkbox).toBeDefined();
});

// write unit test for indeterminate FdCheckbox component
test('renders indeterminate checkbox', () => {
  const { getByText } = render(FdCheckbox, {
    props: {
      id: 'checkbox',
      label: 'Checkbox Label',
      value: 'checkbox',
      indeterminate: true,
    },
  });

  getByText('Checkbox Label');
  // check if checkbox is indeterminate
  const checkbox = document.querySelector('input[type="checkbox"]:indeterminate');
  expect(checkbox).toBeDefined();
});
