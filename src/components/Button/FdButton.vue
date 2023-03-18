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
    :disabled="disabled && 'disabled'"
    @click="handleClick"
  >
    <slot name="prepend-icon">
      <fd-icon
        v-if="prependIcon"
        class="fd-button__prepend-icon"
        :icon="prependIcon"
        :size="getIconSize()"
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
        :size="getIconSize()"
      />
    </slot>
  </component>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue';
import { getButtonElement } from '../../utils/buttons';
import { tshirt } from '../../utils/validators';
import { RouteLocationRaw } from 'vue-router';
import { ButtonKind } from '../../types/button';
import { TshirtSize } from '../../types/common';
import FdIcon from '../Icon';

export default defineComponent({
  name: 'FdButton',
  components: { FdIcon },
  props: {
    appendIcon: {
      type: [Object, Function],
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
      type: [Object, Function],
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

    const handleClick = (e: MouseEvent) => {
      if (props.toggle) {
        emit('update:modelValue', !props.modelValue);
      }

      emit('click', e);
    }

    const getIconSize = (): number => (
      props.size === 'xs' || props.size === 'sm' ? 20 : 24
    );

    return { buttonType, getIconSize, handleClick };
  }
});
</script>

<style lang="scss" scoped>
@import "@/styles/required";

.fd-button {
  align-items: center;
  border: $button-border;
  border-radius: $button-border-radius;
  box-shadow: $button-elevation;
  display: inline-flex;
  font-family: $button-font-family;
  font-size: $button-font-size;
  font-weight: $button-font-weight;
  height: $button-height;
  justify-content: center;
  line-height: 1.5rem;
  padding: 0 $button-padding;
  text-align: $button-text-align;
  text-transform: $button-text-transform;
  transition: $button-transition;
  vertical-align: middle;

  &--primary {
    background-color: rgba(var(--fora-button-primary));
    color: rgba(var(--fora-button-primary-text));

    &:hover {
      background-color: rgba(var(--fora-button-primary-hover));
      color: rgba(var(--fora-button-primary-text-hover));
    }

    &:active,
    &.fd-button--pressed {
      background-color: rgba(var(--fora-button-primary-pressed));
      box-shadow: none;
      color: rgba(var(--fora-button-primary-text-pressed));
    }

    @include focus-primary;
  }

  &--secondary {
    background-color: rgba(var(--fora-button-secondary));
    color: rgba(var(--fora-button-secondary-text));

    &:hover {
      background-color: rgba(var(--fora-button-secondary-hover));
      color: rgba(var(--fora-button-secondary-text-hover));
    }

    &:active,
    &.fd-button--pressed {
      background-color: rgba(var(--fora-button-secondary-pressed));
      box-shadow: none;
      color: rgba(var(--fora-button-secondary-text-pressed));
    }

    @include focus-primary;
  }

  &--tertiary {
    background-color: rgba(var(--fora-button-tertiary-bg));
    border: $button-outlined-border;
    border-color: rgba(var(--fora-button-tertiary));
    color: rgba(var(--fora-button-tertiary-text));

    &:hover {
      background-color: rgba(var(--fora-button-tertiary-bg-hover));
      border-color: rgba(var(--fora-button-tertiary-hover));
      color: rgba(var(--fora-button-tertiary-text-hover));
    }

    &:active,
    &.fd-button--pressed {
      background-color: rgba(var(--fora-button-tertiary-bg-pressed));
      border-color: rgba(var(--fora-button-tertiary-pressed));
      box-shadow: none;
      color: rgba(var(--fora-button-tertiary-text-pressed));
    }

    @include focus-primary;
  }

  &--tertiary-neutral {
    background-color: rgba(var(--fora-button-tertiary-neutral-bg));
    border: $button-outlined-border;
    border-color: rgba(var(--fora-button-tertiary-neutral));
    color: rgba(var(--fora-button-tertiary-neutral-text));

    &:hover {
      background-color: rgba(var(--fora-button-tertiary-neutral-bg-hover));
      border-color: rgba(var(--fora-button-tertiary-neutral-hover));
      color: rgba(var(--fora-button-tertiary-neutral-text-hover));
    }

    &:active,
    &.fd-button--pressed {
      background-color: rgba(var(--fora-button-tertiary-neutral-bg-pressed));
      border-color: rgba(var(--fora-button-tertiary-neutral-pressed));
      box-shadow: none;
      color: rgba(var(--fora-button-tertiary-neutral-text-pressed));
    }

    @include focus-primary;
  }

  &--link {
    background-color: rgba(var(--fora-button-link-bg));
    box-shadow: none;
    color: rgba(var(--fora-button-link));

    &:hover {
      background-color: rgba(var(--fora-button-link-bg-hover));
      color: rgba(var(--fora-button-link-hover));
    }

    &:active,
    &.fd-button--pressed {
      background-color: rgba(var(--fora-button-link-bg-pressed));
      box-shadow: none;
      color: rgba(var(--fora-button-link-pressed));
    }

    @include focus-primary;
  }

  &--destructive {
    background-color: rgba(var(--fora-button-destructive));
    color: rgba(var(--fora-button-destructive-text));

    &:hover {
      background-color: rgba(var(--fora-button-destructive-hover));
      color: rgba(var(--fora-button-destructive-text-hover));
    }

    &:active,
    &.fd-button--pressed {
      background-color: rgba(var(--fora-button-destructive-pressed));
      box-shadow: none;
      color: rgba(var(--fora-button-destructive-text-pressed));
    }

    @include focus-danger;
  }

  &--block {
    display: block;
    width: 100%;
  }

  &--icon {
    padding: 0;
    width: $button-height;

    ::v-deep {
    .fd-icon {
      margin-top: -0.2em; // fix positioning for icon buttons
    }
  }
  }

  &--disabled,
  &[disabled="disabled"] {
    background-color: rgba(var(--fora-disabled-bg));
    color: rgba(var(--fora-disabled-text));
    pointer-events: none;
  }

  // include a content wrapper to help with vert align with icons
  &__content {
    display: inline-block;
    line-height: 1.5rem;
  }

  &--xs {
    font-size: $button-xs-font-size;
    height: $button-xs-height;
    line-height: 1.25rem;
    padding: 0 $button-xs-padding;



    &.fd-button--icon {
      padding: 0;
      width: $button-xs-height;
    }
  }

  &--sm {
    font-size: $button-sm-font-size;
    height: $button-sm-height;
    line-height: 1.25rem;
    padding: 0 $button-sm-padding;


    
    &.fd-button--icon {
      padding: 0;
      width: $button-sm-height;
    }
  }

  &--md {
    height: $button-height;
  }

  &--lg {
    font-size: $button-lg-font-size;
    height: $button-lg-height;
    line-height: 1.5rem;
    padding: 0 $button-lg-padding;
    
    &.fd-button--icon {
      padding: 0;
      width: $button-lg-height;
    }
  }

  &--xl {
    font-size: $button-xl-font-size;
    height: $button-xl-height;
    line-height: 1.75rem;
    padding: 0 $button-xl-padding;


    
    &.fd-button--icon {
      padding: 0;
      width: $button-xl-height;
    }
  }

  &--disabled {
    background-color: rgba(var(--fora-button-disabled));
    color: rgba(var(--fora-button-disabled-text));
    pointer-events: none;

    &.fd-button--tertiary,
    &.fd-button--tertiary-neutral {
      background-color: rgba(var(--fora-button-disabled-bg));
      border-color: rgba(var(--fora-button-disabled));
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
