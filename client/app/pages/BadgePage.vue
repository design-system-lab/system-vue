<template>
  <div>
    <h1>Badge</h1>
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
        <fd-group
          id="options"
          type="checkbox"
        >
          <template #label>
            Options
          </template>
          <fd-checkbox
            v-model="showIndicator"
            id="showIndicator"
            value="showIndicator"
          >Show Indicator</fd-checkbox>
          <fd-checkbox
            v-model="outlined"
            id="outlined"
            value="outlined"
          >Outlined</fd-checkbox>
          <fd-checkbox
            v-model="showIcon"
            id="custom-icon"
            value="custom-icon"
          >Icon Badge</fd-checkbox>
          <fd-checkbox
            v-model="prependIcon"
            id="prepend-icon"
            value="prepend-icon"
          >Prepend Icon</fd-checkbox>
          <fd-checkbox
            v-model="appendIcon"
            id="append-icon"
            value="append-icon"
          >Append Icon</fd-checkbox>
        </fd-group>
      </div>
    </div>

    <div
      class="display-panel mb-4"
      :style="{ backgroundColor: bg }"
    >
      <fd-badge
        :size="size"
        :mode="outlined ? 'outline' : 'filled'"
        :icon="showIcon ? CubeTransparentIcon : undefined"
        :show-indicator="showIndicator"
        :prepend-icon="prependIcon ? CubeTransparentIcon : undefined"
        :append-icon="appendIcon ? CubeTransparentIcon : undefined"
      >
        Default Badge
      </fd-badge>
      <fd-badge
        :size="size"
        :mode="outlined ? 'outline' : 'filled'"
        :icon="showIcon ? CubeTransparentIcon : undefined"
        :show-indicator="showIndicator"
        kind="success"
        :prepend-icon="prependIcon ? CubeTransparentIcon : undefined"
        :append-icon="appendIcon ? CubeTransparentIcon : undefined"
      >
        Success Badge
      </fd-badge>
      <fd-badge
        :size="size"
        :mode="outlined ? 'outline' : 'filled'"
        :icon="showIcon ? CubeTransparentIcon : undefined"
        :show-indicator="showIndicator"
        kind="warning"
        :prepend-icon="prependIcon ? CubeTransparentIcon : undefined"
        :append-icon="appendIcon ? CubeTransparentIcon : undefined"
      >
        Warning Badge
      </fd-badge>
      <fd-badge
        :size="size"
        :mode="outlined ? 'outline' : 'filled'"
        :icon="showIcon ? CubeTransparentIcon : undefined"
        :show-indicator="showIndicator"
        kind="danger"
        :prepend-icon="prependIcon ? CubeTransparentIcon : undefined"
        :append-icon="appendIcon ? CubeTransparentIcon : undefined"
      >
        Error Badge
      </fd-badge>
      <fd-badge
        :size="size"
        :mode="outlined ? 'outline' : 'filled'"
        :icon="showIcon ? CubeTransparentIcon : undefined"
        :show-indicator="showIndicator"
        kind="info"
        :prepend-icon="prependIcon ? CubeTransparentIcon : undefined"
        :append-icon="appendIcon ? CubeTransparentIcon : undefined"
      >
        Information Badge
      </fd-badge>
      <fd-badge
        :size="size"
        :mode="outlined ? 'outline' : 'filled'"
        :icon="showIcon ? CubeTransparentIcon : undefined"
        :show-indicator="showIndicator"
        kind="neutral"
        :prepend-icon="prependIcon ? CubeTransparentIcon : undefined"
        :append-icon="appendIcon ? CubeTransparentIcon : undefined"
      >
        Neutral Badge
      </fd-badge>
    </div>

    <!-- add custom icon version -->
  </div>
</template>

<script lang="ts" setup>
import { shallowRef } from 'vue';
import { CubeTransparentIcon } from '@heroicons/vue/24/solid'
import FdBadge from '../../../src/components/Badge';
import FdCheckbox from '../../../src/components/Checkbox';
import FdGroup from '../../../src/components/Group';
import { FdSelect } from '../../../src/components/Form';


const showIndicator = shallowRef(false);
const showIcon = shallowRef(false);
const outlined = shallowRef(false);
const prependIcon = shallowRef(false);
const appendIcon = shallowRef(false);
const size = shallowRef('md');

const bg = shallowRef('#fff');

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
  gap: 1rem;
}

.aux-text {
  font-size: $font-sm;
  color: rgb(var(--fora_neutral-8));
}
</style>
