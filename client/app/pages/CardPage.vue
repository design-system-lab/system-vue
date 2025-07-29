<template>
  <div>
    <h1>Cards</h1>
    <br>
    <div class="control-panel">
      <div>
        <fd-input-field
          v-model="overlineText"
          id="overline"
          class="mb-4"
          label="Overline Text"
          small
        />
        <fd-input-field
          v-model="titleText"
          id="title"
          class="mb-4"
          label="Title Text"
          small
        />
        <fd-input-field
          v-model="contentText"
          id="content"
          class="mb-4"
          label="Content Text"
          small
        />
        <fd-input-field
          v-model="actionText"
          id="action"
          class="mb-4"
          label="Action Text"
          small
        />
        <fd-input-field
          v-model="bg"
          id="bg"
          label="Background Color"
          small
        />
      </div>
      <div>
        <fd-group
          id="options"
          type="checkbox"
        >
          <template #label>
            Options
          </template>
          <fd-checkbox
            v-model="showIcon"
            id="show-icon"
            value="show-icon"
          >Show Icon</fd-checkbox>
          <fd-checkbox
            v-model="showImage"
            id="show-image"
            value="show-image"
          >Show Image</fd-checkbox>
          <fd-checkbox
            v-model="showAction"
            id="show-action"
            value="show-action"
          >Show Action</fd-checkbox>
        </fd-group>
      </div>
    </div>

    <div
      class="display-panel mb-4"
      :style="{ backgroundColor: bg }"
    >
      <fd-row>
        <fd-col>
          <fd-card>
            <template v-if="showImage" #image>
              <img src="https://placehold.co/800x400" alt="Placeholder" />
            </template>
            <template v-if="showIcon" #icon>
              <fd-icon :icon="CubeTransparentIcon" />
            </template>
            <template #overline>
              {{ overlineText }}
            </template>
            <template #title>
              {{ titleText }}
            </template>
            <template #content>
              {{ contentText }}
            </template>
            <template v-if="showAction" #action>
              <fd-button>
                {{ actionText }}
              </fd-button>
            </template>
          </fd-card>
        </fd-col>
        <fd-col>
          <fd-card>
            <p>
              Example of a card fully overwritten with custom content.
            </p>

            <fd-input-field
              v-model="exampleInput"
              id="example-input"
              label="Example Input"
            />

            <fd-input-field
              v-model="exampleInput"
              id="example-input"
              label="Example Input"
            />

            <fd-input-field
              v-model="exampleInput"
              id="example-input"
              label="Example Input"
            />

            <fd-button>
              Example Button
            </fd-button>
          </fd-card>
        </fd-col>
      </fd-row>
    </div>

    <!-- add custom icon version -->
  </div>
</template>

<script lang="ts">
import { defineComponent, shallowRef } from 'vue';
import { CubeTransparentIcon } from '@heroicons/vue/24/solid'
import FdAlert from '../../../src/components/Alert';
import FdButton from '../../../src/components/Button';
import FdCard from '../../../src/components/Card';
import FdCheckbox from '../../../src/components/Checkbox';
import FdGroup from '../../../src/components/Group';
import FdIcon from '../../../src/components/Icon/FdIcon.vue';
import { FdInputField } from '../../../src/components/Form';
import FdRow from '../../../src/components/Row';
import FdCol from '../../../src/components/Col';

export default defineComponent({
  name: 'AlertPage',
  components: { FdAlert, FdButton, FdCard, FdCheckbox, FdCol, FdGroup, FdIcon, FdInputField, FdRow },
  setup() {
    const actionText = shallowRef('Action Text');
    const exampleInput = shallowRef('');
    const overlineText = shallowRef('Overline Text');
    const showAction = shallowRef(true);
    const showIcon = shallowRef(true);
    const showImage = shallowRef(true);
    const titleText = shallowRef('Title Text');
    const contentText = shallowRef('Dive into the exciting realm of programming with our comprehensive courses. Whether you\'re a beginner or looking to enhance your skills, we offer a range of tutorials and projects to help you succeed.');

    const bg = shallowRef('#fff');

    return {
      actionText,
      bg,
      exampleInput,
      overlineText,
      showAction,
      showImage,
      showIcon,
      contentText,
      titleText,
      CubeTransparentIcon,
    };
  }
})
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
  color: rgb(var(--fora_neutral-8));
}
</style>
