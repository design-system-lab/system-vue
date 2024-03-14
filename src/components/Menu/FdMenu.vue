<template>
  <div
    ref="menu"
    class="fd-menu"
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
          'fd-menu__button--selected': modelValue.includes(item.value),
        }"
        @keydown.tab.prevent.stop="handleBlur"
        @click.stop.prevent="handleClick(item.value)"
      >
        <span>
          <slot :name="item.slotName">
            {{ item.text }}
          </slot>
        </span>
        <transition name="fade">
          <fd-icon
            v-if="modelValue.includes(item.value)"
            :icon="CheckIcon"
            :size="getIconSize('sm')"
          />
        </transition>
      </button>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, shallowRef, PropType } from 'vue';
import { CheckIcon } from '@heroicons/vue/20/solid'
import FdIcon from '../Icon';
import { SelectOption } from '../../types/forms';
import { onDocumentClick } from '../../utils/document';
import { getIconSize } from '../../utils/icons';

export default defineComponent({
  name: 'FdMenu',
  components: { FdIcon },
  props: {
    items: {
      type: Array as PropType<SelectOption[]>,
      required: true,
    },
    modelValue: {
      type: Array as PropType<string[]>,
      default: undefined,
    },
    focusItem: {
      type: Number,
      default: -1,
    }
  },
  setup(_, { emit }) {
    const menu = shallowRef<HTMLDivElement | null>(null);

    function handleBlur(e: Event) {
      console.log('blur occured');
      emit('blur', e);
    }

    function handleClick(val: string) {
      console.log('in here');
      emit('item:click', val);
    }

    onDocumentClick((e: Event) => {
      console.log('we failed')
      emit('document:click', e);
    });

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
  padding: 0.625rem 0;
  width: 100%;
  z-index: 10;

  &__button {
    align-items: center;
    background-color: transparent;
    border: 0;
    cursor: pointer;
    display: inline-flex;
    justify-content: space-between;
    width: 100%;
    height: 2.5rem;
    padding: 0 16px;
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
  }
}
</style>