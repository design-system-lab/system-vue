import Home from '../pages/HomePage.vue';
import ButtonPage from '../pages/ButtonPage.vue';
import ButtonGroupPage from '../pages/ButtonGroupPage.vue';
import ColorsPage from '../pages/ColorsPage.vue';
import GridPage from '../pages/GridPage.vue';
import GroupPage from '../pages/GroupPage.vue';
import IconPage from '../pages/IconPage.vue';
import TypographyPage from '../pages/TypographyPage.vue';

export default [
  { path: '/', name: 'Home', component: Home },
  { path: '/buttons', name: 'Buttons', component: ButtonPage },
  { path: '/button-group', name: 'ButtonGroup', component: ButtonGroupPage },
  { path: '/colors', name: 'Colors', component: ColorsPage },
  { path: '/grid', name: 'Grid', component: GridPage },
  { path: '/group', name: 'Group', component: GroupPage },
  { path: '/icons', name: 'Icons', component: IconPage },
  { path: '/typography', name: 'Typography', component: TypographyPage },
]