import Home from '../pages/HomePage.vue';
import ButtonPage from '../pages/ButtonPage.vue';
import ColorsPage from '../pages/ColorsPage.vue';
import GridPage from '../pages/GridPage.vue';
import IconPage from '../pages/IconPage.vue';

export default [
  { path: '/', name: 'Home', component: Home },
  { path: '/buttons', name: 'Buttons', component: ButtonPage },
  { path: '/colors', name: 'Colors', component: ColorsPage },
  { path: '/grid', name: 'Grid', component: GridPage },
  { path: '/icons', name: 'Icons', component: IconPage },
]