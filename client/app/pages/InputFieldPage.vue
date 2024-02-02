<template>
  <div>
    <h1>Input Field</h1>
    <br>

    <fd-button @click="small = !small">{{ small ? 'Make Default' : 'Make Small' }}</fd-button>
    <br><br>

    <h4 class="mb-4">Default Input</h4>
    <fd-input-field
      v-model="testVal"
      label="Example Input"
      placeholder="Placeholder text here"
      :small="small"
    />
    <br><br>
    <p>Value: {{ testVal }}</p>

    <h4 class="mb-4">Assistive Text</h4>
    <fd-input-field
      v-model="testVal"
      assistive-text="Please use the format MM/DD/YYYY"
      label="Example Input"
      placeholder="Placeholder text here"
      :small="small"
    />
    <br><br>

    <h4 class="mb-4">Error</h4>
    <fd-input-field
      v-model="testVal"
      error="format"
      :errorMessages="{
        format: 'Incorrect date format, please use MM/DD/YYYY',
      }"
      label="Example Input"
      placeholder="Placeholder text here"
      :small="small"
    />
    <br><br>

    <h4 class="mb-4">Assistive Text and Error</h4>
    <fd-input-field
      v-model="testVal"
      assistive-text="Please use the format MM/DD/YYYY"
      label="Example Input"
      error="format"
      :errorMessages="{
        format: 'Incorrect date format, please use MM/DD/YYYY',
      }"
      placeholder="Placeholder text here"
      :small="small"
    />
    <br><br>

    <h4 class="mb-4">Custom Validation</h4>
    <fd-input-field
      v-model="testVal"
      error="format"
      :errorMessages="{
        format: 'Incorrect date format, please use MM/DD/YYYY',
      }"
      label="Example Input"
      placeholder="Placeholder text here"
      :small="small"
    />
    <br><br>

    <h4 class="mb-4">Disabled</h4>
    <fd-input-field
      disabled
      label="Example Input"
      placeholder="Placeholder text here"
      :small="small"
    />
    <br><br>

    <h4 class="mb-4">Read Only</h4>
    <fd-input-field
      label="Copy this Value"
      model-value="000-02-F34500"
      placeholder="Placeholder text here"
      readonly
      :small="small"
    />
    <br><br>

  </div>
</template>

<script lang="ts">
import { defineComponent, shallowRef, inject } from 'vue';
import { FdInputField } from '../../../src/components/Form';
import FdButton from '../../../src/components/Button';

export default defineComponent({
  name: 'InputFieldPage',
  components: { FdInputField, FdButton },
  setup () {
    const small = shallowRef(false);
    const testVal = shallowRef('');

    return { small, testVal };
  },
})
</script>