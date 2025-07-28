<template>
  <div
    ref="app"
    class="fd-app"
    :data-theme="theme"
  >
    <slot />
    <fd-toaster :toasts="toasts" />
  </div>
</template>

<script lang="ts">
import { defineComponent, inject, provide, shallowRef } from 'vue';
import FdToaster from '../Toast/FdToaster.vue';
import { useToaster, type ThemeSupport } from '../../utils';

export default defineComponent({
  name: 'FdApp',
  components: { FdToaster },
  setup() {
    const { theme } = inject('theme') as ThemeSupport;
    const app = shallowRef<HTMLDivElement | null>(null);
    const { deployToast, toasts } = useToaster();

    provide('app', app);
    provide('deployToast', deployToast);

    return { app, toasts, theme };
  },
});
</script>

<style lang="scss" scoped>
.fd-app {
  color: rgb(var(--fora_neutral-13));
  min-height: 100vh;
}
</style>
