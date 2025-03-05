import type { App } from 'vue'
import { i18n, rtlSupport, themeSupport } from './utils';
import type { ForaOptions } from './types';

export default {
  install: (app: App, {
    theme = 'default',
    rtl = false,
    translations = {},
    lang = 'en',
  }: ForaOptions = {}) => {
    app.provide('theme', themeSupport(theme));
    app.provide('rtl', rtlSupport(rtl));
    app.provide('i18n', i18n(lang, translations));
  }
}
