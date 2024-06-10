import { render } from '@testing-library/vue'
import FdSelect from './FdSelect.vue'
import { CubeTransparentIcon } from '@heroicons/vue/24/solid';

const props = {
  assistiveText: 'TEST_ASSISTIVE',
  errors: ['format'],
  errorMessages: {
    format: 'TEST_FORMAT_ERROR_MESSAGE',
    required: 'TEST_REQUIRED_ERROR_MESSAGE',
  },
  id: 'test-id-1',
  inputAttrs: {'data-testid': 'INPUT_ELEMENT'},
  items: [
    {
      text: 'TEST_ITEM',
      value: 'test-item',
    },
    {
      text: 'ANOTHER_ITEM',
      value: 'another-item',
    },
    {
      text: 'EXAMPLE_ITEM',
      value: 'example-item',
    },
  ],
  label: 'TEST_LABEL',
  prependIcon: CubeTransparentIcon,
};

const namedSlots = {
  label: 'LABEL_TEXT',
  'prepend-icon': 'PREPEND_TEXT',
  'error-text': 'ERROR_TEXT',
  'assistive-text': 'ASSISTIVE_TEXT',
}

const provide = {
  i18n: { t: (key: string) => key },
};

test('renders default input with label and assistive text', async () => {
  const initItem = props.items[0];
  const { getByText } = render(FdSelect, { props: { ...props, modelValue: [initItem.value], errors: [] }, global: { provide } });

  getByText(props.label);
  getByText(props.assistiveText);
});

test('renders default input with label, error, and assistive text', async () => {
  const { getByText, queryByText } = render(FdSelect, { props, global: { provide } });

  expect(queryByText(props.assistiveText)).toBeNull()
  getByText(props.errorMessages.format);
});

test('renders default input with label, error, and persistent assistive text', async () => {
  const { getByText } = render(FdSelect, { props: { ...props, persistentAssistiveText: true }, global: { provide } });

  getByText(props.assistiveText)
  getByText(props.errorMessages.format);
});

test('renders named slots text', () => {
  const { getByText } = render(FdSelect, { props: { ...props, persistentAssistiveText: true }, slots: namedSlots, global: { provide } });

  getByText(namedSlots['assistive-text'], {exact: false});
  getByText(namedSlots['error-text'], {exact: false});
  getByText(namedSlots['label'], {exact: false});
  getByText(namedSlots['prepend-icon'], {exact: false});
});

test('passes input attributes to input element', () => {``
  const { getByTestId } = render(FdSelect, { props, global: { provide } });

  getByTestId(props.inputAttrs['data-testid']);
});

