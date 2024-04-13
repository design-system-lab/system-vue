<template>
  <div
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
    :inert="disabled"
  >
    <label
      class="fd-checkbox__label"
      :class="{
        'fd-checkbox__label--disabled': disabled,
        'fd-checkbox__label--error': (errors.length || $slots['error-text']),
        'fd-checkbox__label--focused': hasFocus,
        'fd-checkbox__label--focused-error': (errors.length && hasFocus),
        'fd-checkbox__label--readonly': readonly,
        'fd-checkbox__label--small': small,
      }"
      :for="id"
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
        @focus="hasFocus = true"
        @update:model-value="onChange"
      />
      <slot>{{ label }}</slot>
    </label>
  </div>
</template>
<script lang="ts">
import { defineComponent, shallowRef, PropType } from 'vue';
import FdCheckboxBase from './FdCheckboxBase.vue';

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
export default defineComponent({
  name: 'FdCheckbox',
  components: { FdCheckboxBase },
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
    errors: {
      type: Array as PropType<string[]>,
      default: () => [],
    },
    id: {
      type: String,
      required: true,
    },
    indeterminate: {
      type: Boolean,
      default: false,
    },
    inputAttrs: {
      type: Object as PropType<{[key: string]: string}>,
      default: () => ({}),
    },
    label: {
      type: String,
      required: true,
    },
    modelValue: {
      type: Boolean,
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
    value: {
      type: String,
      required: true,
    },
  },
  setup(_, { emit }) {
    const hasFocus = shallowRef(false);

    const onChange = (event: boolean) => {
      emit('update:modelValue', event);
    };

    return {
      hasFocus,
      onChange,
    };
  },
});
</script>

<style lang="scss" scoped>
@import "@/styles/required";

.fd-checkbox {
  &--disabled {
    pointer-events: none;
  }

  &__label {
    align-items: center;
    border-radius: $checkbox_border-radius;
    cursor: pointer;
    display: flex;
    font-size: $checkbox_size;
    gap: $checkbox_gap;
    line-height: 1.25rem;
    padding: 0.25rem;
    transition: $transition-timing background-color;

    &:hover:not(#{&}--readonly) {
      background-color: rgba(var(--fora_checkbox_label_bg--hover));

      .fd-checkbox-base {
        border-color: rgba(var(--fora_checkbox-base_border-color--hover));

        &--selected {
          box-shadow: 0 0 0 2px rgba(var(--fora_checkbox-base_box-shadow-color--hover--selected));
        }

        &--indeterminate {
          box-shadow: 0 0 0 2px rgba(var(--fora_checkbox-base_box-shadow-color--hover--indeterminate));
        }

        &--error.fd-checkbox-base--selected {
          box-shadow: 0 0 0 2px rgba(var(--fora_checkbox-base_error_box-shadow-color--hover--selected));
        }

        &--error.fd-checkbox-base--indeterminate {
          box-shadow: 0 0 0 2px rgba(var(--fora_checkbox-base_error_box-shadow-color--hover--indeterminate));
        }
      }
    }

    &--focused {
      @include focus-primary-styles;
    }

    &--focused-error {
      @include focus-danger-styles;
    }

    &--error:hover {
      background-color: rgba(var(--fora_checkbox_label_error_bg--hover));

      .fd-checkbox-base {
        border-color: rgba(var(--fora_checkbox-base_error_border-color));
      }
    }
  }

  &--disabled {
    color: rgba(var(--fora_checkbox_disabled_color));
    cursor: not-allowed;
  }

  &--readonly {
    color: rgba(var(--fora_checkbox_readonly_color));
  }
}

</style>