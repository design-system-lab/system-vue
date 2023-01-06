<template>
  <component
    class="fd-button"
    :is="buttonType"
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
      default: 'primary',
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
    type: {
      type: String,
      default: undefined,
    }
  },
  setup(props) {
    const buttonType = computed((): string => {
      if (props.tag) return props.tag;
      if (props.href) return 'a';
      if (props.to && isRouterLink(props.to)) return 'router-link';

      return 'button';
    });

    return { buttonType };
  }
});
</script>

<style lang="scss" scoped>
.fd-button {
  border-radius: $button-border-radius;
}
</style>
