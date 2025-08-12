<template>
  <div>
    <h1>Chip</h1>
    <br>
    <div class="control-panel">
      <div>
        <fd-select
          v-model="size"
          id="size-type"
          class="mb-4"
          label="Size"
          small
          :items="[
            {
              text: 'Large',
              value: 'lg'
            },
            {
              text: 'Medium',
              value: 'md'
            },
            {
              text: 'Small',
              value: 'sm'
            },
          ]"
        />
        <fd-input-field
          id="tag-type"
          class="mb-4"
          label="Tag"
          small
          v-model="tagType"
        />
        <fd-input-field
          id="text"
          class="mb-4"
          label="Chip Text"
          small
          v-model="text"
        />
        <fd-input-field
          v-model="bg"
          id="bg-color"
          label="Background Color"
          small
        />
      </div>
      <div class="mb-6">
        <fd-group
          id="hide-show"
          type="checkbox"
        >
          <template #label>
            Hide / Show
          </template>
          <fd-checkbox
            v-model="showIcon"
            id="icon"
            value="icon"
          >Show Icon</fd-checkbox>
          <fd-checkbox
            v-model="showTag"
            id="tag"
            value="tag"
          >Show Tag</fd-checkbox>
        </fd-group>
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
            v-model="dismissible"
            id="dismissible"
            value="dismissible"
          >Dismissible</fd-checkbox>
          <fd-checkbox
            v-model="interactive"
            id="interactive"
            value="interactive"
          >Interactive</fd-checkbox>
        </fd-group>
      </div>
    </div>

    <div
      class="display-panel mb-4"
      :style="{ backgroundColor: bg }"
    >
      <fd-chip
        v-bind="{
          dismissible,
          interactive,
          modelValue: val,
          tag: showTag ? tagType : undefined,
        }"
        :size="size[0]"
        @click="handleChipClick"
        @dismiss="dismissCount++"
        @update:modelValue="val = $event"
      >
        <template v-if="showIcon" #icon>
          <fd-icon
            :icon="CubeTransparentIconSm"
            :size="size[0] === 'lg' ? 20 : 16"
          />
        </template>
        {{ text }}
      </fd-chip>
      <fd-chip
        v-bind="{
          dismissible,
          icon: showIcon ? CubeTransparentIconSm : undefined,
          interactive,
          modelValue: val2,
          tag: showTag ? tagType : undefined,
          text,
        }"
        :size="size[0]"
        @click="counter++"
        @dismiss="dismissCount++"
        @update:modelValue="val2 = $event"
      />
      <fd-chip
        v-bind="{
          dismissible,
          icon: showIcon ? CubeTransparentIconSm : undefined,
          interactive,
          modelValue: val3,
          tag: showTag ? tagType : undefined,
          text,
        }"
        :size="size[0]"
        @click="counter++"
        @dismiss="dismissCount++"
        @update:modelValue="val3 = $event"
      />
      <p class="aux-text">Times clicked: {{ counter }}</p>
      <p class="aux-text">Times dismissed: {{ dismissCount }}</p>
    </div>

    <div
      class="display-panel"
      :style="{ backgroundColor: bg }"
    >
      <h5 class="mb-4">Chips as Radio</h5>
      <fd-group
        class="mb-4"
        type="chip"
      >
        <fd-chip
          v-model="radioChips"
          interactive
          :size="size[0]"
          value="option-1"
        >
          Option 01
        </fd-chip>
        <fd-chip
          v-model="radioChips"
          interactive
          :size="size[0]"
          value="option-2"
        >
          Option 02
        </fd-chip>
        <fd-chip
          v-model="radioChips"
          interactive
          :size="size[0]"
          value="option-3"
        >
          Option 03
        </fd-chip>
        <fd-chip
          v-model="radioChips"
          interactive
          :size="size[0]"
          value="option-4"
        >
          Option 04
        </fd-chip>
      </fd-group>
      <p class="aux-text">Current Value: {{ radioChips }}</p>
    </div>
    <div
      class="display-panel"
      :style="{ backgroundColor: bg }"
    >
      <h5 class="mb-4">Chips as Multi-Select</h5>
      <fd-group
        v-model="multiSelectChips"
        class="mb-4"
        type="chip"
      >
        <fd-chip
          interactive
          :size="size[0]"
          value="option-1"
        >
          Option 01
        </fd-chip>
        <fd-chip
          interactive
          :size="size[0]"
          value="option-2"
        >
          Option 02
        </fd-chip>
        <fd-chip
          interactive
          :size="size[0]"
          value="option-3"
        >
          Option 03
        </fd-chip>
        <fd-chip
          interactive
          :size="size[0]"
          value="option-4"
        >
          Option 04
        </fd-chip>
      </fd-group>
      <p class="aux-text">Current Value: {{ multiSelectChips }}</p>
    </div>
    <div
      class="display-panel"
      :style="{ backgroundColor: bg }"
    >
      <h5 class="mb-4">Programmatic Chips as Radio</h5>
      <fd-group
        v-model="progRadioChips"
        class="mb-4"
        :chips="chips"
        type="chip"
      />
    </div>
    <div
      class="display-panel"
      :style="{ backgroundColor: bg }"
    >
      <h5 class="mb-4">Programmatic Chips as Multi-Select</h5>
      <fd-group
        v-model="progMultiChips"
        class="mb-4"
        :chips="chips"
        type="chip"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, shallowRef } from 'vue';
import { CubeTransparentIcon as CubeTransparentIconSm } from '@heroicons/vue/20/solid'
import FdCheckbox from '../../../src/components/Checkbox';
import FdChip from '../../../src/components/Chip';
import FdGroup from '../../../src/components/Group';
import FdIcon from '../../../src/components/Icon/FdIcon.vue';
import { FdInputField, FdSelect } from '../../../src/components/Form';

export default defineComponent({
  name: 'ChipPage',
  components: { FdCheckbox, FdChip, FdGroup, FdIcon, FdInputField, FdSelect },
  setup() {
    const dismissible = shallowRef(false);
    const showIcon = shallowRef(false);
    const interactive = shallowRef(false);
    const size = shallowRef(['lg']);
    const showTag = shallowRef(false);
    const tagType = shallowRef('span');
    const bg = shallowRef('#fff');
    const text = shallowRef('Chip Text');
    const counter = shallowRef(0);
    const dismissCount = shallowRef(0);
    const val = shallowRef(false);
    const val2 = shallowRef(false);
    const val3 = shallowRef(false);
    const radioChips = shallowRef<string>('');
    const multiSelectChips = shallowRef<string[]>([]);
    const progMultiChips = shallowRef<string[]>([]);
    const progRadioChips = shallowRef<string>('');

    const chips = [
      {
        text: 'Option 01',
        interactive: true,
        value: 'option-1',
      },
      {
        text: 'Option 02',
        interactive: true,
        value: 'option-2',
      },
      {
        text: 'Option 03',
        interactive: true,
        value: 'option-3',
      },
      {
        text: 'Option 04',
        interactive: true,
        value: 'option-4',
      },
    ];

    function handleChipClick(e) {
      counter.value += 1;
    }

    return {
      bg,
      chips,
      counter,
      dismissCount,
      dismissible,
      handleChipClick,
      interactive,
      multiSelectChips,
      progMultiChips,
      progRadioChips,
      radioChips,
      showIcon,
      showTag,
      size,
      tagType,
      text,
      val,
      val2,
      val3,
      CubeTransparentIconSm,
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
}

.aux-text {
  font-size: $font-sm;
  color: rgb(var(--fora_neutral-8));
}
</style>
