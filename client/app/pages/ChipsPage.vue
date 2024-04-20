<template>
  <div>
    <h1>Chip</h1>
    <br>
    <h4>Default Chip</h4>
    <br>
    <fd-chip>Chip Label</fd-chip>

  </div>
</template>

<script lang="ts">
import { defineComponent, shallowRef, ref } from 'vue';
import FdChip from '../../../src/components/Chip';
import FdGroup from '../../../src/components/Group';

export default defineComponent({
  name: 'ChipPage',
  components: { FdChip, FdGroup },
  setup() {

    return {
      // something here
    };
  }
})
</script>