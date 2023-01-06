<template>
  <div>
    <h1>Home</h1>
    <fd-button>Test button</fd-button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import FdButton from '../../../src/components/Button';

export default defineComponent({
  components: { FdButton },
})
</script>