<template>
  <div
    class="fd-input-field"
    :class="{
      'fd-input-field--disabled': disabled,
      'fd-input-field--error': (errors.length || $slots['error-text']),
      'fd-input-fiel--focused': hasFocus,
      'fd-input-field--readonly': readonly,
      'fd-input-field--small': small,
    }"
  >
    <div
      v-if="label || $slots['label']"
      :id="`${id}__label`"
      class="fd-input-field__label"
    >
      <slot name="label">
        {{ label }}
      </slot>
    </div>
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
        <slot name="prepend-icon">
          <fd-icon
            v-if="prependIcon"
            class="fd-input-field__prepend-icon"
            :icon="prependIcon"
            :size="getIconSize('sm')"
          />
        </slot>
        <input
          class="fd-input-field__input font-sm font-regular"
          v-bind="inputAttrs"
          :aria-describedby="((errors.length || $slots['error-text']) && `${id}__error-text`) || describedby || ((assistiveText || $slots['assistive-text']) && `${id}__assistive-text`)"
          :aria-labelledby="labelledby || ((label || $slots['label']) && `${id}__label`)"
          :disabled="disabled"
          :placeholder="placeholder"
          :readonly="readonly"
          :type="type"
          :value="modelValue"
          @input="handleInput"
          @blur="hasFocus = false"
          @focus="hasFocus = true"
        >
        <slot name="append-icon">
          <fd-icon
            v-if="appendIcon"
            class="fd-input-field__append-icon"
            :icon="appendIcon"
            :size="getIconSize('sm')"
          />
        </slot>
      </div>
    </div>
    <fd-input-post-text
      :assistive-text="assistiveText"
      :error-messages="errorMessages"
      :errors="errors"
      :id="id"
      :persistent-assistive-text="persistentAssistiveText"
    >
      <template
        v-if="$slots['error-text']"
        #error-text
      >
        <slot name="error-text" />
      </template>
      <template
        v-if="$slots['assistive-text']"
        #assistive-text
      >
        <slot name="assistive-text" />
      </template>
    </fd-input-post-text>
  </div>
</template>

<script lang="ts">
import { defineComponent, shallowRef, PropType } from 'vue';
import FdIcon from '../Icon';
import FdInputPostText from './FdInputPostText.vue';
import { getIconSize } from '../../utils/icons';
import { Icon,  ErrorMessages } from '../../types/common';

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
export default defineComponent({
  name: 'FdInputField',
  components: {
    FdIcon,
    FdInputPostText,
  },
  props: {
    appendIcon: {
      type: Function as PropType<Icon>,
      default: undefined,
    },
    assistiveText: {
      type: String,
      default: undefined,
    },
    describedby: {
      type: String,
      default: undefined,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    errors: {
      type: Array as PropType<string[]>,
      default: () => [],
    },
    errorMessages: {
      type: Object as PropType<ErrorMessages>,
      default: () => ({}),
    },
    id: {
      type: String,
      required: true,
    },
    inputAttrs: {
      type: Object as PropType<{[key: string]: string}>,
      default: () => ({}),
    },
    label: {
      type: String,
      default: undefined,
    },
    labelledby: {
      type: String,
      default: undefined,
    },
    modelValue: {
      type: String,
      default: undefined,
    },
    persistentAssistiveText: {
      type: Boolean,
      default: false,
    },  
    placeholder: {
      type: String,
      default: undefined,
    },
    prependIcon: {
      type: Function as PropType<Icon>,
      default: undefined,
    },
    readonly: {
      type: Boolean,
      default: false,
    },
    small: {
      type: Boolean,
      default: false,
    },
    type: {
      type: String,
      default: 'text',
    },
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const hasFocus = shallowRef(false);

    /**
     * Handles the input event and emits the input value
     * 
     * @prop {object} e The HTML InputEvent from the input
     */
    function handleInput(e: Event) {
      emit('update:modelValue', (e.target as HTMLInputElement)?.value);
    }

    return {
      getIconSize,
      handleInput,
      hasFocus,
    };
  }
});
</script>

<style lang="scss" scoped>
@import "@/styles/required";

.fd-input-field {
  width: 100%;

  &__label {
    font-size: $form-field_label_size;
    font-weight: $form-field_label_weight;
    margin-bottom: $form-field_vertical_spacer;
  }

  &__prepend-icon {
    color: rgba(var(--fora_form-field_icon_color));
    margin-right: 0.625rem;
  }

  &__append-icon {
    color: rgba(var(--fora_form-field_icon_color));
    margin-left: 0.625rem;
  }

  &__input-field {
    background-color: rgba(var(--fora_form-field_input_bg));
    border: $form-field-border;
    border-color: rgba(var(--fora_form-field_border-color));
    border-radius: $form-field_border-radius;
    line-height: 1.25rem;
    padding: calc($form-field_padding - $form-field_border_size);
    position: relative;
    transition: border .35s ease, box-shadow .35s ease;
    z-index: 1;

    &--focused {
      @include focus-primary-styles;
      border-color: rgba(var(--fora_form-field_border-color--focus));
    }

    &:hover {
      border-color: rgba(var(--fora_form-field_border-color--hover));
    }

    &--small {
      padding-bottom: calc($form-field_sm_padding - $form-field_border_size);
      padding-top: calc($form-field_sm_padding - $form-field_border_size);
    }

    &--disabled:hover,
    &--readonly:hover {
      border-color: rgba(var(--fora_form-field_border-color));
    }

    &--readonly {
      background-color: rgba(var(--fora_form-field_readonly_bg));
    }

    &--error {
      border-color: rgba(var(--fora_form-field_error_border-color));

      &:hover {
        border-color: rgba(var(--fora_form-field_error_border-color--hover))
      }
    }

    &--focused-error {
      @include focus-danger-styles;
      border-color: rgba(var(--fora_form-field_error_border-color--focus));
    }

    &--disabled {
      background-color: rgba(var(--fora_form-field_disabled_bg));
      border-color: rgba(var(--fora_form-field_disabled_border-color));
      color: rgba(var(--fora_form-field_disabled_color));
    }
  }

  &__input-container {
    display: flex;
  }

  &__input {
    background: none;
    border: 0;
    margin: 0;
    padding: 0;
    width: 100%;

    &:focus-visible {
      outline: none;
    }
  }

  &__post-text {
    position: relative;
  }

  &__assistive-text {
    color: rgba(var(--fora_form-field_assistive-text_color));
    font-size: $form-field_auxillary-text_size;
    font-weight: $form-field_auxillary-text_weight;
    line-height: 1.25rem;
    padding-top: $form-field_vertical_spacer;
  }

  &__errors-text {
    color: rgba(var(--fora_form-field_error-text_color));
    display: flex;
    font-size: $form-field_error-text_size;
    font-weight: $form-field_error-text_weight;
    line-height: 1.25rem;
    padding-top: $form-field_vertical_spacer;
    position: relative;
  }

  &__error-icon {
    flex: 0 0 auto;
    margin-right: 0.5rem;
  }

  &__error {
    display: block;
  }
}
</style>
