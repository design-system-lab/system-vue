<template>
  <div>
    <h1>Home</h1>
    <br>
    <h4>Example icons:</h4>
    <fd-icon :icon="BeakerIcon" />
    <fd-icon>
      <CheckIcon />
    </fd-icon>
    <fd-icon>
      <BackspaceIcon />
    </fd-icon>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import FdIcon from '../../../src/components/Icon';
import { BeakerIcon, CheckIcon, BackspaceIcon } from '@heroicons/vue/24/solid'

export default defineComponent({
  name: 'IconPage',
  components: { CheckIcon, BackspaceIcon, FdIcon },
  setup() {
    return { BeakerIcon };
  }
})
</script>