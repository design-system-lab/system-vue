<template>
  <div>
    <h1>Buttons</h1>
    <br>
    <h4 class="mb-4">Default Button Group</h4>
    <fd-button-group>
      <fd-button>
        Example one
      </fd-button>
      <fd-button>
        Example two
      </fd-button>
      <fd-button>
        Example three
      </fd-button>
      <fd-button>
        Example four
      </fd-button>
    </fd-button-group>

    <br><br>

    <fd-button-group v-model="active" :buttons="buttons" kind="secondary" size="xs" radio>
      <template v-slot:third>
        Third Button
      </template>
    </fd-button-group>
  </div>
</template>

<script lang="ts">
import { defineComponent, shallowRef, inject } from 'vue';
import FdButton from '../../../src/components/Button';
import FdButtonGroup from '../../../src/components/ButtonGroup';
import FdIcon from '../../../src/components/Icon';
import { CubeTransparentIcon } from '@heroicons/vue/24/solid'
import { CubeTransparentIcon as CubeTransparentIconSm } from '@heroicons/vue/20/solid'

export default defineComponent({
  name: 'ButtonPage',
  components: { FdButton, FdButtonGroup, FdIcon },
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