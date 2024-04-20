<template>

</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { StopLight } from '../../types';

export default defineComponent({
  name: 'FdChip',
  props: {
    dismissible: {
      type: Boolean,
      default: false
    },
    icon: {
      type: String,
      default: ''
    },
    interactive: {
      type: Boolean,
      default: false
    },
    label: {
      type: String,
      default: ''
    },
    outlined: {
      type: Boolean,
      default: false
    },
    selected: {
      type: Boolean,
      default: false
    },
    state: {
      type: String as PropType<StopLight>,
      default: ''
    }
  },
    setup(props, { emit }) {
        const onClose = () => {
            emit('close');
        };

        return {
            onClose
        };
    }
});
</script>