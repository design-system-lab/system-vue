<template>
  <div>
    <h1>Toggle Switch</h1>
    <br>
    <div class="control-panel">
      <div>
        <fd-input-field
          v-model="label"
          id="label"
          class="mb-4"
          label="Label Text"
          small
        />
        <fd-input-field
          v-model="valueTrue"
          id="text"
          class="mb-4"
          label="True Value Label"
          small
        />
        <fd-input-field
          v-model="valueFalse"
          id="text"
          class="mb-4"
          label="False Value Label"
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
            v-model="hideLabel"
            id="hide-label"
            value="hide-label"
          >Hide Label</fd-checkbox>
          <fd-checkbox
            v-model="reverseLabel"
            id="reverse-label"
            value="reverse-label"
          >Reverse Label</fd-checkbox>
          <fd-checkbox
            v-model="showValue"
            id="show-value"
            value="show-value"
          >Show Value</fd-checkbox>
          <fd-checkbox
            v-model="error"
            id="error-state"
            value="error-state"
          >Error State</fd-checkbox>
        </fd-group>
      </div>
    </div>

    <div
      class="display-panel mb-4"
      :style="{ backgroundColor: bg }"
    >
      <fd-toggle
        v-model="modelValue"
        id="example-val"
        v-bind="{
          error,
          hideLabel,
          label,
          reverseLabel,
          reverseValue,
          showValue,
          valueTrue,
          valueFalse,
        }"
      />
    </div>

    <!-- add custom icon version -->
  </div>
</template>

<script lang="ts">
import { defineComponent, shallowRef } from 'vue';
import FdToggle from '../../../src/components/Toggle';
import FdCheckbox from '../../../src/components/Checkbox';
import FdGroup from '../../../src/components/Group';
import { FdInputField, FdSelect } from '../../../src/components/Form';
import { error } from 'console';

export default defineComponent({
  name: 'AlertPage',
  components: { FdToggle, FdCheckbox, FdGroup, FdInputField, FdSelect },
  setup() {
    const error = shallowRef(false);
    const hideLabel = shallowRef(false);
    const label = shallowRef('Example Label');
    const modelValue = shallowRef(false);
    const reverseLabel = shallowRef(false);
    const showValue = shallowRef(false);
    const valueFalse = shallowRef('Off');
    const valueTrue = shallowRef('On');

    const bg = shallowRef('#fff');

    return {
      bg,
      error,
      hideLabel,
      label,
      modelValue,
      reverseLabel,
      showValue,
      valueFalse,
      valueTrue
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
