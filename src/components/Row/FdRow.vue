<script lang="ts" setup>
import type { RowProps } from '../../types';

withDefaults(defineProps<RowProps>(), {
  justifyCenter: false,
  justifyEnd: false,
  justifyBetween: false,
  justifyAround: false,
  justifyEvenly: false,
  noGutter: false,
  reverse: false,
});
</script>

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
