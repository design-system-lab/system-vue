<script lang="ts" setup>
import { shallowRef, watch } from 'vue';
import FdIcon from '../Icon';
import FdInputPostText from './FdInputPostText.vue';
import { filterSlots, getIconSize } from '../../utils';
import { TextareaProps } from '../../types';

/**
 * Input Field
 * 
 * @param {Icon} appendIcon - An icon component to use within FdIcon, comes after the text within the input field
 * @param {string} assistiveText - Text that appears beneath the input field intended to give additional context
 * @param {number} count - The maximum number of characters allowed in the input field
 * @param {string} describedby - Optional. When using descriptive text for the input outside of the component, supply this prop with the id of the descriptive text element
 * @param {boolean} disabled - Whether the component is disabled
 * @param {boolean} enforceCount - Whether to enforce the character count
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
 * @param {string} resize - The resize property of the textarea
 * @param {boolean} small - Whether to render the field in small mode
 */

const props = withDefaults(defineProps<TextareaProps>(), {
  disabled: false,
  enforceCount: true,
  errors: () => [],
  errorMessages: () => ({}),
  id: '',
  inputAttrs: () => ({}),
  persistentAssistiveText: false,
  readonly: false,
  resize: 'vertical',
  rows: 3,
  small: false,
});

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
}>();

const hasFocus = shallowRef(false);
const currentCount = shallowRef(props.modelValue?.length || 0);

/**
 * Handles the input event and emits the input value
 * 
 * @prop {object} e The HTML InputEvent from the input
 */
function handleInput(e: Event) {
  emit('update:modelValue', (e.target as HTMLInputElement)?.value);
}

watch(
  () => props.modelValue,
  (newVal) => {
    currentCount.value = newVal?.length || 0;
  }
);
</script>

<template>
  <div
    class="fd-textarea"
    :class="{
      'fd-textarea--disabled': disabled,
      'fd-textarea--error': (errors.length || $slots['error-text']),
      'fd-textarea--focused': hasFocus,
      'fd-textarea--readonly': readonly,
      'fd-textarea--small': small,
    }"
  >
    <label
      v-if="label || $slots['label']"
      :id="`${id}__label`"
      class="fd-textarea__label"
      :for="`${id}__input`"
    >
      <slot name="label">
        {{ label }}
      </slot>
    </label>
    <div
      class="fd-textarea__input-field"
      :class="{
        'fd-textarea__input-field--disabled': disabled,
        'fd-textarea__input-field--error': (errors.length || $slots['error-text']),
        'fd-textarea__input-field--focused': hasFocus,
        'fd-textarea__input-field--focused-error': hasFocus && (errors.length || $slots['error-text']),
        'fd-textarea__input-field--readonly': readonly,
        'fd-textarea__input-field--small': small,
      }"
    >
      <div class="fd-textarea__input-container">
        <fd-icon
          v-if="prependIcon"
          class="fd-textarea__prepend-icon"
          :icon="prependIcon"
          :size="getIconSize('sm')"
        >
          <slot name="prepend-icon" />
        </fd-icon>
        <textarea
          :id="`${id}__input`"
          class="fd-textarea__input"
          v-bind="inputAttrs"
          :aria-describedby="((errors.length || $slots['error-text']) && `${id}__error-text`) || describedby || ((assistiveText || $slots['assistive-text']) && `${id}__assistive-text`)"
          :aria-labelledby="labelledby || ((label || $slots['label']) && `${id}__label`)"
          :disabled="disabled"
          :maxlength="count && enforceCount ? count : undefined"
          :placeholder="placeholder"
          :readonly="readonly"
          :rows="rows"
          :style="{
            resize,
          }"
          :value="modelValue"
          @blur="hasFocus = false"
          @focus="hasFocus = true"
          @input="handleInput"
        />
        <fd-icon
          v-if="appendIcon"
          class="fd-textarea__append-icon"
          :icon="appendIcon"
          :size="getIconSize('sm')"
        >
          <slot name="append-icon" />
        </fd-icon>
      </div>
    </div>
    <div class="fd-textarea__bottom row">
      <div class="col">
        <fd-input-post-text
          class="fd-textarea__post-text"
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
      <div class="col-auto">
        <div
          v-if="count !== undefined"
          class="fd-textarea__count"
        >
          {{ currentCount }}/{{ count }}
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "@/styles/required";

.fd-textarea {
  @include form-field-common;

  &__input {
    background: none;
    border: 0;
    font-size: $form-field_input_size;
    font-weight: $form-field_input_weight;
    line-height: $form-field_input_line-height;
    margin: 0;
    padding: 0;
    resize: vertical;
    width: 100%;

    &:focus-visible {
      outline: none;
    }

    &:disabled {
      cursor: default;
    }
  }

  &__count {
    color: rgb(var(--fora_textarea_count_color));
    font-size: $textarea_count_size;
    font-weight: $textarea_count_weight;
    line-height: $textarea_count_line-height;
    padding-top: 0.25rem;
  }
}
</style>
