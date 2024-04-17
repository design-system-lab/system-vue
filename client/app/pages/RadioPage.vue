<template>
  <div>
    <h1>Radios</h1>
    <br>
    <h4 class="mt-4">Default Radio</h4>
    <fd-radio value="radio">This is a Radio</fd-radio>

    <h4 class="mt-4">Disabled Radio</h4>
    <fd-radio disabled value="disabled">This is a Radio</fd-radio>

    <h4 class="mt-4">Radio with Label</h4>
    <fd-radio label="Radio Label" value="label" />

    <h4 class="mt-4">Radio with Error</h4>
    <fd-radio :errors="['test']" value="error">This is a Radio</fd-radio>

    <h4 class="mt-4">Readonly Radio</h4>
    <fd-radio readonly value="readonly">This is a Radio</fd-radio>


    <h4 class="mt-4">Radio Group</h4>
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

    return { val };
  },
})
</script>