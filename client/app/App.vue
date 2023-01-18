<template>
  <fd-app class="app">
    <header>
      <h1>Fora Design System</h1>
    </header>
    <main id="main">
      <router-view />
    </main>
  </fd-app>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import FdApp from '../../src/components/App';

export default defineComponent({
  name: 'App',
  components: { FdApp },
});
</script>
