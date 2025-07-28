<template>
  <fd-app class="app">
    <header class="pa-8">
      <fd-row>
        <fd-col>
          <h1>Fora Design System</h1>
        </fd-col>
        <fd-col>
          <fd-select
            id="path-select"
            v-model="path"
            :items="[
              { text: 'Home', value: '/' },
              { text: 'Accordion', value: '/accordion' },
              { text: 'Alerts', value: '/alerts' },
              { text: 'Buttons', value: '/buttons' },
              { text: 'Card', value: '/card' },
              { text: 'Checkbox', value: '/checkbox' },
              { text: 'Chips', value: '/chips' },
              { text: 'Colors', value: '/colors' },
              { text: 'Grid', value: '/grid' },
              { text: 'Icons', value: '/icons' },
              { text: 'Input Field', value: '/input-field' },
              { text: 'Menu Button', value: '/menu-button' },
              { text: 'Modal', value: '/modal' },
              { text: 'Radio Button', value: '/radio' },
              { text: 'Select', value: '/select' },
              { text: 'Split Button', value: '/split-button' },
              { text: 'Textarea', value: '/textarea' },
              { text: 'Toast', value: '/toast' },
              { text: 'Toggle', value: '/toggle' },
              { text: 'Typography', value: '/typography' },
            ]"
          />
        </fd-col>
      </fd-row>
    </header>
    <main id="main">
      <router-view />
    </main>
  </fd-app>
</template>

<script lang="ts">
import { defineComponent, shallowRef, watch } from 'vue';
import FdRow from '../../src/components/Row';
import FdCol from '../../src/components/Col';
import { FdSelect } from '../../src/components/Form';
import FdApp from '../../src/components/App';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'App',
  components: { FdApp, FdCol, FdRow, FdSelect },
  setup() {
    const path = shallowRef(['/']);
    const router = useRouter();

    watch(path, (newPath) => {
      if (newPath[0] !== router.currentRoute.value.path) {
        router.push(newPath[0]);
      }
    });

    return {
      path,
    };
  },
});
</script>

<style lang="scss" scoped>

header {
  background-color: rgb(var(--fora_neutral_reduced));
  border-bottom: 1px solid rgb(var(--fora_neutral_reduced_pressed));
}

</style>
