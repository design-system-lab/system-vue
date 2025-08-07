<script lang="ts" setup>
import type { IconProps } from '../../types';

withDefaults(defineProps<IconProps>(), {
  icon: () => ({}),
  size: 24,
});
</script>

<template>
  <span
    class="fd-icon"
    :class="`fd-icon--size-${size}`"
    :style="{ width: `${size}px`, height: `${size}px` }"
  >
    <slot>
      <component
        :is="icon"
      />
    </slot>
  </span>
</template>

<style lang="scss">
.fd-icon {
  color: currentColor;
  display: inline-block;
  vertical-align: middle;
}
</style>