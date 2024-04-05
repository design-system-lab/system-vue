<template>
  <div
    ref="menu"
    class="fd-menu"
    :class="{
      'fd-menu--global': menuPlacement === 'global',
      'fd-menu--top': direction === 'top',
    }"
    :style="{
      width: width ? width : '100%',
    }"
    @click.stop="$emit('menu:click')"
  >
    <div
      ref="itemContainer"
      class="fd-menu__items"
    >
      <div
        v-for="(item, i) of items"
        :key="item.text || item.slotName"
        class="fd-menu__item"
      >
        <button
          class="fd-menu__button"
          :class="{
            'fd-menu__button--focused': i === focusItem,
            'fd-menu__button--small': small,
            'fd-menu__button--selected': modelValue?.includes(item.value),
          }"
          :data-testid="item.value"
          @keydown.tab.prevent.stop="handleTab"
          @click.stop.prevent="handleClick(item.value)"
        >
          <fd-icon
            v-if="item.icon"
            class="fd-menu__button-icon"
            :icon="item.icon"
            :size="getIconSize('sm')"
          />
          <span class="fd-menu__button-text">
            <slot :name="item.slotName">
              {{ item.text }}
            </slot>
          </span>
          <transition name="fade">
            <fd-icon
              v-if="modelValue?.includes(item.value)"
              class="fd-menu__button-check"
              :icon="CheckIcon"
              :size="getIconSize('sm')"
            />
          </transition>
        </button>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, inject, shallowRef, PropType, onMounted, ShallowRef } from 'vue';
import { CheckIcon } from '@heroicons/vue/20/solid'
import FdIcon from '../Icon';
import { onDocumentClick } from '../../utils/document';
import { getIconSize } from '../../utils/icons';
import { onWindowEvent } from '../../utils/window';
import { MenuDirection, MenuPlacement } from '../../types/common';
import { SelectOption } from '../../types/forms';

/**
 * Menu
 * 
 * @param {MenuDirection} direction - To open the menu up or down by default
 * @param {number} focusItem - The currently focused item index
 * @param {SelectOption[]} - Array of menu items
 * @param {MenuPlacement} - Whether the menu should open inline ('attached') or above all page content ('global')
 * @param {string[]} - Array of values of currently selected item(s)
 * @param {HTMLElement} - The parent element of the menu, used for placement
 * @param {number} size - Number of menu items to show by default before scrolling
 * @param {boolean} small - Whether the menu should be small
 * @param {string} width - Valid CSS width to be used for the menu
 */
