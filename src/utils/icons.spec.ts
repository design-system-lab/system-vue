import { getIconSize } from "./icons";

describe('Icon functions', () => {
  test('correct icon size returned by passing t-shirt size', () => {
    const xsIconSize = getIconSize('xs');
    expect(xsIconSize).toBe(20);

    const smIconSize = getIconSize('sm');
    expect(smIconSize).toBe(20);

    const mdIconSize = getIconSize('md');
    expect(mdIconSize).toBe(24);

    const lgIconSize = getIconSize('lg');
    expect(lgIconSize).toBe(24);

    const xlIconSize = getIconSize('xl');
    expect(xlIconSize).toBe(24);
  })
});
