<template>
  <div>
    <h1>Chip</h1>
    <br>
    <div class="control-panel">
      <div>
        <fd-select
          v-model="statusType"
          id="status-type"
          class="mb-4"
          label="Status"
          small
          :items="[
            {
              text: 'Success',
              value: 'success'
            },
            {
              text: 'Warning',
              value: 'warning'
            },
            {
              text: 'Error',
              value: 'error'
            },
            {
              text: 'Info',
              value: 'info'
            }
          ]"
        />
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
            v-model="showAvatar"
            id="avatar"
            value="avatar"
          >Show Avatar</fd-checkbox>
          <fd-checkbox
            v-model="showIcon"
            id="icon"
            value="icon"
          >Show Icon</fd-checkbox>
          <fd-checkbox
            v-model="showStatus"
            id="status"
            value="status"
          >Show Status</fd-checkbox>
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
          <fd-checkbox
            v-model="outlined"
            id="outlined"
            value="outlined"
          >Outlined</fd-checkbox>
        </fd-group>
      </div>
    </div>

    <div
      class="display-panel"
      :style="{ backgroundColor: bg }"
    >
      <fd-group
        class="mb-4"
        type="chip"
      >
        <fd-chip
          v-bind="{
            dismissible,
            interactive,
            modelValue: val,
            outlined,
            status: showStatus ? statusType[0] : undefined,
            tag: showTag ? tagType : undefined,
            value: 'test-1',
          }"
          :size="size[0]"
          @click="counter++"
          @dismiss="dismissCount++"
        >
          <template v-if="showAvatar" #avatar-img>
            <img src="https://placeimg.com/100/100/people" alt="avatar" />
          </template>
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
            modelValue: val,
            outlined,
            status: showStatus ? statusType[0] : undefined,
            tag: showTag ? tagType : undefined,
            text,
            value: 'test-1'
          }"
          :size="size[0]"
          @click="counter++"
          @dismiss="dismissCount++"
        />
      </fd-group>
      <p class="aux-text">Times clicked: {{ counter }}</p>
      <p class="aux-text">Times dismissed: {{ dismissCount }}</p>
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
    const showAvatar = shallowRef(false);
    const dismissible = shallowRef(false);
    const showIcon = shallowRef(false);
    const interactive = shallowRef(false);
    const outlined = shallowRef(false);
    const size = shallowRef(['lg']);
    const showStatus = shallowRef(false);
    const statusType = shallowRef(['success']);
    const showTag = shallowRef(false);
    const tagType = shallowRef('span');
    const bg = shallowRef('#fff');
    const text = shallowRef('Chip Text');
    const counter = shallowRef(0);
    const dismissCount = shallowRef(0);
    const show = shallowRef(true);
    const val = shallowRef(false);

    return {
      bg,
      showAvatar,
      dismissible,
      showIcon,
      interactive,
      outlined,
      size,
      showStatus,
      statusType,
      showTag,
      tagType,
      counter,
      dismissCount,
      show,
      text,
      val,
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
  color: rgba(var(--fora_neutral-8), 1);
}
</style>
