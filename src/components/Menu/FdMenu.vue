<template>
  <div
    ref="menu"
    class="fd-menu"
    :class="{
      'fd-menu--global': menuPlacement === 'global',
      'fd-menu--top': direction === 'top',
    }"
    :style="{
      ...(width ? [width] : []),
    }"
    @click.stop="$emit('menu:click')"
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
        @keydown.tab.prevent.stop="handleBlur"
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
</template>
<script lang="ts">
import { defineComponent, inject, shallowRef, PropType, onMounted, ShallowRef } from 'vue';
import { CheckIcon } from '@heroicons/vue/20/solid'
import FdIcon from '../Icon';
import { MenuPlacement } from '../../types/common';
import { SelectOption } from '../../types/forms';
import { onDocumentClick } from '../../utils/document';
import { onWindowEvent } from '../../utils/window';
import { getIconSize } from '../../utils/icons';

export default defineComponent({
  name: 'FdMenu',
  components: { FdIcon },
  props: {
    direction: {
      type: String as PropType<'top' | 'bottom'>,
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
    /**
     * TODO: build out size attr - how many items we show in the menu at one time
     */
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
    const menu = shallowRef<HTMLDivElement | null>(null);
    const app = inject<ShallowRef<HTMLDivElement | null>>('app');

    function handleBlur(e: Event) {
      emit('blur', e);
    }

    function handleClick(val: string) {
      emit('item:click', val);
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

        menu.value.style.width = props.width ? props.width : `${parentVals.width}px`;

        // check if there's enough space for the menu below the parent
        if (appVals.height - (parentVals.height + props.parent.offsetTop) > menuVals.height) {
          // there is space under the menu
          menu.value.style.top = `${props.parent.offsetTop + parentVals.height + 4}px`;
        } else {
          // there is no space under the menu, so show above
          menu.value.style.top = `${props.parent.offsetTop - menuVals.height - 4}px`;
        }

        menu.value.style.left = `${parentVals.x}px`;
      }
    }

    onDocumentClick((e?: Event) => {
      emit('document:click', e);
    });

    onMounted(() => {
      yoinkGlobalMenu();
      placeGlobalMenu();
    });

    /**
     * TODO: change menu size/placement on window resizing
     */
    onWindowEvent('resize', placeGlobalMenu);

    return {
      getIconSize,
      handleBlur,
      handleClick,
      menu,
      CheckIcon,
    }
  },
});

</script>
<style lang="scss" scoped>
@import "@/styles/required";

.fd-menu {
  background-color: rgba(var(--fora_white), 1);
  border-radius: $border-radius;
  box-shadow: $shadow-md;
  left: 0;
  width: 100%;
  padding: 0.125rem 0;
  position: absolute;
  top: calc(100% + 0.25rem);
  z-index: 10;

  &__button {
    align-items: center;
    background-color: transparent;
    border: 0;
    cursor: pointer;
    display: inline-flex;
    font-size: $font-sm;
    justify-content: space-between;
    width: 100%;
    min-height: 2.5rem;
    padding: $form-field_padding-y $form-field_padding-x;
    transition: $transition-timing color, $transition-timing background-color, $transition-timing box-shadow;

    &:hover {
      background-color: rgba(var(--fora_neutral-3), 1);
    }

    &--focused {
      @include focus-primary-inset-styles;
    }

    &--selected {
      color: rgba(var(--fora_primary-8), 1);
    }

    &--small {
      padding-left: $form-field_sm_padding-y $form-field_sm_padding-x;
    }

    &-icon,
    &-check {
      flex: 0 0 auto;
    }

    &-icon {
      color: rgba(var(--fora_neutral-7), 1);
      margin-right: 0.625rem;
    }

    &-check {
      margin-left: 0.625rem;
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
    top: auto;
    bottom: calc(100% + 0.25rem);
  }
}
</style>