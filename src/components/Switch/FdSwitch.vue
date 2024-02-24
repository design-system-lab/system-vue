<template>
  <div class="fd-switch">
    <div
      v-if="!hideLabel && showValue"
      class="fd-switch__label mb-1"
      aria-hidden="true"
    >
      <slot>{{ label }}</slot>
    </div>
    <div class="fd-switch__field">
      <input
        :id="id"
        class="fd-switch__input"
        type="checkbox"
        @input="$emit('update:modelValue', !modelValue)"
      >
      <label
        class="fd-switch__controller"
        :for="id"
      >
        <div
          :class="{
            'fd-switch__label--visually-hidden': hideLabel || showValue,
            'fd-switch__label--reverse': reverseLabel
          }"
          class="fd-switch__label"
        >
          <slot>{{ label }}</slot>
        </div>
        <div
          class="fd-switch__control"
          :class="{
            'fd-switch__control--active': modelValue,
          }"
        >
          <div
            class="fd-switch__knob"
            :class="{ 'fd-switch__knob--active': modelValue }"
          />
        </div>
        <span
          v-if="showValue"
          class="fd-switch__value"
          aria-hidden="true"
        >
          {{ getValue }}
        </span>
      </label>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, inject } from 'vue';
import { TranslationSupport } from '../../../src/utils/i18n';

export default defineComponent({
  name: 'FdSwitch',
  props: {
    hideLabel: {
      type: Boolean,
      default: false,
    },
    label: {
      type: String,
      default: undefined,
    },
    id: {
      type: String,
      required: true,
    },
    modelValue: {
      type: Boolean,
      default: false,
    },
    reverseLabel: {
      type: Boolean,
      default: false,
    },
    showValue: {
      type: Boolean,
      default: false,
    },
    valueFalse: {
      type: String,
      default: undefined,
    },
    valueTrue: {
      type: String,
      default: undefined,
    },
  },
  setup(props) {
    const { t } = inject('i18n') as TranslationSupport;

    const getValue = computed(() => {
      return (
        props.modelValue
        ? props.valueTrue || t(`switch:${props.modelValue}`)
        : props.valueFalse || t(`switch:${props.modelValue}`)
      );
    });

    return { getValue, t };
  }
});
</script>

<style lang="scss">
@import "@/styles/required";

.fd-switch {
  display: inline-block;
  margin: 0 -0.375rem;

  &__input {
    @include visually-hidden;

    &:focus-visible + .fd-switch__controller > .fd-switch__control {
      @include focus-primary-styles;
    }
  }

  &__controller {
    align-items: center;
    cursor: pointer;
    display: flex;
  }

  &__control {
    background-color: rgba(var(--fora_switch_inactive_bg));
    border-radius: calc($switch_control_height / 2);
    flex: 0 0 auto;
    height: $switch_control_height;
    margin: 0 0.375rem;
    position: relative;
    transition: $switch_transition;
    width: $switch_control_width;

    &:hover {
      background-color: rgba(var(--fora_switch_inactive_bg--hover));
    }

    &:active {
      background-color: rgba(var(--fora_switch_inactive_bg--pressed));
    }

    &--active {
      background-color: rgba(var(--fora_switch_active_bg));

      &:hover {
        background-color: rgba(var(--fora_switch_active_bg--hover));
      }

      &:active {
        background-color: rgba(var(--fora_switch_active_bg--pressed));
      }
    }
  }

  &__knob {
    background-color: rgba(var(--fora_switch_knob_bg));
    border-radius: calc($switch_knob_height / 2);
    height: $switch_knob_height;
    left: calc(($switch_control_height - $switch_knob_height) / 2);
    position: absolute;
    top: calc(($switch_control_height - $switch_knob_height) / 2);
    transition: $switch_transition;
    width: $switch_knob_width;

    &--active {
      left: calc(100% - $switch_knob_width - 0.125rem);
    }
  }

  &__label {
    font-size: $switch_label_size;
    font-weight: $switch_label_weight;
    margin: 0 0.375rem;

    &--visually-hidden {
      @include visually-hidden;
    }

    &--reverse {
      order: 2;
    }
  }

  &__value {
    font-size: $switch_value_size;
    font-weight: $switch_value_weight;
    margin: 0 0.375rem;
  }
}
</style>