import { render } from '@testing-library/vue'
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

  expect(row.classList).toContain('justify-center');
  expect(row.classList).toContain('justify-end');
  expect(row.classList).toContain('justify-between');
  expect(row.classList).toContain('justify-around');
  expect(row.classList).toContain('justify-evenly');
  expect(row.classList).toContain('no-gutter');
  expect(row.classList).toContain('reverse');
})
