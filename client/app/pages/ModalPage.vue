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
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse venenatis magna vel risus luctus elementum. Sed laoreet laoreet nunc, ut pharetra ante euismod a. Etiam metus urna, consequat at purus vel, condimentum ultrices lectus. Suspendisse aliquam ultricies turpis, quis bibendum ipsum fringilla pharetra. Mauris non faucibus sem, gravida commodo neque. Nullam vel placerat dui. Nam blandit aliquam tortor, ac elementum nisi porttitor sed. Morbi eu consequat nibh. In auctor pellentesque euismod. Nam sapien dolor, mollis vel felis euismod, auctor mattis nisi. Nunc magna nunc, efficitur vel mi quis, consectetur semper velit.</p>

    <p>Suspendisse mollis, turpis efficitur porttitor porta, augue quam porttitor est, sed lacinia elit libero et risus. Vivamus mollis, nunc eu sodales tristique, augue tortor fringilla magna, mattis ullamcorper velit libero sed nibh. Suspendisse in iaculis nunc. Phasellus ut imperdiet felis. Donec viverra varius nulla, sit amet consectetur dolor vulputate nec. Curabitur eget bibendum magna. Duis finibus vitae lorem vel hendrerit. Duis turpis mi, luctus ac egestas ac, pulvinar eget nisl. Nunc nec elit vestibulum, suscipit velit ut, semper massa. In maximus nulla eget blandit convallis.</p>

    <p>Morbi sit amet tristique sem. Proin finibus, diam non consectetur vestibulum, turpis urna hendrerit ligula, vitae gravida mi sapien a metus. Curabitur malesuada dictum tortor, et ultricies erat egestas nec. Nunc rutrum ut eros at elementum. Fusce a varius velit, nec tempus augue. Nunc ante mi, ullamcorper a nisi ac, posuere scelerisque massa. Duis massa sapien, vehicula sed varius nec, rhoncus at ante. Phasellus sed augue scelerisque, pulvinar neque in, sagittis libero. Quisque rutrum in nunc a porta. Curabitur dictum faucibus justo, vitae vulputate orci elementum sed. Nam gravida lacinia placerat. Vestibulum quis felis tincidunt, malesuada enim non, gravida nulla.</p>
    <FdModal
      :align="align"
      :dismissible="dismissible"
      :visible="showModal"
      :lg="lgSize"
      :md="mdSize"
      :sm="smSize"
      :xs="xsSize"
      :xl="xlSize"
      @close="showModal = false"
    >
      <template #title>
        {{ titleText }}
      </template>
      <template #content>
        <p>{{ text }}</p>
        <div class="mt-6">
          <fd-button class="mr-2" kind="tertiary" @click="showModal = false">Secondary Action</fd-button>
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