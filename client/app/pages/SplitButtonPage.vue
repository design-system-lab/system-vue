<template>
  <div>
    <h1>Split Buttons</h1>
    <p>Implementation of button group and menu button</p>
    <br>
    <h4 class="mb-4">Default Split Button</h4>
    <fd-group type="button">
      <fd-button>Option Prime</fd-button>
      <fd-menu-button
        icon
        :items="[
          {
            'text': 'Option 01',
            'value': 'option-1',
          },
          {
            'text': 'Option 02',
            'value': 'option-2',
          },
          {
            'text': 'Option 03',
            'value': 'option-3',
          },
        ]"
      />
    </fd-group>
  </div>
</template>

<script lang="ts">
import { defineComponent, shallowRef, inject } from 'vue';
import FdButton from '../../../src/components/Button';
import FdGroup from '../../../src/components/Group';
import FdMenuButton from '../../../src/components/MenuButton';
import { CubeTransparentIcon } from '@heroicons/vue/24/solid'
import { CubeTransparentIcon as CubeTransparentIconSm } from '@heroicons/vue/20/solid'

export default defineComponent({
  name: 'ButtonPage',
  components: { FdButton, FdGroup, FdMenuButton },
  setup () {
    const active = shallowRef(-1);
    const buttons = shallowRef([
      { label: 'First button' },
      { label: 'Second button' },
      { slot: 'third' },
    ]);

    return { active, buttons, CubeTransparentIcon, CubeTransparentIconSm };
  },
})
</script>