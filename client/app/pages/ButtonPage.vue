<template>
  <div>
    <h1>Home</h1>
    <h4>Default Button</h4>
    <fd-button>Test button</fd-button>

    <h4>Toggle Button</h4>
    <fd-button
      toggle
      v-model="testVal"
    >
      Test Button
    </fd-button>
  </div>
</template>

<script lang="ts">
import { defineComponent, shallowRef } from 'vue';
import FdButton from '../../../src/components/Button';

export default defineComponent({
  components: { FdButton },
  setup () {
    const testVal = shallowRef(false);

    return { testVal };
  },
})
</script>