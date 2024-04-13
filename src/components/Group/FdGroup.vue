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
import { PropType, computed, defineComponent } from 'vue';
import FdButtonGroup from '../ButtonGroup';
import FdCheckboxGroup from '../CheckboxGroup/FdCheckboxGroup.vue';
import { buttonGroupProps, checkboxGroupProps } from '../../composables/group';
import { GroupType } from '../../types/group';

export default defineComponent({
  name: 'FdGroup',
  components: { FdButtonGroup, FdCheckboxGroup },
  props: {
    ...buttonGroupProps,
    ...checkboxGroupProps,
    type: {
      type: String as PropType<GroupType>,
      default: 'default',
    },
  },
  setup(props) {
    const getComponent = computed(() => {
      switch (props.type) {
        case 'button':
          return 'fd-button-group';
        case 'checkbox':
          return 'fd-checkbox-group';
        case 'default':
          return 'div';
      }
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

:deep(.fd-button) {
  border-radius: 0;

  &:focus-visible {
    position: relative;
    z-index: 1;
  }

  &:first-child {
    border-radius: $border-radius_md;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }

  &:last-child {
    border-radius: $border-radius_md;
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
