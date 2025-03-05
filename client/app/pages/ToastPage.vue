<template>
  <div>
    <h1>Toasts</h1>
    <br>
    <fd-button class="mb-4" @click="deployRandomToast()">Deploy Random Toast!</fd-button>
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
          v-model="bg"
          id="bg"
          class="mb-4"
          label="Background Color"
          small
        />
        <fd-input-field
          v-model="linkText"
          id="link"
          label="Link Text"
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
            v-model="dismissible"
            id="dismissible"
            value="dismissible"
          >Dismissible</fd-checkbox>
          <fd-checkbox
            v-model="showTimestamp"
            id="timestamp"
            value="timestamp"
          >Show Timestamp</fd-checkbox>
          <fd-checkbox
            v-model="customIcon"
            id="custom-icon"
            value="custom-icon"
          >Custom Icon</fd-checkbox>
        </fd-group>
      </div>
    </div>

    <div
      class="display-panel mb-4"
      :style="{ backgroundColor: bg }"
    >
      <p>
        Dismiss clicked {{ counter }} times!
        <br>
        Link clicked {{ linkCounter }} times!
      </p>
      <fd-toast
        :dismissible="dismissible"
        :icon="customIcon ? CubeTransparentIcon : undefined"
        :link-text="linkText"
        :show-timestamp="showTimestamp"
        @click:link="linkCounter += 1"
        @dismiss="counter += 1"
      >
        <template #description>{{ text }}</template>
        {{ headingText }}
      </fd-toast>
      <fd-toast
        :dismissible="dismissible" kind="neutral"
        :icon="customIcon ? CubeTransparentIcon : undefined"
        :link-text="linkText"
        :show-timestamp="showTimestamp"
        @click:link="linkCounter += 1"
        @dismiss="counter += 1"
      >
        <template #description>{{ text }}</template>
        {{ headingText }}
      </fd-toast>
      <fd-toast
        :dismissible="dismissible" kind="success"
        :icon="customIcon ? CubeTransparentIcon : undefined"
        :link-text="linkText"
        :show-timestamp="showTimestamp"
        @click:link="linkCounter += 1"
        @dismiss="counter += 1"
      >
        <template #description>{{ text }}</template>
        {{ headingText }}
      </fd-toast>
      <fd-toast
        :dismissible="dismissible" kind="warning"
        :icon="customIcon ? CubeTransparentIcon : undefined"
        :link-text="linkText"
        :show-timestamp="showTimestamp"
        @click:link="linkCounter += 1"
        @dismiss="counter += 1"
      >
        <template #description>{{ text }}</template>
        {{ headingText }}
      </fd-toast>
      <fd-toast
        :dismissible="dismissible" kind="danger"
        :icon="customIcon ? CubeTransparentIcon : undefined"
        :link-text="linkText"
        :show-timestamp="showTimestamp"
        @click:link="linkCounter += 1"
        @dismiss="counter += 1"
      >
        <template #description>{{ text }}</template>
        {{ headingText }}
      </fd-toast>
    </div>

    <!-- add custom icon version -->
  </div>
</template>

<script lang="ts">
import { defineComponent, inject, shallowRef } from 'vue';
import { CubeTransparentIcon } from '@heroicons/vue/24/solid'
import FdButton from '../../../src/components/Button';
import FdToast from '../../../src/components/toast';
import FdCheckbox from '../../../src/components/Checkbox';
import FdGroup from '../../../src/components/Group';
import { FdInputField, FdSelect } from '../../../src/components/Form';
import { Toast } from '../../../src/utils';
import { describe } from 'node:test';

export default defineComponent({
  name: 'toastPage',
  components: { FdButton, FdCheckbox, FdGroup, FdInputField, FdSelect, FdToast },
  setup() {
    const dismissible = shallowRef(true);
    const showTimestamp = shallowRef(true);
    const text = shallowRef('Use up to 200 characters to tell the user why they\'re getting an alert and if they need to take action. Include a link if needed. The heading can be generic or specific.');
    const headingText = shallowRef('Your warning message - keep it short n’ sweet');
    const counter = shallowRef(0);
    const linkCounter = shallowRef(0);
    const customIcon = shallowRef(false);
    const linkText = shallowRef('Link Text');

    const bg = shallowRef('#fff');

    const deployToast = inject<(toast: Toast) => string>('deployToast');

    function handleDismissClick(e) {
      counter.value += 1;
    }

    function deployRandomToast() {
      if (deployToast) {
        deployToast({
          position: (['top-right', 'top-left', 'bottom-right', 'bottom-left'][Math.floor(Math.random() * 4)] as 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left'),
          props: {
            content: headingText.value,
            description: text.value,
            dismissible: dismissible.value,
            icon: customIcon.value ? CubeTransparentIcon : undefined,
            kind: ['info', 'success', 'warning', 'danger', 'neutral'][Math.floor(Math.random() * 5)],
            linkText: linkText.value,
            showTimestamp: showTimestamp.value,
          },
          onAppear: () => console.log('Toast appeared!'),
          onDismiss: () => {
            console.log('Toast dismissed!')
          },
        });
      }
    }

    return {
      bg,
      counter,
      customIcon,
      deployRandomToast,
      dismissible,
      handleDismissClick,
      headingText,
      linkCounter,
      linkText,
      showTimestamp,
      text,
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
  color: rgba(var(--fora_neutral-8), 1);
}
</style>
