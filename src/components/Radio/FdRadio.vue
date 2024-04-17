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
      v-bind="{
        disabled,
        errors,
        inputAttrs,
        modelValue: modelValue || groupModelValue,
        name: name || groupName,
        readonly,
        value
      }"
      @blur="focused = false"
      @focus="focused = true"
      @update:modelValue="handleChange"
    />
    <slot>{{ label }}</slot>
  </label>
</template>

<script lang="ts">
import { defineComponent, inject, readonly, shallowRef } from 'vue';
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
      default: undefined,
    },
    readonly: {
      type: Boolean,
      default: false,
    },
    value: {
      type: String,
      required: true,
    },
  },
  emits: ['update:modelValue'],
  setup(_, { emit }) {
    const focused = shallowRef(false);
    const groupName = inject('groupName', '');
    const groupModelValue = inject('groupModelValue', '');
    const groupHandleModelValue = inject('groupHandleModelValue', (val: string): void => {});

    const handleChange = (value: string) => {
      emit('update:modelValue', value);
      groupHandleModelValue(value);
    };
    
    return {
      focused,
      groupName,
      groupModelValue,
      handleChange,
    };
  },
});
</script>

<style lang="scss" scoped>
@import '../../styles/required';

.fd-radio {
  cursor: pointer;
  display: flex;
  align-items: center;
  padding: 0.25rem;
  border-radius: $border-radius_md;
  transition: background-color $transition-timing;

  &--disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }

  &--error {
    // something
  }

  &--focused {
    @include focus-primary-styles;
  }

}

</style>
