import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router';
import Fora from '../../src/main';
import App from './App.vue'
import routes from './routes/routes';
import './styles/global.scss';

const router = createRouter({
  history: createWebHistory(),
  routes,
});

const translations = {
  fr: {
    close: 'Fermer',
  }
}

createApp(App)
.use(router)
.use(Fora, { translations })
.mount('#app');
