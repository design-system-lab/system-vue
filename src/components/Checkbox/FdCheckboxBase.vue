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
    >
      <fd-icon :icon="CheckIcon" :size="small ? 16 : 20" />
    </div>
    <div
      v-show="!modelValue && indeterminate"
      class="fd-checkbox-base__indeterminate"
    >
      <fd-icon :icon="MinusIcon" :size="small ? 16 : 20" />
    </div>
    <input type="checkbox"
      class="fd-checkbox-base__input"
      :class="{
        'fd-checkbox-base__input--disabled': disabled,
        'fd-checkbox-base__input--error': errors.length,
        'fd-checkbox-base__input--readonly': readonly,
        'fd-checkbox-base__input--selected': modelValue,
        'fd-checkbox-base__input--small': small,
      }"
      :id="id"
      :checked="modelValue"
      :disabled="disabled"
      :indeterminate="indeterminate"
      :readonly="readonly"
      :value="value"
      @blur="$emit('blur', $event)"
      @change="onChange"
      @focus="$emit('focus', $event)"
    />
  </div>
</template>
<script lang="ts">
import { PropType, defineComponent } from 'vue';
import { CheckIcon, MinusIcon } from '@heroicons/vue/20/solid'
import FdIcon from '../Icon/FdIcon.vue';

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
export default defineComponent({
  name: 'FdCheckboxBase',
  components: { FdIcon },
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
      default: 'on',
    },
  },
  setup(props, { emit }) {
    function onChange(event: Event) {
      if (props.disabled || props.readonly) return;

      emit('update:modelValue', (event.target as HTMLInputElement).checked);
    };

    return { onChange, CheckIcon, MinusIcon };
  },
});
</script>

<style lang="scss" scoped>
@import "@/styles/required";

.fd-checkbox-base {
  align-items: center;
  background-color: rgba(var(--fora_checkbox-base_bg));
  border: $checkbox-base_border rgba(var(--fora_checkbox-base_border-color));
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
    border-color:rgba(var(--fora_checkbox-base_border-color--hover));
  }

  &--selected {
    background-color: rgba(var(--fora_checkbox-base_bg--selected));
    border-color: rgba(var(--fora_checkbox-base_border-color--selected));
    color: rgba(var(--fora_checkbox-base_color--selected));

    &:hover:not(.fd-checkbox-base--readonly) {
      box-shadow: $checkbox-base_box-shadow rgba(var(--fora_checkbox-base_box-shadow--hover--selected));
    }
  }

  &--indeterminate {
    background-color: rgba(var(--fora_checkbox-base_bg--indeterminate));
    border-color: rgba(var(--fora_checkbox-base_border-color--indeterminate));
    color: rgba(var(--fora_checkbox-base_color--indeterminate));

    &:hover:not(.fd-checkbox-base--readonly) {
      box-shadow: $checkbox-base_box-shadow rgba(var(--fora_checkbox-base_box-shadow--hover--indeterminate));
    }
  }

  &--readonly {
    background-color: rgba(var(--fora_checkbox-base_readonly_bg));
    border-color: rgba(var(--fora_checkbox-base_readonly_border-color));
  }

  &--readonly#{&}--selected {
    background-color: rgba(var(--fora_checkbox-base_readonly_bg--selected));
    border-color: rgba(var(--fora_checkbox-base_readonly_border-color--selected));
  }

  &--readonly#{&}--indeterminate {
    background-color: rgba(var(--fora_checkbox-base_readonly_bg--indeterminate));
    border-color: rgba(var(--fora_checkbox-base_readonly_border-color--indeterminate));
  }

  &--disabled {
    background-color: rgba(var(--fora_checkbox-base_disabled_bg));
    border-color: rgba(var(--fora_checkbox-base_disabled_border-color));
  }

  &--disabled#{&}--selected {
    background-color: rgba(var(--fora_checkbox-base_disabled_bg--selected));
    border-color: rgba(var(--fora_checkbox-base_disabled_border-color--selected));
  }

  &--disabled#{&}--indeterminate {
    background-color: rgba(var(--fora_checkbox-base_disabled_bg--indeterminate));
    border-color: rgba(var(--fora_checkbox-base_disabled_border-color--indeterminate));
  }

  &--error,
  &--error:hover {
    border-color: rgba(var(--fora_checkbox-base_error_border-color));
  }

  &--error#{&}--selected {
    background-color: rgba(var(--fora_checkbox-base_error_border-color--selected));

    &:hover {
      box-shadow: 0 0 0 2px rgba(var(--fora_checkbox-base_error_box-shadow-color--hover--selected));
    }
  }

  &--error#{&}--indeterminate {
    background-color: rgba(var(--fora_checkbox-base_error_border-color--indeterminate));

    &:hover {
      box-shadow: 0 0 0 2px rgba(var(--fora_checkbox-base_error_box-shadow-color--hover--indeterminate));
    }
  }

  &__check {
    flex: 0 0 auto;
    height: 1.25rem;
    width: 1.25rem;

    &:deep(.fd-icon) {
      display: block;
    }
  }

  &__input {
    cursor: pointer;
    height: 100%;
    position: absolute;
    opacity: 0;
    width: 100%;
  }
}

</style>