<template>
  <component
    :is="buttonType"
    class="fd-button"
    :class="[
      `fd-button--${size}`,
      `fd-button--${getButtonStyle}`,
      {
        'fd-button--block': block,
        'fd-button--disabled': disabled,
        'fd-button--icon': icon || $slots.icon,
        'fd-button--pressed': toggle && modelValue,
        'fd-button--toggle': toggle,
      }
    ]"
    :disabled="disabled || undefined"
    v-bind="buttonType === 'a' ? { href } : { to }"
    @click="handleClick"
  >
    <slot name="prepend-icon">
      <fd-icon
        v-if="prependIcon"
        class="fd-button__prepend-icon"
        :icon="prependIcon"
        :size="getIconSize(size)"
      />
    </slot>
    <span
      class="fd-button__content"
    >
      <slot />
      <slot name="icon">
        <fd-icon
          v-if="icon"
          class="fd-button__icon"
          :icon="icon"
          :size="getIconSize(size)"
        />
      </slot>
    </span>
    <slot name="append-icon">
      <fd-icon
        v-if="appendIcon"
        class="fd-button__append-icon"
        :icon="appendIcon"
        :size="getIconSize(size)"
      />
    </slot>
  </component>
</template>
<script lang="ts">
import { computed, defineComponent, PropType } from 'vue';
import { RouteLocationRaw } from 'vue-router';
import FdIcon from '../Icon';
import { getButtonElement, getIconSize, tshirt } from '../../utils';
import { ButtonKind, ButtonMode, Icon, TshirtSize } from '../../types';

export default defineComponent({
  name: 'FdButton',
  components: { FdIcon },
  props: {
    appendIcon: {
      type: Function as PropType<Icon>,
      default: undefined,
    },
    block: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    href: {
      type: String,
      default: undefined,
    },
    icon: {
      type: Function as PropType<Icon>,
      default: undefined,
    },
    kind:  {
      type: String as PropType<ButtonKind>,
      default: 'primary',
    },
    // TODO: Add loading state option
    // loading: {
    //   type: Boolean,
    //   default: false,
    // },
    mode: {
      type: String as PropType<ButtonMode>,
      default: 'filled',
    },
    modelValue: {
      type: Boolean,
      default: false,
    },
    prependIcon: {
      type: Function as PropType<Icon>,
      default: undefined,
    },
    size: {
      type: String as PropType<TshirtSize>,
      default: 'md',
      validator: (opt: string) => tshirt(opt),
    },
    tag: {
      type: String,
      default: undefined,
    },
    to: {
      type: [String, Object] as PropType<RouteLocationRaw>,
      default: undefined,
    },
    toggle: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const buttonType = computed((): string => {
      if (props.tag) return props.tag;
      return getButtonElement(props.href, props.to);
    });

    const getButtonStyle = computed((): string => {
      if (props.mode === 'text') return 'text';
      return `${props.mode}-${props.kind}`;
    });

    const handleClick = () => {
      if (props.toggle) {
        emit('update:modelValue', !props.modelValue);
      }
    }

    return { buttonType, getButtonStyle, getIconSize, handleClick };
  }
});
</script>
<style lang="scss" scoped>
@import "@/styles/required";

