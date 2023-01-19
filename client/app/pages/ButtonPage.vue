<template>
  <div>
    <h1>Home</h1>
    <br>
    <h4>Default Button</h4>
    <fd-button @click="updateTheme('dark')">
      Change Theme
    </fd-button>
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
      Change Language
    </fd-button>
  </div>
</template>

<script lang="ts">
import { defineComponent, shallowRef, inject } from 'vue';
import FdButton from '../../../src/components/Button';
import { ThemeSupport } from '../../../src/utils/theme';

export default defineComponent({
  components: { FdButton },
  setup () {
    const testVal = shallowRef(false);
    const { theme, updateTheme } = inject('theme') as ThemeSupport;

    return { testVal, theme, updateTheme };
  },
})
</script>