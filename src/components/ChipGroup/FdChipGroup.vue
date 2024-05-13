<template>
  <div class="fd-chip-group">
    <slot>
      <fd-chip
        v-for="(chip, i) in chips"
        :key="i"
        :avatar-img="chip.avatarImg"
        :dismissible="chip.dismissible"
        :icon="chip.icon"
        :interactive="chip.interactive"
        :model-value="modelValue"
        :outlined="chip.outlined"
        :small="chip.small"
        :status="chip.status"
        :tag="chip.tag"
        :text="chip.text"
        :value="chip.value"
        @dismiss="$emit('dismiss', i)"
        @update:modelValue="($event) => $emit('update:modelValue', $event)"
      >
        <slot :name="chip.slotName">
          {{ chip.text }}
        </slot>
      </fd-chip>
    </slot>
  </div>
</template>

<script lang="ts">
import { PropType, defineComponent, provide, shallowRef, watch } from 'vue';
import FdChip from '../Chip/FdChip.vue';
import { ChipGroupChip } from '../../types';

export default defineComponent({
  name: 'FdChipGroup',
  components: { FdChip },
  props: {
    chips: {
      type: Array as PropType<ChipGroupChip[]>,
      default: () => [],
    },
    modelValue: {
      type: [String, Array] as PropType<string | string[]>,
      default: null,
    },
  },

  setup(props, { emit }) {
    const currentVal = shallowRef(props.modelValue);

    function handleModelValue(value: string | string[]) {
      emit('update:modelValue', value);
    }

    provide('groupModelValue', currentVal);
    provide('groupHandleModelValue', handleModelValue);

    watch(
      () => props.modelValue,
      (val) => {
        currentVal.value = val;
      },
    );
  },
});
</script>

<style lang="scss" scoped>
.fd-chip-group {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}
</style>
