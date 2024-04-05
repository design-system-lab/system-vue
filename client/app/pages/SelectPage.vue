<template>
  <div>
    <h1>Select</h1>
    <br>

    <fd-button @click="small = !small">{{ small ? 'Make Default' : 'Make Small' }}</fd-button>
    <br><br>

    <h4 class="mb-4">Default Select</h4>
    <fd-select
      v-model="testVal"
      id="test-default"
      :items="items"
      label="Example Select"
      placeholder="Select an option"
      :small="small"
    />
    <br><br>
    <p>Value: {{ testVal }}</p>

    <h4 class="mb-4">Menu top</h4>
    <fd-select
      v-model="testVal"
      id="test-default"
      direction="top"
      :items="items"
      label="Example Select"
      placeholder="Select an option"
      :small="small"
    />
    <br><br>
    <p>Value: {{ testVal }}</p>

    <h4 class="mb-4">Assistive Text</h4>
    <fd-select
      v-model="testVal"
      id="test-assistive"
      assistive-text="Please use the format MM/DD/YYYY"
      :items="items"
      label="Example Select"
      placeholder="Placeholder text here"
      :small="small"
    />
    <br><br>

    <h4 class="mb-4">Error</h4>
    <fd-select
      v-model="testVal"
      id="test-error"
      :errors="['format']"
      :errorMessages="{
        format: 'This is incorrect, and there\'s nothing you can do to fix it.',
      }"
      :items="items"
      label="Example Select"
      placeholder="Placeholder text here"
      :small="small"
    />
    <br><br>

    <h4>Custom Validation</h4>
    <p class="mb-4">Add content to the Select to remove the error</p>
    <fd-select
      v-model="testVal"
      id="test-error-custom"
      assistive-text="Please use the format MM/DD/YYYY"
      :errors="(!testVal.length && ['required']) || []"
      :errorMessages="{
        example: 'Another message that won\'t sho   w up.',
        required: 'This select is a required field.',
      }"
      :items="items"
      label="Example Select"
      placeholder="Placeholder text here"
      :small="small"
    />
    
    <br><br>

    <h4>Assistive Text and Error</h4>
    <p class="mb-4">
      Show both error and assistive text.
    </p>

    <fd-select
      v-model="testVal"
      assistive-text="Please use the format MM/DD/YYYY"
      :errors="(!testVal.length && ['required']) || []"
      :errorMessages="{
        required: 'This Select is a required field.',
      }"
      id="test-assistive-error"
      :items="items"
      label="Example Select"
      persistent-assistive-text
      placeholder="Placeholder text here"
      :small="small"
    />
    <br><br>

    <h4 class="mb-4">Many Items</h4>
    <fd-select
      id="test-overflow"
      :items="itemsLong"
      label="Example Select"
      placeholder="Placeholder text here"
      :size="6"
      :small="small"
    />
    <br><br>

    <h4 class="mb-4">Custom Width</h4>
    <fd-select
      id="test-overflow"
      :items="itemsLong"
      label="Example Select"
      menu-width="15rem"
      placeholder="Placeholder text here"
      :small="small"
    />
    <br><br>
    
    <h4 class="mb-4">Disabled</h4>
    <fd-select
      id="test-disabled"
      disabled
      :items="items"
      label="Example Select"
      placeholder="Placeholder text here"
      :small="small"
    />
    <br><br>

    <h4 class="mb-4">Read Only</h4>
    <fd-select
      id="test-readonly"
      :items="items"
      label="Copy this Value"
      :model-value="['test']"
      placeholder="Placeholder text here"
      readonly
      :small="small"
    />
    <br><br>

    <h4 class="mb-4">Prepend Icon</h4>
    <fd-select
      id="test-prepend"
      v-model="prependIconVal"
      :items="items"
      label="Favorite Food"
      :prepend-icon="CubeTransparentIcon"
      placeholder="Placeholder text here"
      :small="small"
    />
    <br><br>

    <h4 class="mb-4">Swap Icon to Option Icon</h4>
    <fd-select
      v-model="appendPrependIconVal"
      display-selection-icon
      id="test-append-prepend"
      :items="itemsAlt"
      label="Copy this Value"
      :prepend-icon="CubeTransparentIcon"
      placeholder="Placeholder text here"
      :small="small"
    />
    <br><br>

    <h4 class="mb-4">With Select Attributes</h4>
    <fd-select
      v-model="appendPrependIconVal"
      id="test-attributes"
      :items="items"
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
        <fd-select
          v-model="testVal"
          assistive-text="Please use the format MM/DD/YYYY"
          :errors="(!testVal.length && ['required', 'test']) || []"
          :errorMessages="{
            required: 'This Select is a required field.',
            test: 'This is another error and equally as invalid.'
          }"
          id="test-assistive-error"
          :items="items"
          label="Example Select"
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
    <fd-select
      describedby="test-described-by"
      id="test-aria"
      :items="items"
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
    <fd-select
      v-model="allSlotsVal"
      describedby="test-described-by"
      id="test-all-slots"
      :items="allSlotsItems"
      labelledby="test-label-example"
      persistent-assistive-text
      placeholder="Placeholder text here"
      :small="small"
    >
      <template #prepend-icon>
        <cube-transparent-icon />
      </template>
      <template #label>What is the Best Horse</template>
      <template #error-text>You should really check on that</template>
      <template #assistive-text>This is a descriptive area for the Select</template>
      <template #battery>Battery Slot Filled!</template>
      <template #beaker>This is a beaker</template>
    </fd-select>
    <br><br>

    <h4 class="mb-4">With Global Menu</h4>
    <div class="box">
      <fd-select
        v-model="appendPrependIconVal"
        id="test-global"
        :items="items"
        label="Select Item"
        menu-placement="global"
        placeholder="example@example.com"
        :small="small"
      />
    </div>
    <br><br>

    <div class="box-spacer" />

  </div>
