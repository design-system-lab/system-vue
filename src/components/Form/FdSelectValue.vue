<template>
  <div
    ref="field"
    class="fd-select-value"
    :class="{
      'fd-select-value--chips': chips,
    }"
  >
    <span
      v-if="modelValue.length === 0"
      class="fd-select-value__placeholder"
    >
      <slot name="placeholder" />
    </span>
    <template v-else>
      <template
        v-if="csv || chips || !multiple"
        v-for="(item, i) in modelValue"
        :key="item.value"
      >
        <template v-if="!chips">
          <slot :name="item.slotName">
            {{ item.text }}{{ i < modelValue.length - 1 ? ', ' : '' }}
          </slot>
        </template>
        <template v-else>
          <fd-chip
            class="fd-select-value__chip"
            dismissible
            :interactive="chipsInteractive"
            size="sm"
            @click.stop="() => chipsInteractive && $emit('item:click', item)"
            @dismiss="$emit('item:dismiss', item)"
          >
            {{ item.text }}
          </fd-chip>
        </template>
      </template>
      <template v-else>
        <slot name="multiple-text" :count="modelValue.length">
          {{ t(modelValue.length > 1 ? 'field-value:multiple-text__plural' : 'field-value:multiple-text__singular', modelValue.length) }}
        </slot>
      </template>
    </template>
  </div>
</template>
<script lang="ts">
import { defineComponent, inject, PropType, shallowRef, watch } from 'vue';
import FdChip from '../Chip/FdChip.vue';
import { TranslationSupport } from '../../utils';
import { SelectOption } from '../../types';

export default defineComponent({
  name: 'FdSelectValue',
  components: { FdChip },
  props: {
    chips: {
      type: Boolean,
      default: false,
    },
    chipsInteractive: {
      type: Boolean,
      default: false,
    },
    csv: {
      type: Boolean,
      default: false,
    },
    modelValue: {
      type: Array as PropType<SelectOption[]>,
      default: () => [],
    },
    multiple: {
      type: Boolean,
      default: false,
    },
    /**
     * TODO: Build out the wrap functionality
     */
    wrap: {
      type: Boolean,
      default: true,
    },
  },
  setup() {
    const { t } = inject('i18n') as TranslationSupport;
    const field = shallowRef<HTMLDivElement | null>(null);

    return {
      field,
      t,
    };
  },
});
</script>

<style lang="scss" scoped>
.fd-select-value {
  pointer-events: none;
  width: 100%;

  &--chips {
    align-items: flex-start;
    display: flex;
    flex-wrap: wrap;
    justify-content: start;
    gap: 0.25rem;
    pointer-events: none;
  }

  &__placeholder {
    pointer-events: none;
  }

  &__chip {
    pointer-events: auto;
  }
}
</style>
