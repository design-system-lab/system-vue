<template>
  <div>
    <h1>Radios</h1>
    <br>
    <h4 class="mb-4">Default Radio</h4>
    
  </div>
</template>

<script lang="ts">
import { defineComponent, shallowRef } from 'vue';
import FdRadio from '../../../src/components/Radio';
import FdRadioGroup from '../../../src/components/RadioGroup';

export default defineComponent({
  name: 'RadioPage',
  components: { FdRadio, FdRadioGroup },
  setup () {
    return {  };
  },
})
</script>