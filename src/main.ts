import type { App } from 'vue'

type AppOptions = {
  theme: string;
}

export default {
  install: (app: App, options: AppOptions = { theme: 'light'}) => {
    app.config.globalProperties.$theme = options.theme;
  }
}