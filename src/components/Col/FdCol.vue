<script lang="ts" setup>
import { computed } from 'vue';
import { FdColProps } from '../../types';

const props = withDefaults(defineProps<FdColProps>(), {
  alignStart: false,
  alignCenter: false,
  alignEnd: false,
  alignStretch: false,
  alignBaseline: false,
  col: '',
  offset: '',
  order: '',
});

// TODO: check that string is valid before adding
const processedCols = computed(() => {
  if (props.col.length === 0) return '';
  return props.col.split(' ').reduce((acc, cur) => `${acc}col-${cur} `, '')
});

// TODO: check that string is valid before adding
const processedOffset = computed(() => {
  if (props.offset.length === 0) return '';
  return props.offset.split(' ').reduce((acc, cur) => `${acc}offset-${cur} `, '')
});

// TODO: check that string is valid before adding
const processedOrder = computed(() => {
  if (props.order.length === 0) return '';
  return props.order.split(' ').reduce((acc, cur) => `${acc}order-${cur} `, '')
});
</script>

<template>
  <div
    :class="[
      processedCols,
      processedOffset,
      processedOrder,
      {
        'align-start': alignStart,
        'align-center': alignCenter,
        'align-end': alignEnd,
        'align-stretch': alignStretch,
        'align-baseline': alignBaseline,
        'col': col.length === 0,
      }
    ]"
  >
    <slot />
  </div>
</template>
