<template>
  <div class="fd-toggle">
    <div
      v-if="!hideLabel && showValue"
      class="fd-toggle__label mb-1"
      aria-hidden="true"
    >
      <slot>{{ label }}</slot>
    </div>
    <div class="fd-toggle__field">
      <input
        :id="id"
        class="fd-toggle__input"
        type="checkbox"
        @input="$emit('update:modelValue', !modelValue)"
      >
      <label
        class="fd-toggle__controller"
        :for="id"
      >
        <div
          :class="{
            'fd-toggle__label--visually-hidden': hideLabel || showValue,
            'fd-toggle__label--reverse': reverseLabel
          }"
          class="fd-toggle__label"
        >
          <slot>{{ label }}</slot>
        </div>
        <div
          class="fd-toggle__control"
          :class="{
            'fd-toggle__control--active': modelValue,
          }"
        >
          <div
            class="fd-toggle__knob"
            :class="{ 'fd-toggle__knob--active': modelValue }"
          />
        </div>
        <span
          v-if="showValue"
          class="fd-toggle__value"
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
import { TranslationSupport } from '../../utils';

/**
 * Toggle Switch
 * 
 * @param {boolean} hideLabel - Whether to hide the label of the toggle (only hides the label visually for accessibility)
 * @param {string} label - The label for the input
 * @param {string} id - The html id used for the input and associating the label to the input
 * @param {boolean} modelValue - The value of the input
 * @param {boolean} reverseLabel - Whether to show the toggle before the label
 * @param {boolean} showValue - Whether to show the current value of the input
 * @param {string} valueFalse - If showValue is false, this is the text to use for the off value, defaults to "Off"
 * @param {string} valueTrue - If showValue is true, this is the text to use for the on value, defaults to "On"
 */
export default defineComponent({
  name: 'FdToggle',
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
  emits: ['update:modelValue'],
  setup(props) {
    const { t } = inject('i18n') as TranslationSupport;

    /**
     * Gets the current text describing the current value of the input
     */
    const getValue = computed(() => {
      return (
        props.modelValue
        ? props.valueTrue || t(`toggle:${props.modelValue}`)
        : props.valueFalse || t(`toggle:${props.modelValue}`)
      );
    });

    return { getValue, t };
  }
});
</script>

<style lang="scss">
@import "@/styles/required";

.fd-toggle {
  display: inline-block;
  margin: 0 -0.375rem;

  &__input {
    @include visually-hidden;

    &:focus-visible + .fd-toggle__controller > .fd-toggle__control {
      @include focus-primary-styles;
    }
  }

  &__controller {
    align-items: center;
    cursor: pointer;
    display: flex;
  }

  &__control {
    background-color: rgba(var(--fora_toggle_inactive_bg));
    border-radius: calc($toggle_control_height / 2);
    flex: 0 0 auto;
    height: $toggle_control_height;
    margin: 0 0.375rem;
    position: relative;
    transition: $toggle_transition;
    width: $toggle_control_width;

    &:hover {
      background-color: rgba(var(--fora_toggle_inactive_bg--hover));
    }

    &:active {
      background-color: rgba(var(--fora_toggle_inactive_bg--pressed));
    }

    &--active {
      background-color: rgba(var(--fora_toggle_active_bg));

      &:hover {
        background-color: rgba(var(--fora_toggle_active_bg--hover));
      }

      &:active {
        background-color: rgba(var(--fora_toggle_active_bg--pressed));
      }
    }
  }

  &__knob {
    background-color: rgba(var(--fora_toggle_knob_bg));
    border-radius: calc($toggle_knob_height / 2);
    height: $toggle_knob_height;
    left: calc(($toggle_control_height - $toggle_knob_height) / 2);
    position: absolute;
    top: calc(($toggle_control_height - $toggle_knob_height) / 2);
    transition: $toggle_transition;
    width: $toggle_knob_width;

    &--active {
      left: calc(100% - $toggle_knob_width - 0.125rem);
    }
  }

  &__label {
    font-size: $toggle_label_size;
    font-weight: $toggle_label_weight;
    margin: 0 0.375rem;

    &--visually-hidden {
      @include visually-hidden;
    }

    &--reverse {
      order: 2;
    }
  }

  &__value {
    font-size: $toggle_value_size;
    font-weight: $toggle_value_weight;
    margin: 0 0.375rem;
  }
}
</style>