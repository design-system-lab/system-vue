<template>
  <component :is="buttonType">
    <slot />
  </component>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { tshirt } from '../../utils/validators';

export default defineComponent({
  name: 'FdButton',
  props: {
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
    },
    icon: {
      type: Boolean,
      default: false,
    },
    size: {
      type: String,
      default: 'md',
      validator: (opt: string) => tshirt(opt),
    },
    to: {
      // add in dumb ts stuff for to
    }
  },
  setup(props, { emit }) {
    const buttonType = computed(() => {
      if (props.href || props.to) {
        return props.href && 'a' || 'router-link';
      }

      return 'button';
    })

    return { buttonType };
  }
});
</script>

<style lang="scss">


</style>
