<template>
  <div>
    <h1>Split Button</h1>
    <br>
    <div class="control-panel">
      
    </div>
    <div
      class="display-panel"
      :style="{ backgroundColor: bg }"
    >
      <h5 class="mb-4">Chips as Multi-Select</h5>
      <fd-group
        v-model="multiSelectChips"
        class="mb-4"
        type="button"
      >
        <fd-button>Primary Action</fd-button>
        <fd-button icon>
          <fd-icon :icon="ChevronDownIcon" />
          <fd-menu
            :items="[
              {
                text: 'Option 01',
                value: 'option-1',
              },
              {
                text: 'Option 02',
                value: 'option-2',
              },
              {
                text: 'Option 03',
                value: 'option-3',
              },
            ]"
          />
        </fd-button>
      </fd-group>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, shallowRef } from 'vue';
import { ChevronDownIcon } from '@heroicons/vue/20/solid'
import FdButton from '../../../src/components/Button/FdButton.vue';
import FdCheckbox from '../../../src/components/Checkbox';
import FdChip from '../../../src/components/Chip';
import FdGroup from '../../../src/components/Group';
import FdIcon from '../../../src/components/Icon/FdIcon.vue';
import { FdInputField, FdSelect } from '../../../src/components/Form';
import FdMenu from '../../../src/components/Menu/FdMenu.vue';

export default defineComponent({
  name: 'ChipPage',
  components: { FdButton, FdCheckbox, FdChip, FdGroup, FdIcon, FdInputField, FdMenu, FdSelect },
  setup() {
    const dismissible = shallowRef(false);
    const showIcon = shallowRef(false);
    const interactive = shallowRef(false);
    const size = shallowRef(['lg']);
    const showTag = shallowRef(false);
    const tagType = shallowRef('span');
    const bg = shallowRef('#fff');
    const text = shallowRef('Chip Text');
    const counter = shallowRef(0);
    const dismissCount = shallowRef(0);
    const val = shallowRef(false);
    const val2 = shallowRef(false);
    const val3 = shallowRef(false);
    const radioChips = shallowRef<string>('');
    const multiSelectChips = shallowRef<string[]>([]);
    const progMultiChips = shallowRef<string[]>([]);
    const progRadioChips = shallowRef<string>('');

    const chips = [
      {
        text: 'Option 01',
        interactive: true,
        value: 'option-1',
      },
      {
        text: 'Option 02',
        interactive: true,
        value: 'option-2',
      },
      {
        text: 'Option 03',
        interactive: true,
        value: 'option-3',
      },
      {
        text: 'Option 04',
        interactive: true,
        value: 'option-4',
      },
    ];

    function handleChipClick(e) {
      counter.value += 1;
    }

    return {
      bg,
      chips,
      counter,
      dismissCount,
      dismissible,
      handleChipClick,
      interactive,
      multiSelectChips,
      progMultiChips,
      progRadioChips,
      radioChips,
      showIcon,
      showTag,
      size,
      tagType,
      text,
      val,
      val2,
      val3,
      ChevronDownIcon,
    };
  }
})
</script>

<style lang="scss" scoped>
@import "@/styles/required";

.control-panel {
  display: flex;
  gap: 32px;
  padding: 1.5rem;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
}

.display-panel {
  margin-top: 0.5rem;
  padding: 1.5rem;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
}

.aux-text {
  font-size: $font-sm;
  color: rgba(var(--fora_neutral-8), 1);
}
</style>
