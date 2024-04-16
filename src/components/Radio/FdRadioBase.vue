<template>
  <div class="fd-radio-base">
    <input
      type="radio"
      v-bind="inputAttrs"
      :name="name"
      :value="value"
      :checked="modelValue === value"
      :disabled="disabled"
      @change="$emit('update:modelValue', value)"
    />
    <div
      class="fd-radio-base__indicator"
      :class="{
        'fd-radio-base__indicator--disabled': disabled,
        'fd-radio-base__indicator--focused': focused,
        'fd-radio-base__indicator--error': errors.length,
        'fd-radio-base__indicator--readonly': readonly,
        'fd-radio-base__indicator--selected': modelValue === value,
      }"
    >
      <div
        class="fd-radio-base__indicator-inner"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, readonly, shallowRef } from 'vue';

export default defineComponent({
  name: 'FdRadioBase',
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
    modelValue: {
      type: [String, Number, Boolean],
      default: null,
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
      type: [String, Number, Boolean],
      default: null,
    },
  },
  emits: ['update:modelValue'],
  setup(_, { emit }) {
    const focused = shallowRef(false);

    return {
      focused,
    };
  },
});
</script>
