<template>
  <div>
    <h1>Grid</h1>
    <div class="outlined">
      <fd-row reverse>
        <fd-col>
          <div class="box" />
        </fd-col>
        <fd-col>
          <div class="box" />
        </fd-col>
        <fd-col>
          <div class="box" />
        </fd-col>
      </fd-row>
    </div>
    
    <h2>Align items</h2>
    <div class="outlined">
      <fd-row class="tall">
        <fd-col align-start>
          <div class="box" />
        </fd-col>
        <fd-col align-center>
          <div class="box" />
        </fd-col>
        <fd-col align-end>
          <div class="box" />
        </fd-col>
      </fd-row>
    </div>

    <h2>Justify Items</h2>
    <div class="outlined">
      <fd-row>
        <fd-col col="12 md-8 lg-6">
          <div class="box" />
        </fd-col>
        <fd-col>
          <div class="box" />
        </fd-col>
        <fd-col>
          <div class="box" />
        </fd-col>
      </fd-row>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import FdCol from '../../../src/components/Col';
import FdRow from '../../../src/components/Row';

export default defineComponent({
  name: 'GridPage',
  components: { FdCol, FdRow },
})
</script>

<style lang="scss" scoped>
@import '@/styles/required';

.box {
  background-color: $neutral-5;
  min-height: 200px;
  width: 100%;
}

.tall {
  min-height: 400px;
}

.outlined {
  border: 1px solid $black;
  margin-bottom: 2rem;
}
</style>
