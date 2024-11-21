<template>
  <div>
    <h1>Chip</h1>
    <br>
    <div class="control-panel">
      <div>
        <fd-input-field
          v-model="text"
          id="text"
          class="mb-4"
          label="Alert Text"
          small
        />
        <fd-input-field
          v-model="headingText"
          id="heading"
          class="mb-4"
          label="Heading Text"
          small
        />
        <fd-input-field
          v-model="bg"
          id="bg"
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
            v-model="dismissible"
            id="dismissible"
            value="dismissible"
          >Dismissible</fd-checkbox>
          <fd-checkbox
            v-model="customIcon"
            id="custom-icon"
            value="custom-icon"
          >Custom Icon</fd-checkbox>
        </fd-group>
      </div>
    </div>

    <div
      class="display-panel mb-4"
      :style="{ backgroundColor: bg }"
    >
      <fd-alert :dismissible="dismissible" :icon="customIcon ? CubeTransparentIcon : undefined">
        <template #heading>{{ headingText }}</template>
        {{ text }}
      </fd-alert>
      <fd-alert :dismissible="dismissible" kind="neutral" :icon="customIcon ? CubeTransparentIcon : undefined">
        <template #heading>{{ headingText }}</template>
        {{ text }}
      </fd-alert>
      <fd-alert :dismissible="dismissible" kind="success" :icon="customIcon ? CubeTransparentIcon : undefined">
        <template #heading>{{ headingText }}</template>
        {{ text }}
      </fd-alert>
      <fd-alert :dismissible="dismissible" kind="warning" :icon="customIcon ? CubeTransparentIcon : undefined">
        <template #heading>{{ headingText }}</template>
        {{ text }}
      </fd-alert>
      <fd-alert :dismissible="dismissible" kind="danger" :icon="customIcon ? CubeTransparentIcon : undefined">
        <template #heading>{{ headingText }}</template>
        {{ text }}
      </fd-alert>
    </div>

    <!-- add custom icon version -->
  </div>
</template>

<script lang="ts">
import { defineComponent, shallowRef } from 'vue';
import { CubeTransparentIcon } from '@heroicons/vue/24/solid'
import FdAlert from '../../../src/components/Alert';
import FdCheckbox from '../../../src/components/Checkbox';
import FdGroup from '../../../src/components/Group';
import { FdInputField, FdSelect } from '../../../src/components/Form';

export default defineComponent({
  name: 'AlertPage',
  components: { FdAlert, FdCheckbox, FdGroup, FdInputField, FdSelect },
  setup() {
    const dismissible = shallowRef(false);
    const text = shallowRef('Use up to 200 characters to tell the user why they\'re receiving an alert and if they need to take action. Include a link if needed. The warning message can be generic or specific.');
    const headingText = shallowRef('Your warning message - keep it short n’ sweet');
    const counter = shallowRef(0);
    const dismissCount = shallowRef(0);
    const kind = shallowRef('info');
    const customIcon = shallowRef(false);

    const bg = shallowRef('#fff');

    function handleAlertClick(e) {
      counter.value += 1;
    }

    return {
      bg,
      counter,
      customIcon,
      dismissCount,
      dismissible,
      handleAlertClick,
      headingText,
      kind,
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
  gap: 1rem;
}

.aux-text {
  font-size: $font-sm;
  color: rgba(var(--fora_neutral-8), 1);
}
</style>
