import { themeSupport } from './theme';

describe('theme functions', () => {
  test('themeSupport returns object containing theme', () => {
    expect(themeSupport('dark').theme.value).toBe('dark');
  });

  test('themeSupport returns object containing function for changing theme', () => {
    const themes = themeSupport('dark');
    expect(themes.theme.value).toBe('dark');
    themes.updateTheme('light');
    expect(themes.theme.value).toBe('light');
  });
});