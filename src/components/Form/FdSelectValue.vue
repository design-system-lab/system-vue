<template>
  <div
    ref="field"
    class="fd-select-value"
  >
    <span
      v-if="modelValue.length === 0"
      class="fd-select-value__placeholder"
    >
      <slot name="placeholder" />
    </span>
    <span
      v-if="modelValue.length !== 0 && (csv || chips || !multiple)"
      class="fd-select-value__text"
      :class="{
        'fd-select-value__text--chips': chips,
      }"
    >
      <template
        v-for="(item, i) in modelValue"
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
            :key="item.value"
            :interactive="chipsInteractive"
            size="sm"
            @click.stop="() => chipsInteractive && $emit('item:click', item)"
            @dismiss="$emit('item:dismiss', item)"
          >
            {{ item.text }}
          </fd-chip>
        </template>
      </template>
    </span>
    <span
      v-if="modelValue.length !== 0 && (!csv && !chips && multiple)"
      class="fd-select-value__text"
    >
      <slot
        name="multiple-text"
        :count="modelValue.length"
      >
        {{ t(modelValue.length > 1 ? 'field-value:multiple-text__plural' : 'field-value:multiple-text__singular', modelValue.length) }}
      </slot>
    </span>
  </div>
</template>
<script lang="ts">
import { defineComponent, inject, PropType, shallowRef } from 'vue';
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

  &__placeholder {
    pointer-events: none;
  }

  &__chip {
    pointer-events: auto;
  }

  &__text {
    pointer-events: none;

    &--chips {
      align-items: flex-start;
      display: flex;
      flex-wrap: wrap;
      justify-content: start;
      gap: 0.25rem;
      pointer-events: none;
    }
  }
}
</style>
