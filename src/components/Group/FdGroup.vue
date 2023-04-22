<template>
  <component
    :is="getComponent"
    class="fd-group"
    v-bind="$props"
    @update:modelValue="$emit('update:modelValue', $event)"
    @click="$emit('click', $event)"
  >
    <template
      v-for="(_, name) in $slots"
      #[name]
    >
      <slot :name="name" />
    </template>
  </component>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import FdButtonGroup from '../ButtonGroup';
import { buttonGroupProps } from '../../composables/group';

export default defineComponent({
  name: 'FdGroup',
  components: { FdButtonGroup },
  props: {
    ...buttonGroupProps,
  },
  setup(props) {
    const groupType = computed(() => {
      if (props.buttons.length !== 0) {
        return 'button'
      }

      return 'default';
    });

    const getComponent = computed(() => {
      if (groupType.value === 'button') {
        return 'fd-button-group';
      }

      return 'div';
    });

    return { getComponent };
  }
});
</script>

<style lang="scss" scoped>
@import "@/styles/required";

.fd-group {
  white-space: nowrap;
}

:deep(:focus-visible) {
  position: relative;
  z-index: 1;
}

:deep(.fd-button) {
  border-radius: 0;

  &:first-child {
    border-radius: $border-radius;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }

  &:last-child {
    border-radius: $border-radius;
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }

  + .fd-button {
    margin-left: 2px;
  }
}

:deep(.fd-button--tertiary),
:deep(.fd-button--tertiary-neutral) {
  border-left-width: calc($button-outlined-width / 2);
  border-right-width: calc($button-outlined-width / 2);

  &:first-child {
    border-left-width: $button-outlined-width;
  }

  &:last-child {
    border-right-width: $button-outlined-width;
  }

  + .fd-button {
    margin-left: 0px;
  }
}
</style>
