import { render } from '@testing-library/vue'
import userEvent from '@testing-library/user-event';
import FdInputField from './FdInputField.vue'
import { CubeTransparentIcon } from '@heroicons/vue/24/solid';

const props = {
  appendIcon: CubeTransparentIcon,
  assistiveText: 'TEST_ASSISTIVE',
  errors: ['format'],
  errorMessages: {
    format: 'TEST_FORMAT_ERROR_MESSAGE',
    required: 'TEST_REQUIRED_ERROR_MESSAGE',
  },
  id: 'test-id-1',
  inputAttrs: {'data-testid': 'INPUT_ELEMENT'},
  label: 'TEST_LABEL',
  prependIcon: CubeTransparentIcon,
};

const namedSlots = {
  label: 'LABEL_TEXT',
  'append-icon': 'APPEND_TEXT',
  'prepend-icon': 'PREPEND_TEXT',
  'error-text': 'ERROR_TEXT',
  'assistive-text': 'ASSISTIVE_TEXT',
}

test('renders default input with label and assistive text', async () => {
  const user = userEvent.setup();
  const inputVal = 'TEST_INPUT';
  const altVal = 'MY_VALUE';
  const { getByText, getByDisplayValue } = render(FdInputField, { props: { ...props, modelValue: inputVal, errors: [] } });

  getByText(props.label);
  getByText(props.assistiveText)

  // typing changes input
  getByDisplayValue(inputVal)?.focus();
  await user.keyboard(altVal);
  getByDisplayValue(`${inputVal}${altVal}`);
});

test('renders default input with label, error, and assistive text', async () => {
  const { getByText, queryByText } = render(FdInputField, { props });

  expect(queryByText(props.assistiveText)).toBeNull()
  getByText(props.errorMessages.format);
});

test('renders default input with label, error, and persistent assistive text', async () => {
  const { getByText } = render(FdInputField, { props: { ...props, persistentAssistiveText: true } });

  getByText(props.assistiveText)
  getByText(props.errorMessages.format);
});

test('renders disabled input', async () => {
  const user = userEvent.setup();
  const inputVal = 'TEST_INPUT';
  const altVal = 'MY_VALUE';
  const { getByDisplayValue, queryByDisplayValue } = render(FdInputField, { props: { ...props, modelValue: inputVal, disabled: true } });

  // typing does nothing
  getByDisplayValue(inputVal)?.focus();
  user.keyboard(altVal);
  expect(queryByDisplayValue(`${inputVal}${altVal}`)).toBeFalsy();
});

test('renders readonly input', async () => {
  const user = userEvent.setup();
  const inputVal = 'TEST_INPUT';
  const altVal = 'MY_VALUE';
  const { getByDisplayValue, queryByDisplayValue } = render(FdInputField, { props: { ...props, modelValue: inputVal, disabled: true } });

  // typing does nothing
  getByDisplayValue(inputVal)?.focus();
  user.keyboard(altVal);
  expect(queryByDisplayValue(`${inputVal}${altVal}`)).toBeFalsy();
});

test('renders named slots text', () => {
  const { getByText } = render(FdInputField, { props: { ...props, persistentAssistiveText: true }, slots: namedSlots });

  getByText(namedSlots['append-icon'], {exact: false});
  getByText(namedSlots['assistive-text'], {exact: false});
  getByText(namedSlots['error-text'], {exact: false});
  getByText(namedSlots['label'], {exact: false});
  getByText(namedSlots['prepend-icon'], {exact: false});
});
