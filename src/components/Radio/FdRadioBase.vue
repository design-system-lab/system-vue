<template>
  <div
    class="fd-radio-base"
    :class="{ 'fd-radio-base--disabled': disabled }"
  >
    <input
      class="fd-radio-base__input"
      type="radio"
      v-bind="inputAttrs"
      :checked="modelValue === value"
      :disabled="disabled"
      :name="name"
      :value="value"
      @blur="$emit('blur')"
      @change="$emit('update:modelValue', value)"
      @focus="$emit('focus')"
    >
    <div
      class="fd-radio-base__indicator"
      :class="{
        'fd-radio-base__indicator--disabled': disabled,
        'fd-radio-base__indicator--focused': focused,
        'fd-radio-base__indicator--error': errors.length,
        'fd-radio-base__indicator--readonly': readonly,
        'fd-radio-base__indicator--selected': modelValue === value,
      }"
    >
      <div
        class="fd-radio-base__indicator-inner"
        :class="{
          'fd-radio-base__indicator-inner--disabled': disabled,
          'fd-radio-base__indicator-inner--error': errors.length,
          'fd-radio-base__indicator-inner--readonly': readonly,
        }"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, shallowRef } from 'vue';

/**
 * FdRadioBase
 * Radio input base component
 * 
 * @param {Boolean} disabled - Whether the radio is disabled
 * @param {Array} errors - Array of keys for error messages
 * @param {Object} inputAttrs - Additional attributes applied to the radio input
 * @param {String} modelValue - The model value for the radio
 * @param {String} name - The name for the radio, used to connect radio inputs
 * @param {Boolean} readonly - Whether the radio is readonly
 * @param {String} value - The value for the radio
 */
export default defineComponent({
  name: 'FdRadioBase',
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
    modelValue: {
      type: String,
      default: undefined,
    },
    name: {
      type: String,
      required: true,
    },
    readonly: {
      type: Boolean,
      default: false,
    },
    value: {
      type: String,
      default: null,
    },
  },
  emits: ['update:modelValue', 'blur', 'focus'],
  setup() {
    const focused = shallowRef(false);

    return {
      focused,
    };
  },
});
</script>

<style lang="scss" scoped>
@import '../../styles/required';

.fd-radio-base {
  display: flex;
  align-items: center;
  cursor: pointer;
  position: relative;

  &--disabled {
    cursor: not-allowed;
  }

  &__input {
    @include visually-hidden;
  }

  &__indicator {
    align-items: center;
    background-color: rgba(var(--fora_radio-base_indicator_bg));
    border: 1px solid rgba(var(--fora_radio-base_indicator_border-color));
    border-radius: 50%;
    box-shadow: 0 0 0 2px transparent;
    display: flex;
    height: $radio-base_indicator_height;
    justify-content: center;
    transition: $transition-timing border-color, $transition-timing box-shadow;
    width: $radio-base_indicator_width;

    &--readonly {
      border-color: rgba(var(--fora_radio-base_readonly_border-color));
      background-color: rgba(var(--fora_radio-base_readonly_bg));
    }

    &-inner {
      border-radius: 50%;
      background-color: rgba(var(--fora_radio-base_indicator-inner_bg));
      height: $radio-base_indicator-inner_height;
      opacity: 0;
      transition: $transition-timing opacity;
      width: $radio-base_indicator-inner_width;

      &--readonly {
        background-color: rgba(var(--fora_radio-base_indicator-inner_readonly_bg));
      }

      &--error {
        background-color: rgba(var(--fora_radio-base_error_bg));
      }

      &--disabled {
        background-color: rgba(var(--fora_radio-base_disabled_bg));
      }
    }

    &--selected {
      border: 2px solid rgba(var(--fora_radio-base_indicator_border-color--selected));

      .fd-radio-base__indicator-inner {
        opacity: 1;
      }
    }

    &--selected#{&}--readonly {
      border-color: rgba(var(--fora_radio-base_indicator_readonly_border-color--selected));
    }

    &--error {
      border-color: rgba(var(--fora_radio-base_indicator_error_border-color));
    }

    &--disabled {
      border-color: rgba(var(--fora_radio-base_indicator_disabled_border-color));
      background-color: rgba(var(--fora_radio-base_indicator_disabled_bg));
      cursor: not-allowed;
    }

    // selected bg goes last because it applies to all
    &--selected {
      background-color: rgba(var(--fora_radio-base_indicator_bg));
    }
  }
}

</style>