.fd-button {
  align-items: center;
  border: $button_border;
  border-radius: $button_border-radius;
  box-shadow: $button_elevation;
  cursor: pointer;
  display: inline-flex;
  font-family: $button_font-family;
  font-size: $button_size;
  font-weight: $button_weight;
  gap: $button_gap;
  height: $button_height;
  justify-content: center;
  line-height: 1.5rem;
  padding: 0 $button_padding;
  text-align: $button_text-align;
  text-decoration: none;
  text-transform: $button_text-transform;
  transition: $button_transition;
  vertical-align: middle;

  @include focus-primary;

  &--filled {
    &-primary {
      background-color: rgba(var(--fora_button_primary_filled_bg));
      color: rgba(var(--fora_button_filled_color));

      &:hover {
        background-color: rgba(var(--fora_button_primary_filled_bg--hover));
      }

      &:active,
      &.fd-button--pressed {
        background-color: rgba(var(--fora_button_primary_filled_bg--pressed));
        box-shadow: none;
      }
    }

    &-danger {
      background-color: rgba(var(--fora_button_danger_filled_bg));
      color: rgba(var(--fora_button_filled_color));

      &:hover {
        background-color: rgba(var(--fora_button_danger_filled_bg--hover));
      }

      &:active,
      &.fd-button--pressed {
        background-color: rgba(var(--fora_button_danger_filled_bg--pressed));
        box-shadow: none;
      }
    }

    &-neutral {
      background-color: rgba(var(--fora_button_neutral_filled_bg));
      color: rgba(var(--fora_button_filled_color));

      &:hover {
        background-color: rgba(var(--fora_button_neutral_filled_bg--hover));
      }

      &:active,
      &.fd-button--pressed {
        background-color: rgba(var(--fora_button_neutral_filled_bg--pressed));
        box-shadow: none;
      }
    }
  }

  &--outlined {
    &-primary {
      border: $button_outlined_border rgba(var(--fora_button_primary_outlined_border));
      background-color: rgba(var(--fora_button_primary_outlined_bg));
      color: rgba(var(--fora_button_primary_outlined_color));

      &:hover {
        background-color: rgba(var(--fora_button_primary_outlined_bg--hover));
        border-color: rgba(var(--fora_button_primary_outlined_border--hover));
        color: rgba(var(--fora_button_primary_outlined_color--hover));
      }

      &:active,
      &.fd-button--pressed {
        background-color: rgba(var(--fora_button_primary_outlined_bg--pressed));
        border-color: rgba(var(--fora_button_primary_outlined_border--pressed));
        box-shadow: none;
        color: rgba(var(--fora_button_primary_outlined_color--pressed));
      }
    }

    &-danger {
      border: $button_outlined_border rgba(var(--fora_button_danger_outlined_border));
      background-color: rgba(var(--fora_button_danger_outlined_bg));
      color: rgba(var(--fora_button_danger_outlined_color));

      &:hover {
        background-color: rgba(var(--fora_button_danger_outlined_bg--hover));
        border-color: rgba(var(--fora_button_danger_outlined_border--hover));
        color: rgba(var(--fora_button_danger_outlined_color--hover));
      }

      &:active,
      &.fd-button--pressed {
        background-color: rgba(var(--fora_button_danger_outlined_bg--pressed));
        border-color: rgba(var(--fora_button_danger_outlined_border--pressed));
        box-shadow: none;
        color: rgba(var(--fora_button_danger_outlined_color--pressed));
      }
    }

    &-neutral {
      border: $button_outlined_border rgba(var(--fora_button_neutral_outlined_border));
      background-color: rgba(var(--fora_button_neutral_outlined_bg));
      color: rgba(var(--fora_button_neutral_outlined_color));

      &:hover {
        background-color: rgba(var(--fora_button_neutral_outlined_bg--hover));
        border-color: rgba(var(--fora_button_neutral_outlined_border--hover));
        color: rgba(var(--fora_button_neutral_outlined_color--hover));
      }

      &:active,
      &.fd-button--pressed {
        background-color: rgba(var(--fora_button_neutral_outlined_bg--pressed));
        border-color: rgba(var(--fora_button_neutral_outlined_border--pressed));
        box-shadow: none;
        color: rgba(var(--fora_button_neutral_outlined_color--pressed));
      }
    }
  }

  &--text {
    background-color: rgba(var(--fora_button_text_bg));
    border-color: rgba(var(--fora_button_text_border));
    box-shadow: none;
    color: rgba(var(--fora_button_text_color));

    &:hover {
      background-color: rgba(var(--fora_button_text_bg--hover));
      border-color: rgba(var(--fora_button_text_border--hover));
      color: rgba(var(--fora_button_text_color--hover));
    }

    &:active,
    &.fd-button--pressed {
      background-color: rgba(var(--fora_button_text_bg--pressed));
      border-color: rgba(var(--fora_button_text_border--pressed));
      box-shadow: none;
      color: rgba(var(--fora_button_text_color--pressed));
    }
  }

  &__content {
    display: inline-flex;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  &--xs {
    font-size: $button_xs_size;
    gap: $button_xs_gap;
    height: $button_xs_height;
    padding: 0 $button_xs_padding;
  }

  &--sm {
    font-size: $button_sm_size;
    height: $button_sm_height;
    padding: 0 $button_sm_padding;
  }

  &--md {
    font-size: $button_size;
    height: $button_height;
    padding: 0 $button_padding;
  }

  &--lg {
    font-size: $button_lg_size;
    height: $button_lg_height;
    padding: 0 $button_lg_padding;
  }

  &--xl {
    font-size: $button_xl_size;
    height: $button_xl_height;
    padding: 0 $button_xl_padding;
  }

  &--block {
    display: flex;
    width: 100%;
  }

  &--icon {
    padding: 0;
    
    &[class*='xs'] {
      width: $button_xs_height;
    }

    &[class*='sm'] {
      width: $button_sm_height;
    }

    &[class*='md'] {
      width: $button_height;
    }

    &[class*='lg'] {
      width: $button_lg_height;
    }

    &[class*='xl'] {
      width: $button_xl_height;
    }
  }

  &--disabled {
    box-shadow: none;
    pointer-events: none;

    &[class*='filled'] {
      background-color: rgba(var(--fora_button_disabled_bg));
      color: rgba(var(--fora_button_disabled_color));
    }

    &[class*='outlined'] {
      border-color: rgba(var(--fora_button_disabled_border));
      color: rgba(var(--fora_button_disabled_color));
    }

    &[class*='text'] {
      color: rgba(var(--fora_button_disabled_color));
    }
  }
}
</style>