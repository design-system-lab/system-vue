<template>
  <div>
    <h1>Buttons</h1>
    <br>
    <h4 class="mb-4">Default Button Group</h4>
    <fd-group type="button">
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
    </fd-group>

    <br><br>

    <fd-group
      v-model="active"
      :buttons="buttons"
      kind="secondary"
      size="xs"
      radio
      type="button"
    >
      <template #third>
        Third Button
      </template>
    </fd-group>

    <br><br>

    <fd-group type="button">
      <fd-button kind="tertiary">
        Example one
      </fd-button>
      <fd-button kind="tertiary">
        Example two
      </fd-button>
      <fd-button kind="tertiary">
        Example three
      </fd-button>
      <fd-button kind="tertiary">
        Example four
      </fd-button>
    </fd-group>

    <br><br>

    <fd-group type="button">
      <fd-button kind="tertiary-neutral">
        Example one
      </fd-button>
      <fd-button kind="tertiary-neutral">
        Example two
      </fd-button>
      <fd-button kind="tertiary-neutral">
        Example three
      </fd-button>
      <fd-button kind="tertiary-neutral">
        Example four
      </fd-button>
    </fd-group>

    <br><br>

    <fd-group type="button">
      <fd-button kind="link" size="lg">
        Example one
      </fd-button>
      <fd-button kind="link" size="lg">
        Example two
      </fd-button>
      <fd-button kind="link" size="lg">
        Example three
      </fd-button>
      <fd-button kind="link" size="lg">
        Example four
      </fd-button>
    </fd-group>
  </div>
</template>

<script lang="ts">
import { defineComponent, shallowRef, inject } from 'vue';
import FdButton from '../../../src/components/Button';
import FdGroup from '../../../src/components/Group';
import FdIcon from '../../../src/components/Icon';
import { CubeTransparentIcon } from '@heroicons/vue/24/solid'
import { CubeTransparentIcon as CubeTransparentIconSm } from '@heroicons/vue/20/solid'

export default defineComponent({
  name: 'ButtonPage',
  components: { FdButton, FdGroup, FdIcon },
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