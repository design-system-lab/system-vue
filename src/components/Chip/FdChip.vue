<template>
  <component
    :is="getChipType"
    class="fd-chip"
    :class="[
      `fd-chip--${size}`,
      {
        'fd-chip--dismissible': dismissible,
        'fd-chip--interactive': interactive,
        'fd-chip--selected': isSelected,
      }
    ]"
    @click="handleClick"
  >
    <div
      v-if="icon || $slots.icon"
      class="fd-chip__icon"
      :class="[`fd-chip__icon--${size}`]"
      data-testid="fd-chip__icon"
    >
      <slot name="icon">
        <fd-icon
          :icon="icon"
          :size="getIconSize"
        />
      </slot>
    </div>
    <slot>
      {{ text }}
    </slot>
    <div
      v-if="isSelected"
      class="fd-chip__selected"
      :class="[`fd-chip__selected--${size}`]"
      data-testid="fd-chip__selected"
    >
      <slot name="selected-icon">
        <fd-icon
          :icon="CheckIcon"
          :size="getIconSize"
        />
      </slot>
    </div>
    <fd-close-button
      v-if="dismissible"
      round
      :size="size === 'lg' ? 'md' : 'sm'"
      data-testid="fd-chip__dismiss"
    />
  </component>
</template>
<script lang="ts">
import { computed, defineComponent, inject, shallowRef, PropType } from 'vue';
import { CheckIcon, XMarkIcon } from '@heroicons/vue/20/solid';
import FdCloseButton from '../CloseButton/FdCloseButton.vue';
import FdIcon from '../Icon/FdIcon.vue';
import { Icon } from '../../types';

/**
 * Chips
 * 
 * @param {boolean} dismissible - Adds a dismiss button to the chip and emits `dismiss` event when clicked
 * @param {Icon} icon - Icon to display on the chip
 * @param {boolean} interactive - Makes the chip interactive (clickable) and emits `update:modelValue` event when clicked
 * @param {string | string[] | boolean} modelValue - Value of the chip, can function like a checkbox, radio, or multi-select based on the value type
 * @param {'sm' | 'md' | 'lg'} size - Size of the chip
 * @param {string} tag - Optional HTML tag to use for the chip, will default to div for non-interactive chips and button for interactive chips
 * @param {string} text - Text to display in the chip
 * @param {string} value - Value to use for the chip, used for radio or multi-select chips
 */
export default defineComponent({
  name: 'FdChip',
  components: {
    FdCloseButton,
    FdIcon,
  },
  props: {
    dismissible: {
      type: Boolean,
      default: false,
    },
    icon: {
      type: Function as PropType<Icon>,
      default: undefined,
    },
    interactive: {
      type: Boolean,
      default: false,
    },
    modelValue: {
      type: [String, Array, Boolean] as PropType<string | string[] | boolean>,
      default: false,
    },
    size: {
      type: String as PropType<'sm' | 'md' | 'lg'>,
      default: 'lg',
    },
    tag: {
      type: String,
      default: undefined,
    },
    text: {
      type: String,
      default: undefined,
    },
    value: {
      type: String,
      default: undefined,
    },
  },
  emits: ['dismiss', 'update:modelValue'],
  setup(props, { emit }) {
    const groupHandleModelValue = inject<((val: string | string[]) => void) | null>('groupHandleModelValue', null);
    const groupModelValue = inject('groupModelValue', shallowRef(null));

    const chipModelValue = computed<boolean | string | string[]>(() => {
      return groupModelValue.value ?? props.modelValue;
    });

    const getChipType = computed(() => {
      if (props.tag) return props.tag;
      if (props.interactive) return 'button';
      return 'div';
    });

    const getIconSize = computed(() => {
      return props.size === 'lg' ? 20 : 16;
    });

    const getReturnValue = computed(() => {
      if (typeof chipModelValue.value === 'boolean') return !props.modelValue;
      if (props.value) {
        if (typeof chipModelValue.value === 'string') return props.value;

        if (Array.isArray(chipModelValue.value)) {
          return chipModelValue.value.includes(props.value)
            ? chipModelValue.value.filter((v: string) => v !== props.value)
            : [...chipModelValue.value, props.value];
        }
      }

      return chipModelValue.value;
    });

    const isSelected = computed(() => {
      if (typeof chipModelValue.value === 'boolean') return chipModelValue.value;
      if (props.value) {
        if (typeof chipModelValue.value === 'string') return props.value === chipModelValue.value;
        if (Array.isArray(chipModelValue.value)) {
          return chipModelValue.value.includes(props.value);
        }
      }

      return false;
    });

    function handleClick() {
      if (props.interactive) {
        emit('update:modelValue', getReturnValue.value);
        if (groupHandleModelValue) groupHandleModelValue((getReturnValue.value as string | string[]));
      }
    }

    return {
      chipModelValue,
      getChipType,
      getIconSize,
      getReturnValue,
      handleClick,
      isSelected,
      CheckIcon,
      XMarkIcon,
    };
  },
});
</script>
<style lang="scss" scoped>
@import '../../styles/required';

.fd-chip {
  align-items: center;
  background-color: rgba(var(--fora_chip_bg));
  border: $chip_border rgba(var(--fora_chip_border-color));
  border-radius: $border-radius_full;
  box-sizing: border-box;
  color: rgba(var(--fora_chip_color));
  display: inline-flex;
  font-size: $chip_font-size;
  gap: $chip_gap;
  height: $chip_height;
  justify-content: center;
  line-height: $chip_line-height;
  padding: $chip_padding-y calc($chip_padding-x - 1px);
  transition: $transition-timing background-color, $transition-timing border-color;

  &--md {
    height: $chip_md_height;
    padding: $chip_md_padding-y calc($chip_md_padding-x - 1px);
  }

  &--sm {
    font-size: $chip_sm_size;
    height: $chip_sm_height;
    padding: $chip_sm_padding-y calc($chip_sm_padding-x - 1px);

    .fd-close-button {
      margin-right: -2px;
    }
  }

  &--dismissible {
    padding-right: calc($chip_dismissible_padding-right - 1px);
  }

  &--interactive {
    background-color: rgba(var(--fora_chip_interactive_bg));
    border-color: rgba(var(--fora_chip_interactive_border-color));

    &:hover {
      background-color: rgba(var(--fora_chip_interactive_bg--hover));
    }

    &:active,
    &.fd-chip--selected {
      background-color: rgba(var(--fora_chip_interactive_bg--pressed));
    }
  }

  &--selected {
    background-color: (rgba(var(--fora_chip_interactive_bg--pressed)));
  }

  &__icon {
    color: rgba(var(--fora_chip_icon_color));
    display: flex;
    flex: 0 0 auto;
    height: $chip_icon_width;
    width: $chip_line-height;

    &--lg {
      height: $chip_lg_icon_height;
      width: $chip_lg_icon_width;
    }
  }

  &__selected {
    display: flex;
    flex: 0 0 auto;
    height: $chip_selected_height;
    width: $chip_selected_width;

    &--lg {
      height: $chip_lg_selected_height;
      width: $chip_lg_selected_width;
    }
  }
}
</style>
