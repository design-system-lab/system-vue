<script lang="ts" setup>
import { shallowRef } from 'vue';
import FdIcon from '../Icon';
import FdInputPostText from './FdInputPostText.vue';
import { filterSlots, getIconSize } from '../../utils';
import type { InputFieldProps } from '../../types';

/**
 * Input Field
 * 
 * @param {Icon} appendIcon - An icon component to use within FdIcon, comes after the text within the input field
 * @param {string} assistiveText - Text that appears beneath the input field intended to give additional context
 * @param {string} describedby - Optional. When using descriptive text for the input outside of the component, supply this prop with the id of the descriptive text element
 * @param {boolean} disabled - Whether the component is disabled
 * @param {array} errors - The keys of the error messages for the errors that are in effect
 * @param {ErrorMessages} errorMessages - Key:value pairs for possible errors, where the value is the error message displayed
 * @param {string} id - Required id for the input, used to correlate the label, hint text, and error message
 * @param {object} inputAttrs - An object of key:value pairs for attributes to add to the html input element
 * @param {string} label - The label for the input field
 * @param {string} labelledby - Optional. When using a label outside of the component, supply this prop with the id of the label element
 * @param {string} modelValue - The value of the input
 * @param {boolean} persistentAssistiveText - Whether to show the assistive text while displaying errors
 * @param {string} placeholder - Placeholder text for the input
 * @param {Icon} prependIcon - An icon component to use within FdIcon, comes before the text within the input field
 * @param {boolean} readonly - Whether the field should be set to readonly mode
 * @param {boolean} small - Whether to render the field in small mode
 * @param {string} type - The HTML attribute type value to set on the input element, (e.g. 'text', 'number', etc.)
 */

withDefaults(defineProps<InputFieldProps>(), {
  disabled: false,
  errors: () => [],
  errorMessages: () => ({}),
  inputAttrs: () => ({}),
  persistentAssistiveText: false,
  readonly: false,
  small: false,
  type: 'text',
});

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
}>();

const hasFocus = shallowRef(false);

/**
 * Handles the input event and emits the input value
 * 
 * @prop {object} e The HTML InputEvent from the input
 */
function handleInput(e: Event) {
  emit('update:modelValue', (e.target as HTMLInputElement)?.value);
}
</script>

<template>
  <div
    class="fd-input-field"
    :class="{
      'fd-input-field--disabled': disabled,
      'fd-input-field--error': (errors.length || $slots['error-text']),
      'fd-input-field--focused': hasFocus,
      'fd-input-field--readonly': readonly,
      'fd-input-field--small': small,
    }"
  >
    <label
      v-if="label || $slots['label']"
      :id="`${id}__label`"
      class="fd-input-field__label"
      :for="`${id}__input`"
    >
      <slot name="label">
        {{ label }}
      </slot>
    </label>
    <div
      class="fd-input-field__input-field"
      :class="{
        'fd-input-field__input-field--disabled': disabled,
        'fd-input-field__input-field--error': (errors.length || $slots['error-text']),
        'fd-input-field__input-field--focused': hasFocus,
        'fd-input-field__input-field--focused-error': hasFocus && (errors.length || $slots['error-text']),
        'fd-input-field__input-field--readonly': readonly,
        'fd-input-field__input-field--small': small,
      }"
    >
      <div class="fd-input-field__input-container">
        <fd-icon
          v-if="prependIcon"
          class="fd-input-field__prepend-icon"
          :icon="prependIcon"
          :size="getIconSize('sm')"
        >
          <slot name="prepend-icon" />
        </fd-icon>
        <input
          :id="`${id}__input`"
          class="fd-input-field__input"
          v-bind="inputAttrs"
          :aria-describedby="((errors.length || $slots['error-text']) && `${id}__error-text`) || describedby || ((assistiveText || $slots['assistive-text']) && `${id}__assistive-text`)"
          :aria-labelledby="labelledby || ((label || $slots['label']) && `${id}__label`)"
          :disabled="disabled"
          :placeholder="placeholder"
          :readonly="readonly"
          :type="type"
          :value="modelValue"
          @blur="hasFocus = false"
          @focus="hasFocus = true"
          @input="handleInput"
        >
        <fd-icon
          v-if="appendIcon"
          class="fd-input-field__append-icon"
          :icon="appendIcon"
          :size="getIconSize('sm')"
        >
          <slot name="append-icon" />
        </fd-icon>
      </div>
    </div>
    <fd-input-post-text
      class="fd-input-field__post-text"
      :assistive-text="assistiveText"
      :error-messages="errorMessages"
      :errors="errors"
      :id="id"
      :persistent-assistive-text="persistentAssistiveText"
    >
      <template
        v-for="(_, name) in filterSlots($slots, ['error-text', 'assistive-text'])"
        #[name]="slotData"
      >
        <slot
          v-bind="slotData"
          :name="name"
        />
      </template>
    </fd-input-post-text>
  </div>
</template>

<style lang="scss" scoped>
@import "@/styles/required";

.fd-input-field {
  @include form-field-common;

  &__input {
    background: none;
    border: 0;
    font-size: $form-field_input_size;
    font-weight: $form-field_input_weight;
    line-height: $form-field_input_line-height;
    margin: 0;
    padding: 0;
    width: 100%;

    &:focus-visible {
      outline: none;
    }

    &:disabled {
      cursor: default;
    }
  }
}
</style>
