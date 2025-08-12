<script lang="ts" setup>
import { inject, shallowRef, onMounted, ShallowRef } from 'vue';
import { CheckIcon } from '@heroicons/vue/20/solid'
import FdCheckboxBase from '../Checkbox/FdCheckboxBase.vue';
import FdIcon from '../Icon';
import { getIconSize, onDocumentClick, onWindowEvent } from '../../utils';
import type { MenuProps } from '../../types';

/**
 * Menu
 * 
 * @param {string} alignment - Whether the menu should be anchored to the left or right edge of the parent
 * @param {boolean} checkboxEnd - Whether the checkbox should be at the end of the menu item
 * @param {MenuDirection} direction - To open the menu up or down by default
 * @param {number} focusItem - The currently focused item index
 * @param {SelectOption[]} items - Array of menu items
 * @param {MenuPlacement} menuPlacement - Whether the menu should open inline ('attached') or above all page content ('global')
 * @param {string} minWidth - Valid CSS width to be used as the min-width of the menu, defaults to 148px
 * @param {string[]} modelValue - Array of values of currently selected item(s)
 * @param {boolean} multiple - Whether the menu should allow multiple selections
 * @param {HTMLElement} parent - The parent element of the menu, used for placement
 * @param {number} size - Number of menu items to show by default before scrolling
 * @param {boolean} small - Whether the menu should be small
 * @param {string} width - Valid CSS width to be used for the menu
 */

const props = withDefaults(defineProps<MenuProps>(), {
  alignment: 'left',
  checkboxEnd: false,
  direction: 'bottom',
  focusItem: -1,
  menuPlacement: 'attached',
  minWidth: '148px',
  modelValue: undefined,
  multiple: false,
  showFocus: false,
  size: 7,
  small: false,
  width: undefined,
});

const emit = defineEmits<{
  (e: 'click:document', val?: Event): void;
  (e: 'click:item', val: string): void;
  (e: 'click:menu'): void;
  (e: 'tab', val: Event): void;
}>();

  
const app = inject<ShallowRef<HTMLDivElement | null>>('app');
const calculatedWidth = shallowRef(props.width ? props.width : '100%');
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
  emit('click:item', val);
}

/**
 * If we're using width, make sure the menu doesn't run off the screen
 */
  async function checkWidthSpacing() {
  if (props.parent && menu.value && props.width && app?.value && props.menuPlacement !== 'global') {
    const rightSpace = (app.value.clientWidth - props.parent.getBoundingClientRect().x) - menu.value.offsetWidth;

    if (rightSpace < 16) {
      menu.value.style.left = 'auto';
    } else {
      menu.value.style.left = '';
      menu.value.style.right = '';
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

    const menuWidth = props.width ? menu.value?.offsetWidth : parentVals.width;

    calculatedWidth.value = `${menuWidth}px`;

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

    if (props.alignment === 'right') {
      if ((menuWidth + 16) < (parentVals.x +  parentVals.width)) {
        // enough space to the left
        menu.value.style.right = `${appVals.width - (parentVals.x + parentVals.width)}px`;
        menu.value.style.left = 'auto';
      } else {
        menu.value.style.left = '16px';
        menu.value.style.right = 'auto';
      }
    } else {
      if ((menuWidth + 16) < (appVals.width - parentVals.x)) {
        // enough space to the right
        menu.value.style.left = `${parentVals.x}px`;
        menu.value.style.right = 'auto';
      } else {
        menu.value.style.right = '16px';
        menu.value.style.left = 'auto';
      }
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
  emit('click:document', e);
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
</script>

<template>
  <div
    ref="menu"
    class="fd-menu"
    :class="[
      `fd-menu--${alignment}`,
      {
        'fd-menu--global': menuPlacement === 'global',
        'fd-menu--top': direction === 'top',
      }
    ]"
    :style="{
      minWidth: minWidth,
      width: calculatedWidth,
    }"
    @click.stop="$emit('click:menu')"
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
            'fd-menu__button--focused': (showFocus && i === focusItem),
            'fd-menu__button--small': small,
            'fd-menu__button--selected': modelValue?.includes(item.value),
          }"
          :aria-selected="modelValue?.includes(item.value)"
          :data-testid="item.value"
          role="option"
          tabindex="0"
          @keydown.tab.prevent.stop="handleTab"
          @click.stop.prevent="handleClick(item.value)"
        >
          <fd-checkbox-base
            v-if="multiple && !checkboxEnd"
            :id="`checkbox--${item.value}`"
            class="fd-menu__checkbox fd-menu__checkbox--start"
            small
            :model-value="modelValue?.includes(item.value)"
            @update:modelValue="handleClick(item.value)"
          />
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
          <fd-checkbox-base
            v-if="multiple && checkboxEnd"
            :id="`checkbox--${item.value}`"
            class="fd-menu__checkbox fd-menu__checkbox--end"
            small
            :model-value="modelValue?.includes(item.value)"
            @update:modelValue="handleClick(item.value)"
          />
          <transition name="fade">
            <fd-icon
              v-if="!multiple && modelValue?.includes(item.value)"
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

<style lang="scss" scoped>
@import "@/styles/required";

.fd-menu {
  background-color: rgb(var(--fora_menu_bg));
  border-radius: $menu_border-radius;
  box-shadow: $menu_box-shadow;
  left: 0;
  overflow: hidden;
  padding: $menu_padding;
  position: absolute;
  top: $menu_top;
  width: 100%;
  z-index: $menu_z-index;

  &--right {
    left: auto;
    right: 0;
  }

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
      background-color: rgb(var(--fora_menu_button_bg--hover));

      .fd-menu__checkbox {
        border-color: rgb(var(--fora_checkbox-base_border-color--hover));
      }
    }

    &--focused {
      @include focus-primary-inset-styles;
    }

    &--selected {
      color: rgb(var(--fora_menu_button_color--selected));
    }

    &--small {
      padding-left: $form-field_sm_padding-y $form-field_sm_padding-x;
    }

    &-icon,
    &-check {
      flex: 0 0 auto;
    }

    &-icon {
      color: rgb(var(--fora_menu_button-icon_color));
      margin-right: $menu_button-icon_margin-right;
    }

    &-check {
      color: rgb(var(--fora_menu_button-check_color));
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

  &__checkbox {
    pointer-events: none;

    &--start {
      margin-right: 0.5rem;
    }
  }
}
</style>