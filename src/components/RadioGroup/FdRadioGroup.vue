<template>
  <div class="fd-radio-group">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'FdRadioGroup',
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
  },
  emits: ['update:modelValue'],
  setup(_, { emit }) {
    return {};
  },
});
</script>
