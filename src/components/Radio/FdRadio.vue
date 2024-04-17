<template>
  <label
    class="fd-radio"
    :class="{
      'fd-radio--disabled': disabled,
      'fd-radio--error': errors.length,
      'fd-radio--focused': focused,
      'fd-radio--focused-error': focused && errors.length,
      'fd-radio--readonly': readonly,
      'fd-radio--selected': (modelValue || groupModelValue) === value,
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
      @update:modelValue="handleChange"
      @focus="focused = true"
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
  font-size: $font-sm;

  &:hover {
    background-color: rgba(var(--fora_primary-6), 0.1);
  }

  &--selected {
    &:hover {
      &:deep(.fd-radio-base__indicator) {
        box-shadow: 0 0 0 2px rgba(var(--fora_primary-6), 0.35);
      }
    }
  }

  &--readonly {
    color: rgba(var(--fora_neutral-11), 1);

    &:hover {
      background-color: transparent;
    }
  }

  &--disabled {
    color: rgba(var(--fora_neutral-5), 1);
    cursor: not-allowed;

    &:hover {
      background-color: transparent;
    }
  }

  &--error {
    color: rgba(var(--fora_danger-7), 1);

    &:hover {
      background-color: rgba(var(--fora_danger-6), 0.1);
    }
  }

  &--focused {
    @include focus-primary-styles;
  }

  &--focused-error {
    @include focus-danger-styles;
  }
}

</style>
