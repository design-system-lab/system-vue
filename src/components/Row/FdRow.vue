<template>
  <div
    class="row"
    :class="{
      'justify-center': justifyCenter,
      'justify-end': justifyEnd,
      'justify-between': justifyBetween,
      'justify-around': justifyAround,
      'justify-evenly': justifyEvenly,
      'no-gutter': noGutter,
      reverse,
    }"
  >
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'FdRow',
  props: {
    justifyCenter: {
      type: Boolean,
      default: false,
    },
    justifyEnd: {
      type: Boolean,
      default: false,
    },
    justifyBetween: {
      type: Boolean,
      default: false,
    },
    justifyAround: {
      type: Boolean,
      default: false,
    },
    justifyEvenly: {
      type: Boolean,
      default: false,
    },
    noGutter: {
      type: Boolean,
      default: false,
    },
    reverse: {
      type: Boolean,
      default: false,
    },
  },
});
</script>
