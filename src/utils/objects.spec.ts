import { isObjEmpty } from './objects';

describe('objects functions', () => {
  test('isObjEmpty returns true for {}', () => {
    expect(isObjEmpty({})).toBe(true);
  });

  test('isObjEmpty returns false for object with properties', () => {
    expect(isObjEmpty({ foo: true })).toBe(false);
  });
});