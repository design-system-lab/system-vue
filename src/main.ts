import type { App } from 'vue'
import type { ForaOptions } from './composables/app';

export default {
  install: (app: App, { theme = 'light', rtl = false }: ForaOptions = {}) => {
    app.config.globalProperties.$theme = theme;
    app.config.globalProperties.$rtl = rtl;
  }
}