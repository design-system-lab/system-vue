<template>
  <div>
    <h1>Buttons</h1>
    <br>
    <h4 class="mb-4">Default Button</h4>
    <fd-button @click="updateTheme('dark')">
      Change Theme
    </fd-button>
    <br><br>

    <h4 class="mb-4">Toggle Button</h4>
    <fd-button
      class="mb-2"
      toggle
      v-model="testVal"
      @click="updateLang('fr')"
    >
      Change Lang
    </fd-button>

    <p>Close translation: {{ t('close') }}</p>
    <p>Language: {{ lang }}</p>
    <br><br>

    <h4 class="mb-4">Block Button</h4>
    <fd-button
      block
    >
      Test Button
    </fd-button>
    <br>

    <h4 class="mb-4">Button Kinds</h4>

    <fd-button>Primary Button</fd-button>
    <br><br>
    <fd-button kind="danger">Secondary Button</fd-button>
    <br><br>
    <fd-button kind="neutral">Tertiary Button</fd-button>
    <br><br>

    <h4 class="mb-4">Button Modes</h4>

    <fd-button>Filled Button</fd-button>
    <br><br>
    <fd-button mode="outlined">Secondary Button</fd-button>
    <br><br>
    <fd-button mode="text">Text Button</fd-button>
    <br><br>

    <h4 class="mb-4">Button Sizes</h4>
    <fd-button size="xs">Primary Button</fd-button>
    <br><br>
    <fd-button size="sm">Primary Button</fd-button>
    <br><br>
    <fd-button>Primary Button</fd-button>
    <br><br>
    <fd-button size="lg">Primary Button</fd-button>
    <br><br>
    <fd-button size="xl">Primary Button</fd-button>
    <br><br>

    <h4 class="mb-4">Icon Buttons</h4>

    <fd-button class="mr-2" :icon="CubeTransparentIcon" />
    <fd-button class="mr-2" kind="danger" :icon="CubeTransparentIcon" />
    <fd-button class="mr-2" kind="neutral" :icon="CubeTransparentIcon" />
    <fd-button class="mr-2" mode="outlined" :icon="CubeTransparentIcon" />
    <fd-button class="mr-2" kind="danger" mode="outlined" :icon="CubeTransparentIcon" />
    <fd-button class="mr-2" kind="neutral" mode="outlined" :icon="CubeTransparentIcon" />
    <br><br>

    <fd-button size="xs">
      <template #icon>
        <fd-icon
          :icon="CubeTransparentIconSm"
          :size="20"
        />
      </template>
    </fd-button>
    <br><br>
    <fd-button size="sm">
      <template #icon>
        <fd-icon
          :icon="CubeTransparentIconSm"
          :size="20"
        />
      </template>
    </fd-button>
    <br><br>
    <fd-button>
      <template #icon>
        <fd-icon
          :icon="CubeTransparentIconSm"
        />
      </template>
    </fd-button>
    <br><br>
    <fd-button size="lg">
      <template #icon>
        <fd-icon
          :icon="CubeTransparentIconSm"
        />
      </template>
    </fd-button>
    <br><br>
    <fd-button size="xl">
      <template #icon>
        <fd-icon
          :icon="CubeTransparentIconSm"
        />
      </template>
    </fd-button>
    <br><br>

    <h4 class="mb-4">Buttons with Icons</h4>
    <fd-button
      class="mr-2"
      :prepend-icon="CubeTransparentIconSm"
      size="xs"
    >
      Primary Button
    </fd-button>
    <fd-button
      :append-icon="CubeTransparentIconSm"
      size="xs"
    >
      Primary Button
    </fd-button>
    <br><br>
    <fd-button
      class="mr-2"
      :prepend-icon="CubeTransparentIconSm"
      size="sm"
    >
      Primary Button
    </fd-button>
    <fd-button
      :append-icon="CubeTransparentIconSm"
      size="sm"
    >
      Primary Button
    </fd-button>
    <br><br>
    <fd-button
      class="mr-2"
      :prepend-icon="CubeTransparentIcon"
    >
      Primary Button
    </fd-button>
    <fd-button
      :append-icon="CubeTransparentIcon"
    >
      Primary Button
    </fd-button>
    <br><br>
    <fd-button
      class="mr-2"
      :prepend-icon="CubeTransparentIcon"
      size="lg"
    >
      Primary Button
    </fd-button>
    <fd-button
      :append-icon="CubeTransparentIcon"
      size="lg"
    >
      Primary Button
    </fd-button>
    <br><br>
    <fd-button
      class="mr-2"
      :prepend-icon="CubeTransparentIcon"
      size="xl"
    >
      Primary Button
    </fd-button>
    <fd-button
      :append-icon="CubeTransparentIcon"
      size="xl"
    >
      Primary Button
    </fd-button>
    <br><br>

    <h4 class="mb-4">Disabled buttons</h4>

    <fd-button disabled>Filled</fd-button>
    <br><br>
    <fd-button disabled mode="outlined">Outlined</fd-button>
    <br><br>
    <fd-button disabled mode="text">Text</fd-button>
    <br><br>

    <fd-button disabled class="mr-2" :icon="CubeTransparentIcon" />
    <br><br>

    <h4 class="mb-4">Button elements</h4>
    <fd-button href="http://example.com">Anchor element</fd-button>
    <br><br>
    <!-- <fd-button to="/">Router link element</fd-button> -->
    <fd-button tag="div">Div... but don't do this</fd-button>
    <br><br>
    <fd-button>Button element</fd-button>
    <br><br>

    <h4 class="mb-4">Close Button</h4>
    <div class="close-container">
      <fd-close-button size="lg" /><fd-close-button /><fd-close-button size="sm" />
    </div>
    <div class="close-container">
      <fd-close-button size="lg" round /><fd-close-button round /><fd-close-button size="sm" round />
    </div>
    <div class="close-container">
      <fd-close-button size="lg" disabled /><fd-close-button disabled /><fd-close-button size="sm" disabled />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, shallowRef, inject } from 'vue';
import FdButton from '../../../src/components/Button';
import FdCloseButton from '../../../src/components/CloseButton';
import { ThemeSupport } from '../../../src/utils/theme';
import { TranslationSupport } from '../../../src/utils/i18n';
import FdIcon from '../../../src/components/Icon';
import { CubeTransparentIcon } from '@heroicons/vue/24/solid'
import { CubeTransparentIcon as CubeTransparentIconSm } from '@heroicons/vue/20/solid'

export default defineComponent({
  name: 'ButtonPage',
  components: { FdButton, FdCloseButton, FdIcon },
  setup () {
    const testVal = shallowRef(false);
    const { theme, updateTheme } = inject('theme') as ThemeSupport;
    const { updateLang, t, lang } = inject('i18n') as TranslationSupport;

    return { testVal, theme, updateTheme, updateLang, t, lang, CubeTransparentIcon, CubeTransparentIconSm };
  },
})
</script>

<style lang="scss" scoped>
.close-container {
  display: flex;
  gap: 1rem;
  margin-bottom: 0.5rem;
}
</style>
