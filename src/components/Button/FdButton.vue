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
import { computed, defineComponent, PropType } from 'vue';
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
.fd-button {
  background-color: $primary-500;
  border: none;
  border-radius: $button-border-radius;
  box-shadow: 0 0 6px rgba(0,0,0,0.35);
  color: $button-text-color;
  font-family: $font-family;
  font-size: 1rem;
  font-weight: $font-bold;
  padding: 0.5rem 1rem;
  text-align: center;
  text-transform: $button-text-transform;
  transition: $transition-timing background, $transition-timing box-shadow, $transition-timing border-color;

  &:hover {
    background-color: $primary-600;
  }

  &:active,
  &.fd-button--pressed {
    background-color: $primary-700;
    box-shadow: none;
  }

  &.fd-button--block {
    display: block;
    width: 100%;
  }

  @include focus-primary;
}

.fd-button--outlined {
  background-color: transparent;
  border: 2px solid $primary-500;
  box-shadow: none;
  color: $primary-500;

  &:hover {
    background-color: rgba($primary-500, 0.1);
    border-color: $primary-600;
    color: $primary-600;
  }

  &:active,
  &.fd-button--pressed {
    background-color: rgba($primary-500, 0.2);
    border-color: $primary-700;
    color: $primary-700;
  }
}

.fd-button--disabled {
  background-color: $disabled-bg;
  color: $disabled-text;
  pointer-events: none;

  &.fd-button--outlined {
    background-color: transparent;
    border-color: $disabled-bg;
    color: $disabled-text;
  }
}
</style>
