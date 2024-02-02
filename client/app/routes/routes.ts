import Home from '../pages/HomePage.vue';
import ButtonPage from '../pages/ButtonPage.vue';
import ColorsPage from '../pages/ColorsPage.vue';
import InputFieldPage from '../pages/InputFieldPage.vue';
import GridPage from '../pages/GridPage.vue';
import GroupPage from '../pages/GroupPage.vue';
import IconPage from '../pages/IconPage.vue';
import SwitchPage from '../pages/SwitchPage.vue';
import TypographyPage from '../pages/TypographyPage.vue';

export default [
  { path: '/', name: 'Home', component: Home },
  { path: '/buttons', name: 'Buttons', component: ButtonPage },
  { path: '/colors', name: 'Colors', component: ColorsPage },
  { path: '/input-field', name: 'InputField', component: InputFieldPage },
  { path: '/grid', name: 'Grid', component: GridPage },
  { path: '/group', name: 'Group', component: GroupPage },
  { path: '/icons', name: 'Icons', component: IconPage },
  { path: '/switch', name: 'Switch', component: SwitchPage },
  { path: '/typography', name: 'Typography', component: TypographyPage },
]