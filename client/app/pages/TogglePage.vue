<template>
  <div>
    <h1>Toggle Switch</h1>
    <br>
    <h4>Default toggle:</h4>
    <br>
    <fd-toggle v-model="val" id="example-val" label="Example toggle" />

    <br><br>

    <h4>Show Values</h4>
    <br>
    <fd-toggle v-model="val2" id="example-val-2" label="Example toggle" show-value />
    
    <br><br>

    <h4>Show Values and Hide Label</h4><br>
    <fd-toggle v-model="val3" id="example-val-3" label="Example toggle" show-value hide-label />
  </div>
</template>

<script lang="ts">
import { defineComponent, shallowRef } from 'vue';
import FdToggle from '../../../src/components/Toggle';

export default defineComponent({
  name: 'IconPage',
  components: { FdToggle },
  setup() {
    const val = shallowRef(false);
    const val2 = shallowRef(false);
    const val3 = shallowRef(false);

    return { val, val2, val3 };
  }
})
</script>