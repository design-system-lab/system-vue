<template>
  <div>
    <h1>Home</h1>
    <br>
    <h4>Default Button</h4>
    <fd-button>Test button</fd-button>
    <br><br>

    <h4>Toggle Button</h4>
    <fd-button
      toggle
      v-model="testVal"
    >
      Test Button
    </fd-button>
    <br><br>

    <h4>Block Button</h4>
    <fd-button
      block
    >
      Test Button
    </fd-button>
    <br>

    <h4>Outlined Button</h4>
    <fd-button
      outlined
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