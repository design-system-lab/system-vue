import { filterSlots } from './components';

describe('component functions', () => {
  test('filterSlots returns the correct object', () => {
    const permitted = ['foo', 'bar'];
    const emptySlots = filterSlots({}, permitted);
    expect('foo' in emptySlots || 'bar' in emptySlots).toBeFalsy();
    const oneSlot = filterSlots({ bar: undefined }, permitted);
    expect(!('foo' in oneSlot) && 'bar' in oneSlot).toBeTruthy();
    const twoSlots = filterSlots({ bar: undefined, jar: undefined }, permitted);
    expect(!('foo' in twoSlots) && 'bar' in twoSlots && !('jar' in twoSlots)).toBeTruthy();
    const noSlots = filterSlots({ bar: undefined, jar: undefined }, []);
    expect(!('foo' in noSlots) && !('bar' in noSlots) && !('jar' in noSlots)).toBeTruthy();
  });
});
