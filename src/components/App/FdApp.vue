<template>
  <div
    ref="app"
    class="fd-app"
    :data-theme="theme"
  >
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent, inject, provide, shallowRef } from 'vue';
import { ThemeSupport } from '../../utils';

export default defineComponent({
  name: 'FdApp',
  setup() {
    const { theme } = inject('theme') as ThemeSupport;
    const app = shallowRef<HTMLDivElement | null>(null);

    provide('app', app);

    return { app, theme };
  },
});
</script>
