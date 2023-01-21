<template>
  <component
    class="fd-button"
    :class="[
      `fd-button--${size}`,
      {
        'fd-button--block': block,
        'fd-button--disabled': disabled,
        'fd-button--icon': icon,
        'fd-button--loading': loading,
        'fd-button--outlined': outlined,
        'fd-button--pressed': toggle && modelValue,
        'fd-button--text': text,
        'fd-button--toggle': toggle,
      }
    ]"
    :is="buttonType"
    :disabled="disabled"
    @click="handleClick"
  >
    <slot />
  </component>
</template>

<script lang="ts">
import { computed, defineComponent, inject, PropType } from 'vue';
import { tshirt } from '../../utils/validators';
import { isRouterLink } from '../../utils/router';
import { RouteLocationRaw } from 'vue-router';

export default defineComponent({
  name: 'FdButton',
  props: {
    block: {
      type: Boolean,
      default: false,
    },
    color: {
      type: String,
      default: '',
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
    loading: {
      type: Boolean,
      default: false,
    },
    outlined: {
      type: Boolean,
      default: false,
    },
    modelValue: {
      type: Boolean,
      default: false,
    },
    size: {
      type: String,
      default: 'md',
      validator: (opt: string) => tshirt(opt),
    },
    text: {
      type: Boolean,
      default: false,
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
    type: {
      type: String,
      default: undefined,
    },
  },
  setup(props, { emit }) {
    const buttonType = computed((): string => {
      if (props.tag) return props.tag;
      if (props.href) return 'a';
      if (props.to && isRouterLink(props.to)) return 'router-link';

      return 'button';
    });

    const handleClick = (e: MouseEvent) => {
      if (props.toggle) {
        emit('update:modelValue', !props.modelValue);
      }

      emit('click', e);
    }

    return { buttonType, handleClick };
  }
});
</script>

<style lang="scss" scoped>
@import "@/styles/required";

.fd-button {
  background-color: var(--fora-button-primary);
  border: $button-border;
  border-radius: $button-border-radius;
  box-shadow: $button-elevation;
  color: var(--fora-button-primary-text);
  font-family: $button-font-family;
  font-size: $button-font-size;
  font-weight: $button-font-weight;
  padding: $button-padding;
  text-align: $button-text-align;
  text-transform: $button-text-transform;
  transition: $button-transition;

  &:hover {
    background-color: var(--fora-button-primary-hover);
  }

  &:active,
  &.fd-button--pressed {
    background-color: var(--fora-button-primary-pressed);
    box-shadow: none;
  }

  &.fd-button--block {
    display: block;
    width: 100%;
  }

  @include focus-primary;
}

.fd-button--outlined {
  background-color: var(--fora-button-outlined-bg);
  border: $button-outlined-border var(--fora-button-outlined);
  box-shadow: none;
  color: $button-outlined-text;

  &:hover {
    background-color: var(--fora-button-outlined-bg-hover);
    border-color: var(--fora-button-outlined-hover);
    color: var(--fora-button-outlined-text-hover);
  }

  &:active,
  &.fd-button--pressed {
    background-color: var(--fora-button-outlined-bg-pressed);
    border-color: var(--fora-button-outlined-pressed);
    color: var(--fora-button-outlined-text-pressed);
  }
}

.fd-button--disabled {
  background-color: var(--fora-disabled-bg);
  color: var(--fora-disabled-text);
  pointer-events: none;

  &.fd-button--outlined {
    background-color: transparent;
    border-color: var(--fora-disabled-bg);
    color: var(--fora-disabled-text);
  }
}
</style>
