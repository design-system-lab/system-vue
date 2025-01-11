import { render } from '@testing-library/vue'
import FdAlert from './FdAlert.vue'
import { CubeTransparentIcon } from '@heroicons/vue/24/solid';

const provide = {
  i18n: { t: (key: string) => key },
};

const props = {
  dismissible: true,
  icon: CubeTransparentIcon,
};

const slots = {
  default: 'ALERT_TEXT'
};

const namedSlots = {
  default: 'HEADING_TEXT',
  description: 'DESCRIPTION_TEXT',
  link: 'LINK_TEXT',
}

test('renders alert text', () => {
  const { getByText } = render(FdAlert, { props, slots, global: { provide } });

  getByText(slots.default);
});

test('renders named slots text', () => {
  const { getByText } = render(FdAlert, { props, slots: namedSlots, global: { provide } });

  getByText(namedSlots['default'], {exact: false});
  getByText(namedSlots['description'], {exact: false});
  getByText(namedSlots['link'], {exact: false});
});