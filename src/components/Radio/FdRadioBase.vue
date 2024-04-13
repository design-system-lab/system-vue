<template>

</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'FdRadioBase',
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
    modelValue: {
      type: [String, Number, Boolean],
      default: null,
    },
    name: {
      type: String,
      default: null,
    },
    value: {
      type: [String, Number, Boolean],
      default: null,
    },
  },
  emits: ['update:modelValue'],
  setup(_, { emit }) {
    return {};
  },
});
</script>
