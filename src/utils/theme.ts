import { shallowRef, ShallowRef } from 'vue';

export interface ThemeSupport {
  theme: ShallowRef<string>
  updateTheme: (val: string) => void;
}

export const themeSupport = (t: string): ThemeSupport => {
  const theme = shallowRef(t);
  const updateTheme = (val: string) => {
    theme.value = val;
  }

  return { theme, updateTheme };
};