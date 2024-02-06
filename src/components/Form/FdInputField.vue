<template>
  <div
    class="fd-input-field"
    :class="{
      'fd-input-field--disabled': disabled,
      'fd-input-field--error': error,
      'fd-input-fiel--focused': hasFocus,
      'fd-input-field--readonly': readonly,
      'fd-input-field--small': small,
    }"
  >
    <div
      v-if="label || $slots['label']"
      :id="`${id}_label`"
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
        'fd-input-field__input-field--error': error,
        'fd-input-field__input-field--focused': hasFocus,
        'fd-input-field__input-field--focused-error': hasFocus && error,
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
          :aria-describedby="describedBy || ((assistiveText || $slots['assistive-text']) && `${id}_assistive-text`)"
          :aria-labelledby="labelledBy || ((label || $slots['label']) && `${id}_label`)"
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
    <div class="fd-input-field__post-text">
      <transition-group :name="`slide-${persistentAssistiveText ? 'in-out' : 'down'}`">
        <div
          v-if="error && error in errorMessages"
          class="fd-input-field__error-text"
        >
          <fd-icon
            class="fd-input-field__error-icon"
            :icon="ExclamationTriangleIcon"
            :size="getIconSize('sm')"
          />
          <slot name="error-text">
            <span
              v-for="(errorMessage, index) in errorMessages"
              :key="index"
            >
              {{ errorMessage }}
            </span>
          </slot>
        </div>
        <div
          v-if="(assistiveText || $slots['assistive-text']) && (!error || persistentAssistiveText)"
          :id="`${id}_assistive-text`"
          class="fd-input-field__assistive-text"
        >
          <slot name="assistive-text">
            {{ assistiveText }}
          </slot>
        </div>
      </transition-group>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, shallowRef, PropType } from 'vue';
import { getIconSize } from '../../utils/icons';
import { Icon } from '../../types/common';
import FdIcon from '../Icon';
import { ExclamationTriangleIcon } from '@heroicons/vue/20/solid';

interface ErrorMessages {
  [key: string]: string; 
}

export default defineComponent({
  name: 'FdInputField',
  components: {
    FdIcon,
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
    describedBy: {
      type: String,
      default: undefined,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    error: {
      type: String,
      default: undefined,
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
    labelledBy: {
      type: String,
      default: undefined,
    },
    modelValue: {
      type: String,
      default: undefined,
    },
    /**
     * TODO: Make error replace hint unless this is true
     */
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
  setup(_, { emit }) {
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
      ExclamationTriangleIcon,
      getIconSize,
      handleInput,
      hasFocus
    };
  }
});
</script>

<style lang="scss" scoped>
@import "@/styles/required";

.fd-input-field {
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
    border-radius: 8px;
    line-height: 1.25rem;
    padding: calc(0.625rem - 1px);
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
      padding-bottom: calc(0.375rem - 1px);
      padding-top: calc(0.375rem - 1px);
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

  &__error-text {
    color: rgba(var(--fora_form-field_error-text_color));
    font-size: $form-field_error-text_size;
    font-weight: $form-field_error-text_weight;
    line-height: 1.25rem;
    padding-left: 1.75rem;
    padding-top: $form-field_vertical_spacer;
    position: relative;
  }

  &__error-icon {
    left: 0;
    margin-right: 0.5rem;
    position: absolute;
    top: $form-field_vertical_spacer;
  }
}
</style>
