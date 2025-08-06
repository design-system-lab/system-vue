<script lang="ts" setup>
import { shallowRef, PropType } from 'vue';
import FdCheckboxBase from './FdCheckboxBase.vue';
import type { CheckboxProps } from '../../types';

/**
 * Checkbox
 * 
 * @param {boolean} disabled - Whether the checkbox is disabled
 * @param {string[]} errors - An array of error keys for active errors
 * @param {string} id - The HTML id of the checkbox
 * @param {boolean} indeterminate - Whether the checkbox is in an indeterminate state
 * @param {Object} inputAttrs - Additional attributes to apply to the input element
 * @param {string} label - The label for the checkbox
 * @param {boolean} modelValue - The checked value of the checkbox
 * @param {boolean} readonly - Whether the checkbox is readonly
 * @param {boolean} small - Whether the checkbox is small
 * @param {string} value - The HTML value of the checkbox
 */

withDefaults(defineProps<CheckboxProps>(), {
  disabled: false,
  errors: () => [],
  indeterminate: false,
  inputAttrs: () => ({}),
  readonly: false,
  small: false,
});

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void;
}>();

const hasFocus = shallowRef(false);

function onChange(event: boolean) {
  emit('update:modelValue', event);
};

function handleFocus(e: FocusEvent) {
  if ((e.target as HTMLElement).matches(':focus-visible')) {
    hasFocus.value = true;
  }
};
</script>

<template>
  <label
    class="fd-checkbox"
    :class="{
      'fd-checkbox--disabled': disabled,
      'fd-checkbox--error': (errors.length || $slots['error-text']),
      'fd-checkbox--focused': hasFocus,
      'fd-checkbox--focused-error': (errors.length && hasFocus),
      'fd-checkbox--indeterminate': indeterminate,
      'fd-checkbox--readonly': readonly,
      'fd-checkbox--small': small,
    }"
    :for="id"
    :inert="disabled"
  >
    <fd-checkbox-base
      v-bind="{
        disabled,
        errors,
        id,
        indeterminate,
        inputAttrs,
        modelValue,
        readonly,
        small,
        value
      }"
      @blur="hasFocus = false"
      @focus="handleFocus"
      @update:model-value="onChange"
    />
    <span class="fd-checkbox__text">
      <slot>{{ label }}</slot>
    </span>
  </label>
</template>

<style lang="scss" scoped>
@import "@/styles/required";

.fd-checkbox {
  align-items: center;
  border-radius: $checkbox_border-radius;
  cursor: pointer;
  display: flex;
  font-size: $checkbox_size;
  gap: $checkbox_gap;
  padding: 0.25rem;
  transition: $transition-timing background-color;

  &:hover:not(#{&}--readonly) {
    background-color: rgb(var(--fora_checkbox_bg--hover));

    .fd-checkbox-base {
      border-color: rgb(var(--fora_checkbox-base_border-color--hover));

      &--selected {
        box-shadow: 0 0 0 2px rgb(var(--fora_checkbox-base_box-shadow-color--hover--selected));
      }

      &--indeterminate {
        box-shadow: 0 0 0 2px rgb(var(--fora_checkbox-base_box-shadow-color--hover--indeterminate));
      }

      &--error.fd-checkbox-base--selected {
        box-shadow: 0 0 0 2px rgb(var(--fora_checkbox-base_error_box-shadow-color--hover--selected));
      }

      &--error.fd-checkbox-base--indeterminate {
        box-shadow: 0 0 0 2px rgb(var(--fora_checkbox-base_error_box-shadow-color--hover--indeterminate));
      }
    }
  }

  &--focused {
    @include focus-primary-styles;
    transition: $transition-timing box-shadow;
  }

  &--focused-error {
    @include focus-danger-styles;
  }

  &--error {
    color: rgb(var(--fora_checkbox_error_color));

    &:hover:not(#{&}--readonly) {
      background-color: rgb(var(--fora_checkbox_error_bg--hover));

      .fd-checkbox-base {
        border-color: rgb(var(--fora_checkbox-base_error_border-color));
      }
    }
  }

  &--readonly {
    color: rgb(var(--fora_checkbox_readonly_color));
  }

  &--disabled {
    color: rgb(var(--fora_checkbox_disabled_color));
    cursor: not-allowed;
  }

  &__text {
    line-height: 1.25rem;
    padding: 0.125rem 0;
  }
}

</style>