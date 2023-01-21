<template>
  <div>
    <h1>Home</h1>
    <br>
    <h4>Default Button</h4>
    <fd-button @click="updateTheme('dark')">
      Change Theme
    </fd-button>
    <br><br>

    <h4>Toggle Button</h4>
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

    <h4>Block Button</h4>
    <fd-button
      block
    >
      Test Button
    </fd-button>
    <br>

    <h4>Outlined Button</h4>
    <fd-button
      outlined
    >
      Change Language
    </fd-button>
  </div>
</template>

<script lang="ts">
import { defineComponent, shallowRef, inject } from 'vue';
import FdButton from '../../../src/components/Button';
import { ThemeSupport } from '../../../src/utils/theme';
import { TranslationSupport } from '../../../src/utils/i18n';

export default defineComponent({
  components: { FdButton },
  setup () {
    const testVal = shallowRef(false);
    const { theme, updateTheme } = inject('theme') as ThemeSupport;
    const { updateLang, t, lang } = inject('i18n') as TranslationSupport;

    return { testVal, theme, updateTheme, updateLang, t, lang };
  },
})
</script>