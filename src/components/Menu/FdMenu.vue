<template>
  <div
    ref="menu"
    class="fd-menu"
    @click.stop="$emit('menu-click')"
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
          'fd-menu__button--selected': item.value === modelValue,
        }"
        @keydown.tab.prevent.stop="handleBlur"
        @click.prevent="handleClick(item.value)"
      >
        <slot :name="item.slotName">
          {{ item.text }}
        </slot>
      </button>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, shallowRef, PropType } from 'vue';
import { SelectOption } from '../../types/forms';
import { onDocumentClick } from '../../utils/document';

export default defineComponent({
  name: 'FdMenu',
  props: {
    items: {
      type: Array as PropType<SelectOption[]>,
      required: true,
    },
    modelValue: {
      type: String,
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
      emit('item:click', val);
    }

    onDocumentClick((e: Event) => {
      emit('document-click', e);
    });

    return {
      handleBlur,
      handleClick,
      menu,
    }
  },
});

</script>
<style lang="scss" scoped>

</style>