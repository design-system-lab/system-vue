<template>

</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { Icon } from '../../types/common';

interface ErrorMessages {
  [key: string]: string; 
}

export default defineComponent({
  name: 'FdInputField',
  props: {
    appendIcon: {
      type: Function as PropType<Icon>,
      default: undefined,
    },
    assistiveText: {
      type: String,
      default: undefined,
    },
    errors: {
      type: Array as PropType<string[]>,
      default: () => [],
    },
    errorMessages: {
      type: Object as PropType<ErrorMessages>,
      default: () => ({}),
    },
    label: {
      type: String,
      default: undefined,
    },
    modelValue: {
      type: String,
      default: undefined,
    },
    placeholder: {
      type: String,
      default: undefined,
    },
    prependIcon: {
      type: Function as PropType<Icon>,
      default: undefined,
    },
  }
});
</script>

<style>

</style>