<template>
  <label
    class="fd-radio"
    :class="{
      'fd-radio--disabled': disabled,
      'fd-radio--error': errors.length,
      'fd-radio--focused': focused,
      'fd-radio--readonly': readonly,
      'fd-radio--selected': modelValue === value,
    }"
  >
    <fd-radio-base
      v-bind="{ disabled, errors, inputAttrs, modelValue, name, readonly, value }"
      @update:modelValue="handleChange"
    />
    <slot name="label">{{ label }}</slot>
  </label>
</template>

<script lang="ts">
import { defineComponent, readonly, shallowRef } from 'vue';
import FdRadioBase from './FdRadioBase.vue';

export default defineComponent({
  name: 'FdRadio',
  components: { FdRadioBase },
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
    errors: {
      type: Array,
      default: () => [],
    },
    inputAttrs: {
      type: Object,
      default: () => ({}),
    },
    label: {
      type: String,
      default: null,
    },
    modelValue: {
      type: String,
      default: undefined,
    },
    name: {
      type: String,
      default: null,
    },
    readonly: {
      type: Boolean,
      default: false,
    },
    value: {
      type: String,
      default: undefined,
    },
  },
  emits: ['update:modelValue'],
  setup(_, { emit }) {
    const focused = shallowRef(false);

    const handleChange = (value: string) => {
      emit('update:modelValue', value);
    };
    
    return {
      focused,
      handleChange,
    };
  },
});
</script>
