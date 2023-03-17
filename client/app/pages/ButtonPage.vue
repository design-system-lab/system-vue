<template>
  <div>
    <h1>Home</h1>
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
    <fd-button kind="secondary">Secondary Button</fd-button>
    <br><br>
    <fd-button kind="tertiary">Tertiary Button</fd-button>
    <br><br>
    <fd-button kind="tertiary-neutral">Tertiary Neutral Button</fd-button>
    <br><br>
    <fd-button kind="link">Link Button</fd-button>
    <br><br>
    <fd-button kind="destructive">Destructive Button</fd-button>
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

    <fd-button class="mr-2" icon>
      <fd-icon
        :icon="CubeTransparentIcon"
      />
    </fd-button>
    <fd-button class="mr-2" kind="secondary" icon>
      <fd-icon
        :icon="CubeTransparentIcon"
      />
    </fd-button>
    <fd-button class="mr-2" kind="tertiary" icon>
      <fd-icon
        :icon="CubeTransparentIcon"
      />
    </fd-button>
    <fd-button class="mr-2" kind="tertiary-neutral" icon>
      <fd-icon
        :icon="CubeTransparentIcon"
      />
    </fd-button>
    <fd-button class="mr-2" kind="link" icon>
      <fd-icon
        :icon="CubeTransparentIcon"
      />
    </fd-button>
    <fd-button class="mr-2" kind="destructive" icon>
      <fd-icon
        :icon="CubeTransparentIcon"
      />
    </fd-button>
    <br><br>

    <fd-button size="xs" icon>
      <fd-icon
        :icon="CubeTransparentIconSm"
        :size="20"
      />
    </fd-button>
    <br><br>
    <fd-button size="sm" icon>
      <fd-icon
        :icon="CubeTransparentIconSm"
        :size="20"
      />
    </fd-button>
    <br><br>
    <fd-button icon>
      <fd-icon
        :icon="CubeTransparentIcon"
      />
    </fd-button>
    <br><br>
    <fd-button size="lg" icon>
      <fd-icon
        :icon="CubeTransparentIcon"
      />
    </fd-button>
    <br><br>
    <fd-button size="xl" icon>
      <fd-icon
        :icon="CubeTransparentIcon"
      />
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
  </div>
</template>

<script lang="ts">
import { defineComponent, shallowRef, inject } from 'vue';
import FdButton from '../../../src/components/Button';
import { ThemeSupport } from '../../../src/utils/theme';
import { TranslationSupport } from '../../../src/utils/i18n';
import FdIcon from '../../../src/components/Icon';
import { CubeTransparentIcon } from '@heroicons/vue/24/solid'
import { CubeTransparentIcon as CubeTransparentIconSm } from '@heroicons/vue/20/solid'

export default defineComponent({
  name: 'ButtonPage',
  components: { FdButton, FdIcon },
  setup () {
    const testVal = shallowRef(false);
    const { theme, updateTheme } = inject('theme') as ThemeSupport;
    const { updateLang, t, lang } = inject('i18n') as TranslationSupport;

    return { testVal, theme, updateTheme, updateLang, t, lang, CubeTransparentIcon, CubeTransparentIconSm };
  },
})
</script>