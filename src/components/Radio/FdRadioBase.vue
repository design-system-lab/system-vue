<template>
  <div class="fd-radio-base">
    <input
      type="radio"
      v-bind="inputAttrs"
      :checked="modelValue === value"
      :disabled="disabled"
      :name="name"
      :value="value"
      @blur="$emit('blur')"
      @change="$emit('update:modelValue', value)"
      @focus="$emit('focus')"
    />
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
        'fd-radio-base__indicator-inner--focused': focused,
        'fd-radio-base__indicator-inner--error': errors.length,
        'fd-radio-base__indicator-inner--readonly': readonly,
        'fd-radio-base__indicator-inner--selected': modelValue === value,
      }"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, readonly, shallowRef } from 'vue';

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
  setup(_, { emit }) {
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

  input {
    @include visually-hidden;
  }

  .fd-radio-base__indicator {
    background-color: rgba(var(--fora_white), 1);
    box-shadow: 0 0 0 2px transparent;
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 50%;
    border: 1px solid rgba(var(--fora_neutral-7), 1);
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 0.75rem;
    transition: $transition-timing border-color, $transition-timing box-shadow;

    &--focused {
      border-color: #000;
    }

    &--readonly {
      border-color: rgba(var(--fora_neutral-7), 1);
      background-color: rgba(var(--fora_neutral-3), 1);
    }

    .fd-radio-base__indicator-inner {
      width: 1rem;
      height: 1rem;
      border-radius: 50%;
      background-color: rgba(var(--fora_primary-6), 1);
      opacity: 0;
      transition: $transition-timing opacity;

      &--error {
        background-color: rgba(var(--fora_danger-7), 1);
      }
    }

    &--selected {
      border: 2px solid rgba(var(--fora_primary-6), 1);

      .fd-radio-base__indicator-inner {
        opacity: 1;
      }
    }

    &--error {
      border-color: rgba(var(--fora_danger-7), 1);
    }

    &--disabled {
      border-color: rgba(var(--fora_neutral-4), 1);
      background-color: rgba(var(--fora_neutral-3), 1);
    }
  }
}

</style>
