<template>
  <div>
    <h1>Accordions</h1>
    <br>
    <div class="control-panel">
      <div>
        <fd-input-field
          v-model="headingText"
          id="heading"
          class="mb-4"
          label="Heading Text"
          small
        />
        <fd-input-field
          v-model="text"
          id="text"
          class="mb-4"
          label="Body Text"
          small
        />
        <fd-input-field
          v-model="bg"
          id="bg"
          class="mb-4"
          label="Background Color"
          small
        />
      </div>
      <div>
        <fd-group
          id="options"
          type="checkbox"
        >
          <template #label>
            Options
          </template>
          <fd-checkbox
            v-model="showIcon"
            id="show-icon"
            value="show-icon"
          >Show Icon</fd-checkbox>
          <fd-checkbox
            v-model="disabled"
            id="disabled"
            value="disabled"
          >Disabled</fd-checkbox>
        </fd-group>
      </div>
    </div>

    <div
      class="display-panel mb-4"
      :style="{ backgroundColor: bg }"
    >
      <p class="mb-4">
        Accordion clicked {{ counter }} times!
      </p>

      <fd-accordion
        id="accordion"
        :disabled="disabled"
        :icon="showIcon ? CubeTransparentIcon : undefined"
        open
        @click="handleClick"
      >
        <template #heading>
          {{ headingText }}
        </template>

        <p>{{ text }}</p>
      </fd-accordion>
      <fd-accordion
        id="accordion"
        :disabled="disabled"
        :icon="showIcon ? CubeTransparentIcon : undefined"
        @click="handleClick"
      >
        <template #heading>
          {{ headingText }}
        </template>

        <p>{{ text }}</p>
      </fd-accordion>
      <fd-accordion
        id="accordion"
        :disabled="disabled"
        :icon="showIcon ? CubeTransparentIcon : undefined"
        @click="handleClick"
      >
        <template #heading>
          {{ headingText }}
        </template>

        <p>{{ text }}</p>
      </fd-accordion>
    </div>

    <!-- add custom icon version -->
  </div>
</template>

<script lang="ts">
import { defineComponent, shallowRef } from 'vue';
import { CubeTransparentIcon } from '@heroicons/vue/24/solid'
import FdAccordion from '../../../src/components/Accordion';
import FdCheckbox from '../../../src/components/Checkbox';
import FdGroup from '../../../src/components/Group';
import { FdInputField } from '../../../src/components/Form';

export default defineComponent({
  name: 'AccordionPage',
  components: { FdAccordion, FdCheckbox, FdGroup, FdInputField },
  setup() {
    const text = shallowRef('Use this space for the content of the accordion. Make informed decisions about the nature of your audiences needs and the constraints of the device the accordion is presented on.');
    const headingText = shallowRef('Your accordion title - keep it short n\' sweet');
    const counter = shallowRef(0);
    const showIcon = shallowRef(false);
    const disabled = shallowRef(false);

    const bg = shallowRef('#fff');

    function handleClick(e) {
      counter.value += 1;
    }

    return {
      bg,
      counter,
      disabled,
      showIcon,
      handleClick,
      headingText,
      text,
      CubeTransparentIcon,
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
  display: flex;
  flex-direction: column;
}

.aux-text {
  font-size: $font-sm;
  color: rgb(var(--fora_neutral-8));
}
</style>
