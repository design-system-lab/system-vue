<template>
  <label
    class="fd-radio"
    :class="{
      'fd-radio--disabled': disabled || groupDisabled,
      'fd-radio--error': errors.length || groupErrors.length,
      'fd-radio--focused': hasFocus,
      'fd-radio--focused-error': hasFocus && (errors.length || groupErrors.length),
      'fd-radio--readonly': readonly,
      'fd-radio--selected': (modelValue || groupModelValue) === value,
    }"
  >
    <fd-radio-base
      v-bind="{
        disabled: disabled || groupDisabled,
        errors: errors.length ? errors : groupErrors,
        inputAttrs,
        modelValue: modelValue || groupModelValue,
        name: name || groupName,
        readonly,
        value
      }"
      @blur="hasFocus = false"
      @update:modelValue="handleChange"
      @focus="handleFocus"
    />
    <slot>{{ label }}</slot>
  </label>
</template>

<script lang="ts">
import { defineComponent, inject, shallowRef } from 'vue';
import FdRadioBase from './FdRadioBase.vue';

/**
 * FdRadio
 * 
 * @param {Boolean} disabled - Whether the radio is disabled
 * @param {Array} errors - Array of keys for error messages
 * @param {Object} inputAttrs - Additional attributes applied to the radio input
 * @param {String} label - The label for the radio
 * @param {String} modelValue - The model value for the radio
 * @param {String} name - The name for the radio, used to connect radio inputs
 * @param {Boolean} readonly - Whether the radio is readonly
 * @param {String} value - The value for the radio
 */
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
    const hasFocus = shallowRef(false);
    const groupDisabled = inject('groupDisabled', false);
    const groupErrors = inject('groupErrors', []);
    const groupHandleModelValue = inject<(val: string) => void>('groupHandleModelValue');
    const groupModelValue = inject('groupModelValue', '');
    const groupName = inject('groupName', '');

    const handleChange = (value: string) => {
      emit('update:modelValue', value);
      if (groupHandleModelValue) groupHandleModelValue(value);
    };

    const handleFocus = (e: FocusEvent) => {
      if ((e.target as HTMLElement).matches(':focus-visible')) {
        hasFocus.value = true;
      }
    };
    
    return {
      groupDisabled,
      groupErrors,
      handleChange,
      handleFocus,
      hasFocus,
      groupModelValue,
      groupName,
    };
  },
});
</script>

<style lang="scss" scoped>
@import '../../styles/required';

.fd-radio {
  align-items: center;
  cursor: pointer;
  display: flex;
  font-size: $font-sm;
  gap: $radio_gap;
  padding: 0.25rem;
  border-radius: $radio_border-radius;
  transition: background-color $transition-timing;

  &:hover {
    background-color: rgba(var(--fora_radio_bg--hover));
  }

  &--selected {
    &:hover {
      &:deep(.fd-radio-base__indicator) {
        box-shadow: 0 0 0 2px rgba(var(--fora_radio-base_box-shadow-color--hover--selected));
      }
    }
  }

  &--readonly {
    color: rgba(var(--fora_radio_readonly_color));

    &:hover {
      background-color: transparent;
    }
  }

  &--error {
    color: rgba(var(--fora_radio_error_color));

    &:hover {
      background-color: rgba(var(--fora_radio_error_bg--hover));
    }
  }

  &--error#{&}--selected {
    &:hover {
      &:deep(.fd-radio-base__indicator) {
        box-shadow: 0 0 0 2px rgba(var(--fora_radio-base_error_box-shadow-color--hover--selected));
      }
    }
  }

  &--disabled {
    color: rgba(var(--fora_radio_disabled_color));
    cursor: not-allowed;

    &:hover {
      background-color: transparent;
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
