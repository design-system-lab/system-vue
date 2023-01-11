import { isRouterLink } from './router';

const exampleRoute = { name: 'About' };

describe('router functions', () => {
  test('isRouterLink returns true for valid RouteLocationRaw', () => {
    expect(isRouterLink('/home')).toBe(true);
    expect(isRouterLink(exampleRoute)).toBe(true);
  });

  test('isRouterLink returns false for empty input', () => {
    expect(isRouterLink('')).toBe(false);
    expect(isRouterLink({})).toBe(false);
  });
});