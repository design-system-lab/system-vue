<template>
  <div
    :class="[
      processedCols,
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
    }
  },
  setup(props) {
    const processedCols = computed(() => (
      props.col.split(' ').reduce((acc, cur) => `${acc}col-${cur} `, '')
    ));

    return { processedCols }
  }
});

</script>
