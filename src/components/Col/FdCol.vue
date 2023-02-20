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

<script lang="ts">
import { computed, defineComponent } from 'vue';

export default defineComponent({
  name: 'FdCol',
  props: {
    alignStart: {
      type: Boolean,
      default: false,
    },
    alignCenter: {
      type: Boolean,
      default: false,
    },
    alignEnd: {
      type: Boolean,
      default: false,
    },
    alignStretch: {
      type: Boolean,
      default: false,
    },
    alignBaseline: {
      type: Boolean,
      default: false,
    },
    col: {
      type: String,
      default: '',
    },
    offset: {
      type: String,
      default: '',
    },
    order: {
      type: String,
      default: '',
    },
  },
  setup(props) {
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

    return { processedCols, processedOffset, processedOrder }
  }
});

</script>
