import Home from '../pages/HomePage.vue';
import ButtonPage from '../pages/ButtonPage.vue';
import CheckboxPage from '../pages/CheckboxPage.vue';
import ColorsPage from '../pages/ColorsPage.vue';
import GridPage from '../pages/GridPage.vue';
import GroupPage from '../pages/GroupPage.vue';
import IconPage from '../pages/IconPage.vue';
import InputFieldPage from '../pages/InputFieldPage.vue';
import RadioPage from '../pages/RadioPage.vue';
import SelectPage from '../pages/SelectPage.vue';
import TogglePage from '../pages/TogglePage.vue';
import TypographyPage from '../pages/TypographyPage.vue';

export default [
  { path: '/', name: 'Home', component: Home },
  { path: '/buttons', name: 'Buttons', component: ButtonPage },
  { path: '/checkbox', name: 'Checkbox', component: CheckboxPage },
  { path: '/colors', name: 'Colors', component: ColorsPage },
  { path: '/grid', name: 'Grid', component: GridPage },
  { path: '/group', name: 'Group', component: GroupPage },
  { path: '/icons', name: 'Icons', component: IconPage },
  { path: '/input-field', name: 'InputField', component: InputFieldPage },
  { path: '/radio', name: 'Radio', component: RadioPage },
  { path: '/select', name: 'Select', component: SelectPage },
  { path: '/toggle', name: 'Toggle', component: TogglePage },
  { path: '/typography', name: 'Typography', component: TypographyPage },
]