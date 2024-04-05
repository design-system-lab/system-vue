<template>
  <div>
    <h1>Checkbox</h1>
    <br>
    <h4>Default toggle:</h4>
    <br>
    <fd-checkbox v-model="val" id="example-val" label="Example checkbox" />

    <br><br>

    <h4>Show Values</h4>
    <br>
    <fd-checkbox v-model="val2" id="example-val-2" label="Another checkbox" />
    
    <br><br>

    <h4>Show Values and Hide Label</h4><br>
    <fd-checkbox v-model="val3" id="example-val-3" label="Checkbox Number Tres" />
  </div>
</template>

<script lang="ts">
import { defineComponent, shallowRef } from 'vue';
import FdCheckbox from '../../../src/components/Checkbox';

export default defineComponent({
  name: 'CheckboxPage',
  components: { FdCheckbox },
  setup() {
    const val = shallowRef(false);
    const val2 = shallowRef(false);
    const val3 = shallowRef(false);

    return { val, val2, val3 };
  }
})
</script>