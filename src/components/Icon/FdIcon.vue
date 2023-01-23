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
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'FdIcon',
  props: {
    icon: {
      type: Object,
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
  display: inline-block;
}
</style>