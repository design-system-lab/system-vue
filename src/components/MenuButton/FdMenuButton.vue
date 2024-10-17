<template>
  <fd-button
    ref="button"
    v-model="modelValue"
    v-bind="{ icon }"
    class="fd-menu-button"
    :append-icon="!icon ? ChevronDownIcon : undefined"
    toggle
    @click="handleMenuClick"
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
      :show-focus="showFocus"
      @click:document="handleDocumentClick"
      @click:item="handleOptionClick"
    />
  </fd-button>
</template>

<script lang="ts">
import { defineComponent, ref, shallowRef, watch, PropType, ComponentPublicInstance } from 'vue';
import { ChevronDownIcon } from '@heroicons/vue/20/solid'
import FdButton from '../Button/FdButton.vue';
import FdIcon from '../Icon/FdIcon.vue';
import FdMenu from '../Menu/FdMenu.vue';
import { MenuDirection, NodeOrNull, SelectOption, Icon } from '../../types';

/**
 * Menu button component
 * 
 * @param {string} alignment - Alignment of the menu (left or right)
 * @param {string} direction - Direction of the menu (top or bottom)
 * @param {boolean} icon - Whether the button should only display the chevron icon
 * @param {SelectOption[]} items - The items to display in the menu
 * @param {Icon} prependIcon - The icon to prepend to the button
 */

export default defineComponent({
  name: 'FdMenuButton',
  components: { FdButton, FdIcon, FdMenu },
  props: {
    alignment: {
      type: String as PropType<'left' | 'right'>,
      default: 'right',
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
    },
    prependIcon: {
      type: Function as PropType<Icon>,
      default: undefined,
    },
  },
  emits: ['click:menu', 'click:option'],
  setup(props, { emit }) {
    const button = ref<typeof FdButton>();
    const focusedItem = ref(0);
    const menu = shallowRef<ComponentPublicInstance | null>(null);
    const modelValue = shallowRef(false);
    const showFocus = shallowRef(false);

    function handleMenuClick() {
      emit('click:menu');
    }

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

    /**
     * On enter or space when the button is focused, toggle the menu
     */
    function handleToggle() {
      if (modelValue.value) {
        handleOptionClick();
      } else {
        modelValue.value = true;
      }
    }

    /**
     * Close the menu and emit the option clicked
     * @param val - The value of the option clicked
     */
    function handleOptionClick(val?: string) {
      modelValue.value = false;
      emit('click:option', val ? val : props.items[focusedItem.value].value);
    }

    /**
     * If the menu is open, prevent tabbing, and close the menu to emulate default select functionality
     */
    function handleTab(e: Event) {
      if (modelValue.value) {
        e.preventDefault();
        modelValue.value = false;
        button.value?.$el.focus();
      }
    }

    /**
     * When the model value changes, check if the button has visible focus and set the showFocus value
     */
    watch(modelValue, () => {
      showFocus.value = (button.value?.$el as HTMLElement).matches(':focus-visible');
    });

    return {
      button,
      focusedItem,
      handleDocumentClick,
      handleDown,
      handleMenuClick,
      handleOptionClick,
      handleUp,
      handleTab,
      handleToggle,
      menu,
      modelValue,
      showFocus,
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
