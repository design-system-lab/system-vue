import { fireEvent, render } from '@testing-library/vue'
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
  const { getByText } = render(FdInputField, { props: { ...props, errors: [] } });

  getByText(props.label);
  getByText(props.assistiveText)
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

// test disabled
// test readonly
// test append icon exists
// test prepend icon exists
// test icon slots & label/error/assistive slots
test('renders named slots text', () => {
  const { getByText } = render(FdInputField, { props, slots: namedSlots });

  getByText(namedSlots['append-icon'], {exact: false});
  getByText(namedSlots['prepend-icon'], {exact: false});
});
// test input attrs
// test aria specific attributes
// test that input is emitted correctly