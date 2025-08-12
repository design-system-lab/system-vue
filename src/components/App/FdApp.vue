<script lang="ts" setup>
import { inject, provide, shallowRef } from 'vue';
import FdToaster from '../Toast/FdToaster.vue';
import { useToaster, type ThemeSupport } from '../../utils';

const { theme } = inject('theme') as ThemeSupport;
const app = shallowRef<HTMLDivElement | null>(null);
const { deployToast, toasts } = useToaster();

provide('app', app);
provide('deployToast', deployToast);
</script>

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

<style lang="scss" scoped>
.fd-app {
  color: rgb(var(--fora_neutral-13));
  min-height: 100vh;
}
</style>
