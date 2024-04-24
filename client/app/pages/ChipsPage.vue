<template>
  <div>
    <h1>Chip</h1>
    <br>
    <h4>Default Chip</h4>
    <br>
    <fd-chip>Chip Text</fd-chip>
    <fd-chip outlined>Chip Text</fd-chip>
    <fd-chip text="Chip Data Text" />
    <fd-chip text="Outlined Data Text" outlined />

    <h4 class="mt-6">Dismissible Chip</h4>
    <br>
    <fd-chip
      v-if="show"
      dismissible
      @dismiss="show = false"
    >Chip Text</fd-chip>

    <fd-chip
      v-if="show"
      dismissible
      outlined
      @dismiss="show = false"
    >Chip Text</fd-chip>

    <fd-button
      v-if="!show"
      size="xs"
      @click="show = true"
    >Bring back the Chip!</fd-button>

    <h4 class="mt-6">Interactive Chip</h4>
    <br>
    <fd-chip
      interactive
      @click="counter += 1"
    >Chip Text</fd-chip>
    <fd-chip
      dismissible
      interactive
      @click="counter += 1"
    >Chip Text</fd-chip>
    <fd-chip
      interactive
      outlined
      @click="counter += 1"
    >Chip Text</fd-chip>
    <fd-chip
      dismissible
      interactive
      outlined
      @click="counter += 1"
    >Chip Text</fd-chip>
    <p class="mt-2">Times clicked: {{ counter }}</p>
    
    <h4 class="mt-6">Selectable Chip</h4>
    <br>
    <fd-chip
      v-model="val"
      interactive
    >Chip Text</fd-chip>

  </div>
</template>

<script lang="ts">
import { defineComponent, shallowRef, ref } from 'vue';
import FdButton from '../../../src/components/Button/FdButton.vue';
import FdChip from '../../../src/components/Chip';
import FdGroup from '../../../src/components/Group';

export default defineComponent({
  name: 'ChipPage',
  components: { FdButton, FdChip, FdGroup },
  setup() {
    const counter = ref(0);
    const show = ref(true);
    const val = shallowRef(false);

    return {
      counter,
      show,
      val,
    };
  }
})
</script>