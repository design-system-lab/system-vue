<script lang="ts" setup>
import { CheckIcon, MinusIcon } from '@heroicons/vue/20/solid'
import FdIcon from '../Icon/FdIcon.vue';
import type { CheckboxBaseProps } from '../../types';

/**
 * Checkbox Base
 * This is the base component for the checkbox. It is used by the FdCheckbox component and other places where a checkbox is needed.
 * 
 * @param {boolean} disabled - Whether the checkbox is disabled
 * @param {string[]} errors - An array of error keys for active errors
 * @param {string} id - The HTML id of the checkbox
 * @param {boolean} indeterminate - Whether the checkbox is in an indeterminate state
 * @param {Object} inputAttrs - Additional attributes to apply to the input element
 * @param {boolean} modelValue - The checked value of the checkbox
 * @param {boolean} readonly - Whether the checkbox is readonly
 * @param {boolean} small - Whether the checkbox is small
 * @param {string} value - The HTML value of the checkbox
 */

const props = withDefaults(defineProps<CheckboxBaseProps>(), {
  disabled: false,
  errors: () => [],
  indeterminate: false,
  inputAttrs: () => ({}),
  readonly: false,
  small: false,
});

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void;
  (e: 'blur', event: FocusEvent): void;
  (e: 'focus', event: FocusEvent): void;
}>();
  
function onChange(event: Event) {
  if (props.disabled || props.readonly) return;

  emit('update:modelValue', (event.target as HTMLInputElement).checked);
}
</script>

<template>
  <div
    class="fd-checkbox-base"
    :class="{
      'fd-checkbox-base--disabled': disabled,
      'fd-checkbox-base--error': errors.length,
      'fd-checkbox-base--indeterminate': indeterminate,
      'fd-checkbox-base--readonly': readonly,
      'fd-checkbox-base--selected': modelValue,
      'fd-checkbox-base--small': small,
    }"
  >
    <div
      v-show="modelValue"
      class="fd-checkbox-base__check"
      :class="{
        'fd-checkbox-base__check--small': small,
      }"
    >
      <fd-icon
        :icon="CheckIcon"
        :size="small ? 16 : 20"
      />
    </div>
    <div
      v-show="indeterminate && !modelValue"
      class="fd-checkbox-base__indeterminate"
    >
      <fd-icon
        :icon="MinusIcon"
        :size="small ? 16 : 20"
      />
    </div>
    <input
      :id="id"
      class="fd-checkbox-base__input"
      :class="{
        'fd-checkbox-base__input--disabled': disabled,
        'fd-checkbox-base__input--error': errors.length,
        'fd-checkbox-base__input--readonly': readonly,
        'fd-checkbox-base__input--selected': modelValue,
        'fd-checkbox-base__input--small': small,
      }"
      v-bind="inputAttrs"
      :checked="modelValue"
      :disabled="disabled"
      :indeterminate="indeterminate"
      :readonly="readonly"
      type="checkbox"
      :value="value"
      @blur="$emit('blur', $event)"
      @change="onChange"
      @focus="$emit('focus', $event)"
    >
  </div>
</template>

<style lang="scss" scoped>
@import "@/styles/required";

.fd-checkbox-base {
  align-items: center;
  background-color: rgb(var(--fora_checkbox-base_bg));
  border: $checkbox-base_border rgb(var(--fora_checkbox-base_border-color));
  border-radius: $checkbox-base_border-radius;
  box-shadow: $checkbox-base_box-shadow transparent;
  cursor: pointer;
  display: inline-flex;
  flex: 0 0 auto;
  height: $checkbox-base_height;
  justify-content: center;
  position: relative;
  transition: $transition-timing border-color, $transition-timing box-shadow, $transition-timing background-color;
  width: $checkbox-base_width;

  &:hover:not(.fd-checkbox-base--readonly) {
    border-color:rgb(var(--fora_checkbox-base_border-color--hover));
  }

  &--indeterminate {
    background-color: rgb(var(--fora_checkbox-base_bg--indeterminate));
    border-color: rgb(var(--fora_checkbox-base_border-color--indeterminate));
    color: rgb(var(--fora_checkbox-base_color--indeterminate));

    &:hover:not(.fd-checkbox-base--readonly) {
      box-shadow: $checkbox-base_box-shadow rgb(var(--fora_checkbox-base_box-shadow--hover--indeterminate));
    }
  }

  &--selected {
    background-color: rgb(var(--fora_checkbox-base_bg--selected));
    border-color: rgb(var(--fora_checkbox-base_border-color--selected));
    color: rgb(var(--fora_checkbox-base_color--selected));

    &:hover:not(.fd-checkbox-base--readonly) {
      box-shadow: $checkbox-base_box-shadow rgb(var(--fora_checkbox-base_box-shadow--hover--selected));
    }
  }

  &--readonly {
    background-color: rgb(var(--fora_checkbox-base_readonly_bg));
    border-color: rgb(var(--fora_checkbox-base_readonly_border-color));
  }

  &--readonly#{&}--indeterminate {
    background-color: rgb(var(--fora_checkbox-base_readonly_bg--indeterminate));
    border-color: rgb(var(--fora_checkbox-base_readonly_border-color--indeterminate));
  }

  &--readonly#{&}--selected {
    background-color: rgb(var(--fora_checkbox-base_readonly_bg--selected));
    border-color: rgb(var(--fora_checkbox-base_readonly_border-color--selected));
  }

  &--disabled {
    background-color: rgb(var(--fora_checkbox-base_disabled_bg));
    border-color: rgb(var(--fora_checkbox-base_disabled_border-color));
  }

  &--disabled#{&}--indeterminate {
    background-color: rgb(var(--fora_checkbox-base_disabled_bg--indeterminate));
    border-color: rgb(var(--fora_checkbox-base_disabled_border-color--indeterminate));
  }

  &--disabled#{&}--selected {
    background-color: rgb(var(--fora_checkbox-base_disabled_bg--selected));
    border-color: rgb(var(--fora_checkbox-base_disabled_border-color--selected));
  }

  &--error,
  &--error:hover {
    border-color: rgb(var(--fora_checkbox-base_error_border-color));
  }

  &--error#{&}--indeterminate {
    background-color: rgb(var(--fora_checkbox-base_error_border-color--indeterminate));

    &:hover {
      box-shadow: 0 0 0 2px rgb(var(--fora_checkbox-base_error_box-shadow-color--hover--indeterminate));
    }
  }

  &--error#{&}--selected {
    background-color: rgb(var(--fora_checkbox-base_error_border-color--selected));

    &:hover {
      box-shadow: 0 0 0 2px rgb(var(--fora_checkbox-base_error_box-shadow-color--hover--selected));
    }
  }

  &__check {
    flex: 0 0 auto;
    height: 1.25rem;
    width: 1.25rem;

    &:deep(.fd-icon) {
      display: block;
    }

    &--small {
      height: 1rem;
      width: 1rem;
    }
  }

  &__input {
    @include visually-hidden;
  }

  &--small {
    height: $checkbox-base_sm_height;
    width: $checkbox-base_sm_width;
  }
}

</style>