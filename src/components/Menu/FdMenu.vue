<template>
  <div
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
            v-if="modelValue.includes(item.value)"
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
    focusItem: {
      type: Number,
      default: -1,
    },
    items: {
      type: Array as PropType<SelectOption[]>,
      required: true,
    },
    modelValue: {
      type: Array as PropType<string[]>,
      default: undefined,
    },
    size: {
      type: Number,
      default: 7,
    },
  },
  setup(_, { emit }) {
    function handleBlur(e: Event) {
      emit('blur', e);
    }

    function handleClick(val: string) {
      emit('item:click', val);
    }

    onDocumentClick((e: Event) => {
      emit('document:click', e);
    });

    return {
      getIconSize,
      handleBlur,
      handleClick,
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
    font-size: $font-sm;
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
}
</style>