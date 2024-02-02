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
    <div class="fd-input-field__label mb-1">
      <slot name="label">
        {{ label }}
      </slot>
    </div>
    <div
      class="fd-input-field__input-field mb-1"
      :class="{
        'fd-input-field__input-field--disabled': disabled,
        'fd-input-field__input-field--error': error,
        'fd-input-field__input-field--focused': hasFocus,
        'fd-input-field__input-field--focused-error': hasFocus && error,
        'fd-input-field__input-field--readonly': readonly,
        'fd-input-field__input-field--small': small,
      }"
    >
      <slot name="prepend-icon">
        <fd-icon
          v-if="prependIcon"
          class="fd-input-field__prepend-icon"
          :icon="prependIcon"
          :size="getIconSize(small ? 'sm' : 'md')"
        />
      </slot>
      <input
        class="fd-input-field__input font-sm font-regular"
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
          :size="getIconSize(small ? 'sm' : 'md')"
        />
      </slot>
    </div>
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
    <div class="fd-input-field__assistive-text">
      <slot name="assistive-text">
        {{ assistiveText }}
      </slot>
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
    /**
     * TODO: add optional descibed by
     */
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
    /**
     * TODO: add id for associating parts of component with input - required?
     */
    label: {
      type: String,
      default: undefined,
    },
    /**
     * TODO: add optional labelled by
     */
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
    border: $form-field-border;
    border-color: rgba(var(--fora_form-field_border-color));
    border-radius: 8px;
    line-height: 1.25rem;
    padding: 0.625rem;
    transition: border .35s ease, box-shadow .35s ease;

    &--focused {
      @include focus-primary-styles;
      border-color: rgba(var(--fora_form-field_border-color--focus));
    }

    &:hover {
      border-color: rgba(var(--fora_form-field_border-color--hover));
    }

    &--small {
      padding-bottom: 0.25rem;
      padding-top: 0.25rem;
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
      
    }
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

  &__assistive-text {
    color: rgba(var(--fora_form-field_assistive-text_color));
    font-size: $form-field_auxillary-text_size;
    font-weight: $form-field_auxillary-text_weight;
  }

  &__error-text {
    color: rgba(var(--fora_form-field_error-text_color));
    font-size: $form-field_error-text_size;
    font-weight: $form-field_error-text_weight;
  }

  &__error-icon {
    margin-right: 0.5rem;
  }
}
</style>
