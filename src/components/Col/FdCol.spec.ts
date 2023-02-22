import { render } from '@testing-library/vue'
import { dom } from '../../../testing/utils';
import FdCol from './FdCol.vue'

const props = {
  alignStart: true,
  alignCenter: true,
  alignEnd: true,
  alignStretch: true,
  alignBaseline: true,
  col: '3 sm-4 lg-5',
  offset: '4 sm-3 lg-2',
  order: '1 sm-2 lg-3',
};

const slots = {
  default: 'SLOT_CONTENT'
};

test('row renders, has slot content, has grid classes', async () => {
  const { getByText } = render(FdCol, { props, slots });

  const row = getByText(slots.default);

  const classes: string[] = ['align-start', 'align-center', 'align-end', 'align-stretch', 'align-baseline', 'col-3', 'col-sm-4', 'col-lg-5', 'offset-4', 'offset-sm-3', 'offset-lg-2', 'order-1', 'order-sm-2', 'order-lg-3'];
  expect(dom.checkClasses(row, classes)).toBeTruthy();
})