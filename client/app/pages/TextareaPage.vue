<template>
  <div>
    <h1>Input Field</h1>
    <br>

    <fd-button @click="small = !small">{{ small ? 'Make Default' : 'Make Small' }}</fd-button>
    <br><br>

    <h4 class="mb-4">Default Input</h4>
    <fd-textarea
      v-model="testVal"
      id="test-default"
      label="Example Input"
      placeholder="Placeholder text here"
      :small="small"
    />
    <br><br>
    <p>Value: {{ testVal }}</p>

    <h4 class="mb-4">Default Input</h4>
    <fd-textarea
      v-model="testCountVal"
      :count="500"
      id="test-count"
      label="Example Input"
      placeholder="Counting characters!"
      :small="small"
    />
    <br><br>
    <p>Value: {{ testVal }}</p>

    <h4 class="mb-4">Assistive Text</h4>
    <fd-textarea
      v-model="testVal"
      :count="500"
      id="test-assistive"
      assistive-text="Please use the format MM/DD/YYYY"
      label="Example Input"
      placeholder="Placeholder text here"
      :small="small"
    />
    <br><br>

    <h4 class="mb-4">Error</h4>
    <fd-textarea
      v-model="testVal"
      id="test-error"
      :count="500"
      :errors="['format']"
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
    <fd-textarea
      v-model="testVal"
      id="test-error-custom"
      :count="500"
      assistive-text="Please use the format MM/DD/YYYY"
      :errors="(!testVal && ['required']) || []"
      :errorMessages="{
        example: 'Another message that won\'t show up.',
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

    <fd-textarea
      v-model="testVal"
      assistive-text="Please use the format MM/DD/YYYY"
      :errors="(!testVal && ['required']) || []"
      :errorMessages="{
        required: 'This input is a required field.',
      }"
      id="test-assistive-error"
      label="Example Input"
      persistent-assistive-text
      placeholder="Placeholder text here"
      :small="small"
    />
    <br><br>

    <h4 class="mb-4">Disabled</h4>
    <fd-textarea
      id="test-disabled"
      disabled
      label="Example Input"
      placeholder="Placeholder text here"
      :small="small"
    />
    <br><br>

    <h4 class="mb-4">Read Only</h4>
    <fd-textarea
      id="test-readonly"
      label="Copy this Value"
      model-value="000-02-F34500"
      placeholder="Placeholder text here"
      readonly
      :small="small"
    />
    <br><br>

    <h4 class="mb-4">Prepend Icon</h4>
    <fd-textarea
      id="test-prepend"
      v-model="prependIconVal"
      label="Favorite Food"
      :prepend-icon="CubeTransparentIcon"
      placeholder="Placeholder text here"
      :small="small"
    />
    <br><br>

    <h4 class="mb-4">Append Icon</h4>
    <fd-textarea
      id="test-append"
      v-model="appendIconVal"
      label="Copy this Value"
      :append-icon="CubeTransparentIcon"
      placeholder="Placeholder text here"
      :small="small"
    />
    <br><br>

    <h4 class="mb-4">Both Prepend and Append Icons</h4>
    <fd-textarea
      v-model="appendPrependIconVal"
      id="test-append-prepend"
      label="Copy this Value"
      :append-icon="CubeTransparentIcon"
      :prepend-icon="CubeTransparentIcon"
      placeholder="Placeholder text here"
      :small="small"
    />
    <br><br>

    <h4 class="mb-4">With Input Attributes</h4>
    <fd-textarea
      v-model="appendPrependIconVal"
      id="test-attributes"
      :input-attrs="{
        autocomplete: 'email',
        class: 'my-text-class',
      }"
      label="Email Address"
      placeholder="example@example.com"
      :small="small"
    />
    <br><br>

    <h4 class="mb-4">Multiple Errors</h4>
    <fd-row>
      <fd-col col="12 sm-6 md-4 lg-3 xl-2">
        <fd-textarea
          v-model="testVal"
          assistive-text="Please use the format MM/DD/YYYY"
          :errors="(!testVal && ['required', 'test']) || []"
          :errorMessages="{
            required: 'This input is a required field.',
            test: 'This is another error and equally as invalid.'
          }"
          id="test-assistive-error"
          label="Example Input"
          placeholder="Placeholder text here"
          :small="small"
        />
      </fd-col>
    </fd-row>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
    </p>
    <br><br>

    <h4 class="mb-4">Aria Specific Attributes</h4>
    <label id="test-label-example">This is the Label</label>
    <fd-textarea
      describedby="test-described-by"
      id="test-aria"
      labelledby="test-label-example"
      placeholder="Placeholder text here"
      :small="small"
    />
    <p
      id="test-described-by"
    >
      This is the descriptive text
    </p>
    <br><br>

    <h4 class="mb-4">All Slots</h4>
    <fd-textarea
      describedby="test-described-by"
      id="test-aria"
      labelledby="test-label-example"
      persistent-assistive-text
      :small="small"
    >
      <template #prepend-icon><cube-transparent-icon /></template>
      <template #append-icon><cube-transparent-icon /></template>
      <template #label>What is the Best Horse</template>
      <template #error-text>You should really check on that</template>
      <template #assistive-text>This is a descriptive area for the input</template>
    </fd-textarea>
    <br><br>

  </div>
</template>

<script lang="ts">
import { defineComponent, shallowRef } from 'vue';
import FdButton from '../../../src/components/Button';
import { FdTextarea } from '../../../src/components/Form';
import FdIcon from '../../../src/components/Icon';
import FdCol from '../../../src/components/Col';
import FdRow from '../../../src/components/Row';
import { CubeTransparentIcon } from '@heroicons/vue/20/solid'
import { count } from 'console';

export default defineComponent({
  name: 'TextareaPage',
  components: { FdTextarea, FdButton, FdCol, FdRow, CubeTransparentIcon, FdIcon },
  setup () {
    const appendIconVal = shallowRef('');
    const appendPrependIconVal = shallowRef('');
    const prependIconVal = shallowRef('');
    const small = shallowRef(false);
    const testVal = shallowRef('');
    const testNumber = shallowRef('');
    const testEmail = shallowRef('');
    const testTel = shallowRef('');
    const testUrl = shallowRef('');
    const testCountVal = shallowRef('');

    return {
      appendIconVal,
      appendPrependIconVal,
      CubeTransparentIcon,
      prependIconVal,
      small,
      testCountVal,
      testVal,
      testNumber,
      testEmail,
      testTel,
      testUrl,
    };
  },
})
</script>