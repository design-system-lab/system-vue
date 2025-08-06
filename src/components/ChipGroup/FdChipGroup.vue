<script lang="ts" setup>
import { provide, shallowRef, watch } from 'vue';
import FdChip from '../Chip/FdChip.vue';
import type { ChipGroupProps } from '../../types';

const props = withDefaults(defineProps<ChipGroupProps>(), {
  chips: () => [],
});

const emit = defineEmits<{
  (e: 'dismiss', index: number): void;
  (e: 'update:modelValue', value: string | string[]): void;
}>();

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
</script>

<template>
  <div class="fd-chip-group">
    <slot>
      <fd-chip
        v-for="(chip, i) in chips"
        :key="i"
        :dismissible="chip.dismissible"
        :icon="chip.icon"
        :interactive="chip.interactive"
        :size="size"
        :tag="chip.tag"
        :text="chip.text"
        :value="chip.value"
        @dismiss="$emit('dismiss', i)"
      >
        <template
          v-if="chip.iconSlotName"
          #icon
        >
          <slot :name="chip.iconSlotName" />
        </template>
        <slot :name="chip.slotName">
          {{ chip.text }}
        </slot>
      </fd-chip>
    </slot>
  </div>
</template>

<style lang="scss" scoped>
.fd-chip-group {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}
</style>
