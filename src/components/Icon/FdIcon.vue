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

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { Icon } from '../../types';

export default defineComponent({
  name: 'FdIcon',
  props: {
    icon: {
      type: Function as PropType<Icon>,
      default: () => ({}),
    },
    size: {
      type: Number,
      default: 24,
    },
  },
});
</script>

<style lang="scss">
.fd-icon {
  color: currentColor;
  display: inline-block;
  vertical-align: middle;
}
</style>