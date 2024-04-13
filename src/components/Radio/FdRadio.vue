<template>
  <div class="fd-radio">

  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'FdRadio',
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
