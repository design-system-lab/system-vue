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

createApp(App)
.use(router)
.use(Fora)
.mount('#app');
