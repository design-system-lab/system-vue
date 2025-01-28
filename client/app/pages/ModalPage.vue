<template>
  <div>
    <h1>Modal</h1>
    <fd-button class="mb-4" @click="showModal = true">Show Modal</fd-button>
    <div class="control-panel">
      <div>
        <fd-input-field
          v-model="headingText"
          id="heading"
          class="mb-4"
          label="Heading Text"
          small
        />
        <fd-input-field
          v-model="text"
          id="text"
          class="mb-4"
          label="Toast Description"
          small
        />
        <fd-input-field
          v-model="xsSize"
          id="xs-size"
          class="mb-4"
          label="XS Size"
          small
        />
        <fd-input-field
          v-model="smSize"
          id="sm-size"
          class="mb-4"
          label="SM Size"
          small
        />
        <fd-input-field
          v-model="mdSize"
          id="md-size"
          class="mb-4"
          label="MD Size"
          small
        />
        <fd-input-field
          v-model="lgSize"
          id="lg-size"
          class="mb-4"
          label="LG Size"
          small
        />
        <fd-input-field
          v-model="xlSize"
          id="xl-size"
          class="mb-4"
          label="XL Size"
          small
        />
      </div>
      <div>
        <fd-checkbox
          class="mb-4"
          v-model="dismissible"
          id="dismissible"
          value="dismissible"
        >Dismissible</fd-checkbox>
        <fd-select
          v-model="align"
          id="align-value"
          :items="items"
          label="Modal Vert Align"
          small
        />
      </div>
    </div>
    <FdModal
      :align="align"
      :dismissible="dismissible"
      :visible="showModal"
      @close="showModal = false"
    >
      <template #title>
        {{ titleText }}
      </template>
      <template #content>
        <p>{{ text }}</p>
        <div class="test mt-6">
          <fd-button kind="primary" @click="showModal = false">Primary Action</fd-button>
        </div>
      </template>
    </FdModal>
  </div>
</template>

<script land="ts">
import { defineComponent, shallowRef } from 'vue';
import FdButton from '@/components/Button';
import FdCheckbox from '@/components/Checkbox';
import { FdInputField, FdSelect } from '@/components/Form';
import FdModal from '@/components/Modal';

export default defineComponent({
  components: {
    FdButton,
    FdInputField,
    FdCheckbox,
    FdModal,
    FdSelect,
  },
  setup() {
    const showModal = shallowRef(false);
    const titleText = shallowRef('Do a thing');
    const text = shallowRef('Are you sure you want to proceed? This action cannot be undone and may have significant consequences.');
    const dismissible = shallowRef(true);

    const xsSize = shallowRef(12);
    const smSize = shallowRef(8);
    const mdSize = shallowRef(6);
    const lgSize = shallowRef(4);
    const xlSize = shallowRef(3);

    const align = shallowRef('center');
    const items = [
      { text: 'Start', value: 'start' },
      { text: 'Center', value: 'center' },
      { text: 'End', value: 'end' },
    ];

    return {
      showModal,
      titleText,
      text,
      dismissible,
      xsSize,
      smSize,
      mdSize,
      lgSize,
      xlSize,
      align,
      items,
    };
  }
});
</script>

<style lang="scss" scoped>
@import "@/styles/required";

.control-panel {
  display: flex;
  gap: 32px;
  padding: 1.5rem;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
}

.display-panel {
  margin-top: 0.5rem;
  padding: 1.5rem;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.aux-text {
  font-size: $font-sm;
  color: rgba(var(--fora_neutral-8), 1);
}
</style>