</template>

<script lang="ts">
import { defineComponent, shallowRef } from 'vue';
import FdButton from '../../../src/components/Button';
import { FdSelect } from '../../../src/components/Form';
import FdIcon from '../../../src/components/Icon';
import FdCol from '../../../src/components/Col';
import FdRow from '../../../src/components/Row';
import { CubeTransparentIcon } from '@heroicons/vue/20/solid'
import { Battery0Icon, BeakerIcon, BellIcon, BookOpenIcon } from '@heroicons/vue/24/outline'

export default defineComponent({
  name: 'InputFieldPage',
  components: { FdSelect, FdButton, FdCol, FdRow, CubeTransparentIcon, FdIcon },
  setup () {
    const appendIconVal = shallowRef([]);
    const appendPrependIconVal = shallowRef([]);
    const prependIconVal = shallowRef([]);
    const small = shallowRef(false);
    const testVal = shallowRef([]);
    const testNumber = shallowRef([]);
    const testEmail = shallowRef([]);
    const testTel = shallowRef([]);
    const testUrl = shallowRef([]);
    const allSlotsVal = shallowRef([]);

    const items = shallowRef([
      {
        text: 'Bartholomew',
        value: 'bartholomew'
      },
      {
        text: 'Test',
        value: 'test'
      },
      {
        text: 'Testy',
        value: 'testy'
      },
      {
        text: 'Zillow',
        value: 'zillow'
      },
    ]);

    const itemsLong = shallowRef([
      {
        text: 'Bartholomew',
        value: 'bartholomew'
      },
      {
        text: 'Test',
        value: 'test'
      },
      {
        text: 'Testy',
        value: 'testy'
      },
      {
        text: 'Zillow',
        value: 'zillow'
      },
      {
        text: 'Yams',
        value: 'yams'
      },
      {
        text: 'Doggy',
        value: 'doggy'
      },
      {
        text: 'Mammals',
        value: 'mammals'
      },
      {
        text: 'Pillow',
        value: 'pillow'
      },
      {
        text: 'Zig Zag',
        value: 'zig-zag'
      },
    ]);

    const itemsAlt = shallowRef([
      {
        icon: Battery0Icon,
        text: 'Battery',
        value: 'battery'
      },
      {
        icon: BeakerIcon,
        text: 'Beaker',
        value: 'beaker'
      },
      {
        icon: BellIcon,
        text: 'Bell',
        value: 'bell'
      },
      {
        icon: BookOpenIcon,
        text: 'Book',
        value: 'book'
      },
    ]);

    const allSlotsItems = shallowRef([
    {
        icon: Battery0Icon,
        slotName: 'battery',
        value: 'battery'
      },
      {
        icon: BeakerIcon,
        slotName: 'beaker',
        value: 'beaker'
      },
      {
        icon: BellIcon,
        text: 'Bell',
        value: 'bell'
      },
      {
        icon: BookOpenIcon,
        text: 'Book',
        value: 'book'
      },
    ]);

    return {
      allSlotsVal,
      allSlotsItems,
      appendIconVal,
      appendPrependIconVal,
      CubeTransparentIcon,
      itemsAlt,
      prependIconVal,
      small,
      testVal,
      testNumber,
      testEmail,
      testTel,
      testUrl,
      items,
      itemsLong,
    };
  },
})
</script>

<style lang="scss" scoped>

.box {
  background: rgba(var(--fora_neutral-2), 1);
  border: 1px solid rgba(var(--fora_neutral-5), 1);
  border-radius: 8px;
  max-width: 100%;
  padding: 2rem;
  overflow: hidden;
  width: 500px;
}

@media (min-width: 700px) {
  .box-spacer { height: 500px; }
}

</style>
