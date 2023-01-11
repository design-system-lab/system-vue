import { tshirt } from './validators';

describe('validator functions', () => {
  test('tshirt validator accepts tshirt string', () => {
    expect(tshirt('sm')).toBe(true);
  });

  test('tshirt validator denys non-tshirt string', () => {
    expect(tshirt('xxxl')).toBe(false);
  });
});