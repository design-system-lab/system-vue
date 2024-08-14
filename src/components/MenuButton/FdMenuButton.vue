<template>
  <fd-button
    ref="button"
    v-model="modelValue"
    v-bind="{ icon }"
    class="fd-menu-button"
    :append-icon="!icon ? ChevronDownIcon : undefined"
    toggle
    @keydown.down.prevent="handleDown"
    @keydown.up.prevent="handleUp"
    @keydown.enter.prevent="handleToggle"
    @keydown.space.prevent="handleToggle"
    @keydown.tab="handleTab"
    @keydown.esc.prevent="modelValue = false"
  >
    <slot>
      <fd-icon
        v-if="icon"
        :icon="ChevronDownIcon"
      />
    </slot>
    <fd-menu
      v-if="modelValue"
      ref="menu"
      :alignment="alignment"
      :focusItem="focusedItem"
      :items="items"
      menu-placement="global"
      :parent="button.$el"
      @document:click="handleDocumentClick"
    />
  </fd-button>
</template>

<script lang="ts">
import { defineComponent, ref, shallowRef, PropType } from 'vue';
import { ChevronDownIcon } from '@heroicons/vue/20/solid'
import FdButton from '../Button/FdButton.vue';
import FdIcon from '../Icon/FdIcon.vue';
import FdMenu from '../Menu/FdMenu.vue';
import { MenuDirection, MenuPlacement, SelectOption } from '../../types';

export default defineComponent({
  name: 'FdMenuButton',
  components: { FdButton, FdIcon, FdMenu },
  props: {
    alignment: {
      type: String as PropType<'left' | 'right'>,
      default: 'left',
    },
    direction: {
      type: String as PropType<MenuDirection>,
      default: 'bottom',
    },
    icon: {
      type: Boolean,
      default: false,
    },
    items: {
      type: Array as PropType<SelectOption[]>,
      default: () => [],
    }
  },
  setup(props, { emit }) {
    const button = ref<FdButton>(null);
    const focusedItem = ref(0);
    const menu = shallowRef<ComponentPublicInstance | null>(null);
    const modelValue = shallowRef(false);

    /**
     * We check to see if the document click happened in a child of the button or menu, if not close the menu
     */
    function handleDocumentClick(e: Event) {
      if (!button.value?.$el.contains(e.target as NodeOrNull) && !menu.value?.$el.contains(e.target as NodeOrNull)) {
        modelValue.value = false;
      }
    }

    /**
     * Change the focused item when the user presses down arrow
     */
    function handleDown() {
      if (focusedItem.value < props.items.length - 1) {
        focusedItem.value += 1;
      }
    }

    /**
     * Change the focused item when the user presses up arrow
     */
     function handleUp() {
      if (focusedItem.value > 0) {
        focusedItem.value -= 1;
      }
    }

    function handleToggle() {
      if (modelValue.value) {
        handleOptionClick();
      } else {
        modelValue.value = true;
      }
    }

    // enter/space key counts as click and closes the menu
    function handleOptionClick(i?: number) {
      modelValue.value = false;
      emit('click:option', i ? props.items[i] : focusedItem.value);
    }

    // tab key / esc closes the menu without counting the click

    /**
     * If the menu is open, prevent tabbing, and close the menu to emulate default select functionality
     */
     function handleTab(e: Event) {
      if (modelValue.value) {
        e.preventDefault();
        modelValue.value = false;
        button.value?.focus();
      }
    }

    return {
      button,
      focusedItem,
      handleDocumentClick,
      handleDown,
      handleOptionClick,
      handleUp,
      handleTab,
      handleToggle,
      menu,
      modelValue,
      ChevronDownIcon,
    };
  },
});

</script>

<style lang="scss" scoped>
@import "@/styles/required";

.fd-menu-button {
  position: relative;

  &:deep(.fd-icon) {
    transition: transform $transition-timing;
  }

  &.fd-button--pressed:deep(.fd-icon) {
    transform: rotate(180deg);
  }
}
</style>
