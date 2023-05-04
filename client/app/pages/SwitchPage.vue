<template>
  <div>
    <h1>Switches</h1>
    <br>
    <h4>Default switch:</h4>
    <fd-switch v-model="val" id="example-val" label="Example switch" />

    <br><br>

    <h4>Show Values</h4>
    <fd-switch v-model="val2" id="example-val-2" label="Example switch" show-value />
    
    <br><br>

    <h4>Show Values and Hide Label</h4>
    <fd-switch v-model="val3" id="example-val-3" label="Example switch" show-value hide-label />
  </div>
</template>

<script lang="ts">
import { defineComponent, shallowRef } from 'vue';
import FdSwitch from '../../../src/components/Switch';

export default defineComponent({
  name: 'IconPage',
  components: { FdSwitch },
  setup() {
    const val = shallowRef(false);
    const val2 = shallowRef(false);
    const val3 = shallowRef(false);

    return { val, val2, val3 };
  }
})
</script>