<template>
  <component
    class="fd-button"
    :class="[
      `fd-button--${kind}`,
      `fd-button--${size}`,
      {
        'fd-button--block': block,
        'fd-button--disabled': disabled,
        'fd-button--icon': icon,
        'fd-button--pressed': toggle && modelValue,
        'fd-button--toggle': toggle,
      }
    ]"
    :is="buttonType"
    :disabled="disabled || undefined"
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
    <span class="fd-button__content">
      <slot />
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
import { getButtonElement } from '../../utils/buttons';
import { getIconSize } from '../../utils/icons';
import { tshirt } from '../../utils/validators';
import { ButtonKind } from '../../types/button';
import { TshirtSize, Icon } from '../../types/common';

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
      type: Boolean,
      default: false,
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
  setup(props, { emit }) {
    const buttonType = computed((): string => {
      if (props.tag) return props.tag;
      return getButtonElement(props.href, props.to);
    });

    const handleClick = () => {
      if (props.toggle) {
        emit('update:modelValue', !props.modelValue);
      }
    }

    return { buttonType, getIconSize, handleClick };
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
  height: $button_height;
  justify-content: center;
  line-height: 1.5rem;
  padding: 0 $button_padding;
  text-align: $button_text-align;
  text-transform: $button_text-transform;
  transition: $button_transition;
  vertical-align: middle;

  @include focus-primary;

  &--primary {
    background-color: rgba(var(--fora_button_primary_bg));
    color: rgba(var(--fora_button_primary_color));

    &:hover {
      background-color: rgba(var(--fora_button_primary_bg--hover));
      color: rgba(var(--fora_button_primary_color--hover));
    }

    &:active,
    &.fd-button--pressed {
      background-color: rgba(var(--fora_button_primary_bg--pressed));
      box-shadow: none;
      color: rgba(var(--fora_button_primary_color--pressed));
    }
  }

  &--secondary {
    background-color: rgba(var(--fora_button_secondary_bg));
    color: rgba(var(--fora_button_secondary_color));

    &:hover {
      background-color: rgba(var(--fora_button_secondary_bg--hover));
      color: rgba(var(--fora_button_secondary_color--hover));
    }

    &:active,
    &.fd-button--pressed {
      background-color: rgba(var(--fora_button_secondary_bg--pressed));
      box-shadow: none;
      color: rgba(var(--fora_button_secondary_color--pressed));
    }
  }

  &--tertiary {
    background-color: rgba(var(--fora_button_tertiary_bg));
    border: $button_outlined_border;
    border-color: rgba(var(--fora_button_tertiary));
    color: rgba(var(--fora_button_tertiary_color));

    &:hover {
      background-color: rgba(var(--fora_button_tertiary_bg--hover));
      border-color: rgba(var(--fora_button_tertiary_border-color--hover));
      color: rgba(var(--fora_button_tertiary_color--hover));
    }

    &:active,
    &.fd-button--pressed {
      background-color: rgba(var(--fora_button_tertiary_bg--pressed));
      border-color: rgba(var(--fora_button_tertiary_border-color--pressed));
      box-shadow: none;
      color: rgba(var(--fora_button_tertiary_color--pressed));
    }
  }

  &--tertiary-neutral {
    background-color: rgba(var(--fora_button_tertiary-neutral_bg));
    border: $button_outlined_border;
    border-color: rgba(var(--fora_button_tertiary-neutral_border-color));
    color: rgba(var(--fora_button_tertiary-neutral_color));

    &:hover {
      background-color: rgba(var(--fora_button_tertiary-neutral_bg--hover));
      border-color: rgba(var(--fora_button_tertiary-neutral_border-color--hover));
      color: rgba(var(--fora_button_tertiary-neutral_color--hover));
    }

    &:active,
    &.fd-button--pressed {
      background-color: rgba(var(--fora_button_tertiary-neutral_bg--pressed));
      border-color: rgba(var(--fora_button_tertiary-neutral_border-color--pressed));
      box-shadow: none;
      color: rgba(var(--fora_button_tertiary-neutral_color--pressed));
    }
  }

  &--link {
    background-color: rgba(var(--fora_button_link_bg));
    box-shadow: none;
    color: rgba(var(--fora_button_link_color));

    &:hover {
      background-color: rgba(var(--fora_button_link_bg--hover));
      color: rgba(var(--fora_button_link_color--hover));
    }

    &:active,
    &.fd-button--pressed {
      background-color: rgba(var(--fora_button_link_bg--pressed));
      box-shadow: none;
      color: rgba(var(--fora_button_link_color--pressed));
    }
  }

  &--destructive {
    background-color: rgba(var(--fora_button_destructive_bg));
    color: rgba(var(--fora_button_destructive_color));

    &:hover {
      background-color: rgba(var(--fora_button_destructive_bg--hover));
      color: rgba(var(--fora_button_destructive_color--hover));
    }

    &:active,
    &.fd-button--pressed {
      background-color: rgba(var(--fora_button_destructive_bg--pressed));
      box-shadow: none;
      color: rgba(var(--fora_button_destructive_color--pressed));
    }

    @include focus-danger;
  }

  &--block {
    display: flex;
    width: 100%;
  }

  &--icon {
    padding: 0;
    width: $button_height;

    :deep(.fd-icon) {
      margin-top: -0.2em; // fix positioning for icon buttons
    }
  }

  // include a content wrapper to help with vert align with icons
  &__content {
    display: inline-block;
  }

  &--xs {
    font-size: $button_xs_size;
    height: $button_xs_height;
    line-height: 1.25rem;
    padding: 0 $button_xs_padding;

    &.fd-button--icon {
      padding: 0;
      width: $button_xs_height;
    }
  }

  &--sm {
    font-size: $button_sm_size;
    height: $button_sm_height;
    line-height: 1.25rem;
    padding: 0 $button_sm_padding;
    
    &.fd-button--icon {
      padding: 0;
      width: $button_sm_height;
    }
  }

  &--md {
    height: $button_height;
  }

  &--lg {
    font-size: $button_lg_size;
    height: $button_lg_height;
    line-height: 1.5rem;
    padding: 0 $button_lg_padding;
    
    &.fd-button--icon {
      padding: 0;
      width: $button_lg_height;
    }
  }

  &--xl {
    font-size: $button_xl_size;
    height: $button_xl_height;
    line-height: 1.75rem;
    padding: 0 $button_xl_padding;
    
    &.fd-button--icon {
      padding: 0;
      width: $button_xl_height;
    }
  }

  &--disabled,
  &:disabled {
    background-color: rgba(var(--fora_button_disabled_bg));
    color: rgba(var(--fora_button_disabled_color));
    pointer-events: none;

    &.fd-button--tertiary,
    &.fd-button--tertiary-neutral {
      background-color: rgba(var(--fora_button_disabled_bg));
      border-color: rgba(var(--fora_button_disabled_border-color));
    }

    &.fd-button--link {
      background-color: transparent;
    }
  }

  &__append-icon {
    margin-left: 0.5rem;

    .fd-button--xs & {
      margin-left: 0.25rem;
    }
  }

  &__prepend-icon {
    margin-right: 0.5rem;

    .fd-button--xs & {
      margin-right: 0.25rem;
    }
  }
}
</style>
