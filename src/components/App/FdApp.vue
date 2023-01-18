<template>
  <div
    class="fd-app"
    :data-theme="theme"
  >
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent, inject } from 'vue';
import { ThemeSupport } from '../../utils/theme';

export default defineComponent({
  name: 'FdApp',
  setup() {
    const { theme } = inject('theme') as ThemeSupport;

    return { theme };
  },
});
</script>
