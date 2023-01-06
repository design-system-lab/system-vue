<template>
  <component
    class="fd-button"
    :class="{
      'fd-button--pressed': toggle && modelValue,
    }"
    :is="buttonType"
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
import { emit } from 'process';

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
  background-color: $primary-50;
  border: none;
  border-radius: $button-border-radius;
  padding: 0.5rem 1rem;

  &:hover {
    background-color: $primary-60;
  }

  &:active {
    background-color: $primary-70;
  }
}
</style>
