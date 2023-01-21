import Home from '../pages/HomePage.vue';
import ButtonPage from '../pages/ButtonPage.vue';
import IconPage from '../pages/IconPage.vue';

export default [
  { path: '/', name: 'Home', component: Home },
  { path: '/buttons', name: 'Buttons', component: ButtonPage },
  { path: '/icons', name: 'Icons', component: IconPage },
]