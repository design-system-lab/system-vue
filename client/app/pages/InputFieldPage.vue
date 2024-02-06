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

    <h4>Custom Validation</h4>
    <p class="mb-4">Add content to the input to remove the error</p>
    <fd-input-field
      v-model="testVal"
      assistive-text="Please use the format MM/DD/YYYY"
      :error="(!testVal && 'required') || ''"
      :errorMessages="{
        required: 'This input is a required field.',
      }"
      label="Example Input"
      placeholder="Placeholder text here"
      :small="small"
    />
    
    <br><br>

    <h4>Assistive Text and Error</h4>
    <p class="mb-4">
      Show both error and assistive text.
    </p>

    <fd-input-field
      v-model="testVal"
      assistive-text="Please use the format MM/DD/YYYY"
      :error="(!testVal && 'required') || ''"
      :errorMessages="{
        required: 'This input is a required field.',
      }"
      label="Example Input"
      persistent-assistive-text
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

    <h4 class="mb-4">Prepend Icon</h4>
    <fd-input-field
      v-model="prependIconVal"
      label="Favorite Food"
      :prepend-icon="CubeTransparentIcon"
      placeholder="Placeholder text here"
      :small="small"
    />
    <br><br>

    <h4 class="mb-4">Append Icon</h4>
    <fd-input-field
      v-model="appendIconVal"
      label="Copy this Value"
      :append-icon="CubeTransparentIcon"
      placeholder="Placeholder text here"
      :small="small"
    />
    <br><br>

    <h4 class="mb-4">Append Icon</h4>
    <fd-input-field
      v-model="appendPrependIconVal"
      label="Copy this Value"
      :append-icon="CubeTransparentIcon"
      :prepend-icon="CubeTransparentIcon"
      placeholder="Placeholder text here"
      :small="small"
    />
    <br><br>

    <h4 class="mb-4">With Input Attributes</h4>
    <fd-input-field
      v-model="appendPrependIconVal"
      :input-attrs="{
        autocomplete: 'email',
        class: 'my-text-class',
      }"
      label="Email Address"
      placeholder="example@example.com"
      :small="small"
    />
    <br><br>

  </div>
</template>

<script lang="ts">
import { defineComponent, shallowRef } from 'vue';
import { FdInputField } from '../../../src/components/Form';
import FdButton from '../../../src/components/Button';
import { CubeTransparentIcon } from '@heroicons/vue/20/solid'

export default defineComponent({
  name: 'InputFieldPage',
  components: { FdInputField, FdButton },
  setup () {
    const appendIconVal = shallowRef('');
    const appendPrependIconVal = shallowRef('');
    const prependIconVal = shallowRef('');
    const small = shallowRef(false);
    const testVal = shallowRef('');

    return {
      appendIconVal,
      appendPrependIconVal,
      CubeTransparentIcon,
      prependIconVal,
      small,
      testVal
    };
  },
})
</script>