import { render } from '@testing-library/vue'
import { dom } from '../../../testing/utils';
import FdRow from './FdRow.vue'

const props = {
  justifyCenter: true,
  justifyEnd: true,
  justifyBetween: true,
  justifyAround: true,
  justifyEvenly: true,
  noGutter: true,
  reverse: true,
};

const slots = {
  default: 'SLOT_CONTENT'
};

test('row renders, has slot content, has grid classes', async () => {
  const { getByText } = render(FdRow, { props, slots });

  const row = getByText(slots.default);

  const classes: string[] = ['justify-center', 'justify-end', 'justify-between', 'justify-around', 'justify-evenly', 'no-gutter', 'reverse'];

  expect(dom.checkClasses(row, classes)).toBeTruthy();
})
