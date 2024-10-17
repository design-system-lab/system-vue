<template>
  <div>
    <h1>Menu Button</h1>
    <br>
    <div class="control-panel">
      
    </div>
    <div
      class="display-panel"
    >
      <h5 class="mb-4">Chips as Multi-Select</h5>
      <fd-menu-button
        class="mr-4"
        :items="[
          {
            'text': 'Option 01',
            'value': 'option-1',
          },
          {
            'text': 'Option 02',
            'value': 'option-2',
          },
          {
            'text': 'Option 03',
            'value': 'option-3',
          },
        ]"
      >
        Text goes here
      </fd-menu-button>

      <fd-menu-button icon
        :items="[
          {
            'text': 'Option 01',
            'value': 'option-1',
          },
          {
            'text': 'Option 02',
            'value': 'option-2',
          },
          {
            'text': 'Option 03',
            'value': 'option-3',
          },
        ]"
        @click:menu="console.log('menu clicked')"
        @click:option="e => console.log('option clicked', e)"
      />
      <br>
      <br>

      <h5 class="mb-4">Split Button</h5>
      <fd-group type="button">
        <fd-button>Option Prime</fd-button>
        <fd-menu-button
          icon
          :items="[
            {
              'text': 'Option 01',
              'value': 'option-1',
            },
            {
              'text': 'Option 02',
              'value': 'option-2',
            },
            {
              'text': 'Option 03',
              'value': 'option-3',
            },
          ]"
        />
      </fd-group>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, shallowRef } from 'vue';
import FdButton from '../../../src/components/Button/FdButton.vue';
import FdMenuButton from '../../../src/components/MenuButton';
import FdGroup from '../../../src/components/Group/FdGroup.vue';

export default defineComponent({
  name: 'ChipPage',
  components: { FdMenuButton, FdGroup, FdButton },
  setup() {

    return {
      
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
