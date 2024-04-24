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
        :model-value="chip.modelValue"
        :outlined="chip.outlined"
        :small="chip.small"
        :status="chip.status"
        :tag="chip.tag"
        :text="chip.text"
        :value="chip.value"
      >
        <slot :name="chip.slotName">
          {{ chip.text }}
        </slot>
      </fd-chip>
    </slot>
  </div>
</template>

<script lang="ts">
import { PropType, defineComponent } from 'vue';
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
  },
});
</script>
