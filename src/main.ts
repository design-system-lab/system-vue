import type { App } from 'vue'
import type { ForaOptions } from './composables/app';
import { themeSupport } from './utils/theme';
import { i18n, rtlSupport } from './utils/i18n';

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