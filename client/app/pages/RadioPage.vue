<template>
  <div>
    <h1>Radios</h1>
    <br>
    <h4 class="mt-8">Default Radio</h4>
    <fd-radio value="radio">This is a Radio</fd-radio>

    <h4 class="mt-8">Disabled Radio</h4>
    <fd-radio disabled value="disabled">This is a Radio</fd-radio>

    <h4 class="mt-8">Radio with Label</h4>
    <fd-radio label="Radio Label" value="label" />

    <h4 class="mt-8">Radios with Error</h4>
    <fd-radio :errors="['test']" value="error">This is a Radio</fd-radio>
    <fd-radio :errors="['test']" value="error" model-value="error">This is a Radio</fd-radio>

    <h4 class="mt-8">Readonly Radio</h4>
    <fd-radio readonly value="readonly">This is a Radio</fd-radio>


    <h4 class="mt-8 mb-2">Radio Group</h4>
    <fd-group
      v-model="val"
      id="radio-group"
      label="Radio Group Label"
      name="radio-group"
      type="radio"
    >
      <fd-radio value="radio-1">Radio 1</fd-radio>
      <fd-radio value="radio-2">Radio 2</fd-radio>
      <fd-radio value="radio-3">Radio 3</fd-radio>
    </fd-group>

    <h4 class="mt-8 mb-2">Radio Group Disabled</h4>
    <fd-group
      v-model="valDisabled"
      id="radio-group-disabled"
      disabled
      label="These are Disabled"
      name="radio-group-disabled"
      type="radio"
    >
      <fd-radio value="radio-3">Radio 1</fd-radio>
      <fd-radio value="radio-4">Radio 2</fd-radio>
      <fd-radio value="radio-5">Radio 3</fd-radio>
    </fd-group>

    <h4 class="mt-8 mb-2">Radio Group Error</h4>
    <fd-group
      v-model="valError"
      id="radio-group-error"
      :errors="['test']"
      :error-messages="{ test: 'This is an error, and a test' }"
      name="radio-group-disabled"
      type="radio"
    >
      <template #label>These are Erroneous</template>
      <fd-radio value="radio-3">Radio 1</fd-radio>
      <fd-radio value="radio-4">Radio 2</fd-radio>
      <fd-radio value="radio-5">Radio 3</fd-radio>
    </fd-group>

    <h4 class="mt-8 mb-2">Radio Group from Data</h4>
    <fd-group
      v-model="val2"
      id="radio-group-2"
      label="Radio Group Label"
      name="radio-group-2"
      :radios="radios"
      type="radio"
    />

    <h4 class="mt-8 mb-2">Disabled Radio Group from Data</h4>
    <fd-group
      v-model="val3"
      id="radio-group-3"
      disabled
      label="Radio Group Label"
      name="radio-group-3"
      :radios="radios"
      type="radio"
    />

    <h4 class="mt-8 mb-2">Error Radio Group from Data</h4>
    <fd-group
      v-model="val4"
      id="radio-group-4"
      :errors="['test']"
      :error-messages="{ test: 'This is an error, and a test' }"
      label="Radio Group Label"
      name="radio-group-4"
      :radios="radios"
      type="radio"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, shallowRef } from 'vue';
import FdRadio from '../../../src/components/Radio';
import FdGroup from '../../../src/components/Group';

export default defineComponent({
  name: 'RadioPage',
  components: { FdRadio, FdGroup },
  setup () {
    const val = shallowRef('');
    const val2 = shallowRef('');
    const val3 = shallowRef('');
    const val4 = shallowRef('');
    const valDisabled = shallowRef('');
    const valError = shallowRef('');
    const radios = [
      { value: 'radio-1', label: 'Pizza Pie' },
      { value: 'radio-2', label: 'Ice Cream' },
      { value: 'radio-3', label: 'Chocolate Pudding' },
    ];

    return { val, val2, val3, val4, valDisabled, valError, radios };
  },
})
</script>