<template>

</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

interface ErrorMessages {
  [key: string]: string; 
}

export default defineComponent({
  name: 'FdInputField',
  props: {
    label: {
      type: String,
      default: undefined,
    },
    errorMessages: {
      type: Object as PropType<ErrorMessages>,
      default: () => ({}),
    },
    errors: {
      type: Array as PropType<string[]>,
      default: () => [],
    },
    assistiveText: {
      type: String,
      default: undefined,
    },
    placeholder: {
      type: String,
      default: undefined,
    },
    modelValue: {
      type: String,
      default: undefined,
    },
  }
});
</script>

<style>

</style>