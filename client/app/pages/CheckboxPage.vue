<template>
  <div>
    <h1>Checkbox</h1>
    <br>
    <h4>Default checkbox</h4>
    <br>
    <fd-checkbox v-model="val" id="example-val" label="Example checkbox" value="example" />

    <br><br>

    <h4>Indeterminate</h4>
    <br>
    <fd-checkbox v-model="valIndeterminate" id="example-val-indeterminate" indeterminate label="Another checkbox" value="ex-indeterminate" />
    
    <br><br>

    <h4>Error</h4>
    <br>
    <fd-group id="checkbox-group-error" label="Erroneous Checks" type="checkbox">
      <fd-checkbox v-model="valError" id="example-val-error" label="A faulty checkbox probably" :errors="['test']" value="val-error"/>
      <fd-checkbox indeterminate id="example-val-error" label="A faulty checkbox probably" :errors="['test']" value="val-error"/>
    </fd-group>

    <br><br>

    <h4>Group using Slots</h4><br>
    <fd-group id="checkbox-group" label="Checks in Spanish" type="checkbox">
      <fd-checkbox v-model="val1" id="example-val1" label="Checkbox Number Uno" value="val-1" />
      <fd-checkbox v-model="val2" id="example-val-2" label="Checkbox Number Dos" value="val-2" />
      <fd-checkbox v-model="val3" id="example-val-3" label="Checkbox Number Tres" value="val-3" />
    </fd-group>

    <br><br>

    <h4>Group Using Data</h4><br>
    <fd-group v-model="dataModel" id="checkbox-group" :checkboxes="checkboxes" label="Checks in Spanish" type="checkbox">
      <template #check-two>Numero Dos</template>
    </fd-group>
    <br>
    <p>{{ dataModel }}</p>
    
    <br><br>

    <h4>Disabled</h4>
    <br>
    <fd-group id="disabled-group" label="Disabled Checks" type="checkbox">
      <fd-checkbox v-model="valDisabled" id="example-val-disabled" label="A Disabled Input" disabled value="val-disabled-1" />
      <fd-checkbox id="example-val-disabled-indeterminate" label="Indeterminate Disabled Input" indeterminate disabled value="val-disabled-2" />
      <fd-checkbox id="example-val-disabled-unchecked" label="Unchecked Disabled Input" disabled value="val-disabled-3" />
    </fd-group>
    
    <br><br>

    <h4>Readonly</h4>
    <br>
    <fd-group
      id="example-val-readonly-group"
      type="checkbox"
    >
      <template #label>Readonly Checks</template>
      <fd-checkbox v-model="valReadonly" id="example-val-readonly" label="A Readonly Input" readonly value="readonly-1" />
      <fd-checkbox id="example-val-readonly-indeterminate" indeterminate label="Indeterminate Readonly Input" readonly value="readonly-2"  />
      <fd-checkbox :model-value="true" id="example-val-readonly-checked" label="Checked Readonly Input" readonly value="readonly-3"  />
    </fd-group>

    <br><br>

    <h4>Small Checkbox</h4>

    <fd-checkbox v-model="smVal" id="small-checkbox" small value="sm-checkbox">
      Slotted Label Text
    </fd-checkbox>
    
    <br><br>
  </div>
</template>

<script lang="ts">
import { defineComponent, shallowRef, ref } from 'vue';
import FdCheckbox from '../../../src/components/Checkbox';
import FdGroup from '../../../src/components/Group';

export default defineComponent({
  name: 'CheckboxPage',
  components: { FdCheckbox, FdGroup },
  setup() {
    const val = shallowRef(false);
    const valError = shallowRef(false);
    const valIndeterminate = shallowRef(false);
    const val1 = shallowRef(false);
    const val2 = shallowRef(false);
    const val3 = shallowRef(false);
    const valReadonly = shallowRef(false);
    const valDisabled = shallowRef(true);
    const smVal = shallowRef(false);
    const dataModel = ref([]);

    const checkboxes = ref([
      {
        id: 'example-val1-data',
        label: 'Checkbox Number Uno',
        value: 'val-1-data',
        modelValue: false,
      },
      {
        id: 'example-val2-data',
        slotName: 'check-two',
        value: 'val-2-data',
        modelValue: false,
      },
      {
        id: 'example-val3-data',
        label: 'Checkbox Number Tres',
        value: 'val-3-data',
        modelValue: false,
      },
    ]);

    return { checkboxes, val, valError, valIndeterminate, val1, val2, val3, valReadonly, valDisabled, smVal, dataModel };
  }
})
</script>