export default defineComponent({
  name: 'FdMenu',
  components: { FdIcon },
  props: {
    /**
     * TODO: Should allow left/right attach point as well
     */
    direction: {
      type: String as PropType<MenuDirection>,
      default: 'bottom',
    },
    focusItem: {
      type: Number,
      default: -1,
    },
    items: {
      type: Array as PropType<SelectOption[]>,
      required: true,
    },
    menuPlacement: {
      type: String as PropType<MenuPlacement>,
      default: 'attached',
    },
    modelValue: {
      type: Array as PropType<string[]>,
      default: undefined,
    },
    parent: {
      type: Object as PropType<HTMLElement | null>,
      required: true,
    },
    size: {
      type: Number,
      default: 7,
    },
    small: {
      type: Boolean,
      default: false,
    },
    width: {
      type: String,
      default: undefined,
    }
  },
  setup(props, { emit }) {
    const app = inject<ShallowRef<HTMLDivElement | null>>('app');
    const globalSpace = shallowRef<boolean | null>(null);
    const itemContainer = shallowRef<HTMLDivElement | null>(null);
    const menu = shallowRef<HTMLDivElement | null>(null);
    
    /**
     * Handle tab event in the off chance it occurs
     */
    function handleTab(e: Event) {
      emit('tab', e);
    }

    /**
     * Handle menu item click
     */
    function handleClick(val: string) {
      emit('item:click', val);
    }

    /**
     * If we're using width, make sure the menu doesn't run off the screen
     */
     async function checkWidthSpacing() {
      if (props.parent && menu.value && props.width && app?.value) {
        const rightSpace = (app.value.clientWidth - props.parent.getBoundingClientRect().x) - menu.value.offsetWidth;
        const parentRightOffset = app.value.clientWidth - (props.parent?.getBoundingClientRect().x + props.parent?.offsetWidth);

        if (rightSpace < 16) {
          menu.value.style.left = 'auto';
          menu.value.style.right = (props.menuPlacement === 'global') ? `${parentRightOffset}px` : '0';
        } else {
          menu.value.style.left = '';
          menu.value.style.right = '';
        }

        if (props.menuPlacement === 'global' && !menu.value.style.left) {
          menu.value.style.left = `${props.parent.getBoundingClientRect().x}px`;
        }
      }
    }

    /**
     * Moves the menu to the global context if it should be global
     */
    function yoinkGlobalMenu() {
      if (props.menuPlacement === 'global' && app?.value && menu?.value && props.parent) {
        app.value.appendChild(menu.value);
      }
    }

    /**
     * Places the menu where it should go if it should be global
     */
    function placeGlobalMenu() {
      if (props.menuPlacement === 'global' && app?.value && menu?.value && props.parent) {
        const appVals = app.value.getBoundingClientRect();
        const menuVals = menu.value.getBoundingClientRect();
        const parentVals = props.parent.getBoundingClientRect();
        const pageTop = window.scrollY + parentVals.y;

        menu.value.style.width = props.width ? props.width : `${parentVals.width}px`;

        // check if there's enough space for the menu below the parent
        if (
          props.direction === 'bottom' &&
            appVals.height - (parentVals.height + pageTop) > menuVals.height
        ) {
          // there is space under the menu
          if (globalSpace.value === null || !globalSpace.value) {
            menu.value.style.top = `${pageTop + parentVals.height + 4}px`;
          }
        } else if (props.direction === 'bottom') {
          // set to 'top' because there is no space under the menu, so show above
          if (globalSpace.value === null || globalSpace.value) {
            menu.value.style.top = `${pageTop - menuVals.height - 4}px`;
          }
        }

        if (
          props.direction === 'top' &&
            menuVals.height < window.scrollY + parentVals.y
        ) {
          // there is space above the menu
          if (globalSpace.value === null || !globalSpace.value) {
            menu.value.style.top = `${pageTop - menuVals.height - 4}px`;
          }
        } else if (props.direction === 'top') {
          // set to 'bottom' because there is not space above the menu
          menu.value.style.top = `${pageTop + parentVals.height + 4}px`;
        }

        if (!menu.value.style.left) {
          menu.value.style.left = `${parentVals.x}px`;
        }
      }
    }

    /**
     * Set the height of the menu based on the size
     */
    function setMenuSize() {
      if (menu.value && itemContainer.value) {
        const size = Math.min(props.size, props.items.length);
        let itemsHeight = 0;
        
        for (let i = 0; i < size; i += 1) {
          // @ts-ignore: This is safe because we check for the existance of menu.value above
          itemsHeight += menu.value.querySelector(`.fd-menu__item:nth-child(${i + 1})`).offsetHeight;
        }

        itemContainer.value.style.maxHeight = `${itemsHeight}px`;
      }
    }

    onDocumentClick((e?: Event) => {
      emit('document:click', e);
    });

    onMounted(() => {
      yoinkGlobalMenu();
      placeGlobalMenu();
      checkWidthSpacing();
      setMenuSize();
    });

    onWindowEvent('resize', () => {
      placeGlobalMenu();
      checkWidthSpacing();
    });

    return {
      getIconSize,
      handleClick,
      handleTab,
      itemContainer,
      menu,
      CheckIcon,
    }
  },
});

</script>
<style lang="scss" scoped>
@import "@/styles/required";

.fd-menu {
  background-color: rgba(var(--fora_menu_bg));
  border-radius: $menu_border-radius;
  box-shadow: $menu_box-shadow;
  left: 0;
  overflow: hidden;
  padding: $menu_padding;
  position: absolute;
  top: $menu_top;
  width: 100%;
  z-index: $menu_z-index;

  &__items {
    overflow: auto;
  }

  &__button {
    align-items: center;
    background-color: $menu_button_bg;
    border: $menu_button_border;
    cursor: pointer;
    display: inline-flex;
    font-size: $menu_button_size;
    justify-content: space-between;
    line-height: $menu_button_line-height;
    min-height: $menu_button_min-height;
    padding: $form-field_padding-y $form-field_padding-x;
    transition: $transition-timing color, $transition-timing background-color, $transition-timing box-shadow;
    width: 100%;

    &:hover {
      background-color: rgba(var(--fora_menu_button_bg--hover));
    }

    &--focused {
      @include focus-primary-inset-styles;
    }

    &--selected {
      color: rgba(var(--fora_menu_button_color--selected));
    }

    &--small {
      padding-left: $form-field_sm_padding-y $form-field_sm_padding-x;
    }

    &-icon,
    &-check {
      flex: 0 0 auto;
    }

    &-icon {
      color: rgba(var(--fora_menu_button-icon_color));
      margin-right: $menu_button-icon_margin-right;
    }

    &-check {
      color: rgba(var(--fora_menu_button-check_color));
      margin-left: $menu_button-check_margin-left;
    }

    &-text {
      text-align: left;
      width: 100%;
    }
  }

  &--global {
    width: auto;
  }

  &--top {
    bottom: $menu_bottom;
    top: auto;
  }
}
</style>