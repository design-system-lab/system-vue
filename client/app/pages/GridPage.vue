<template>
  <div>
    <h1 class="mb-2">
      Grid
    </h1>
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
    
    <h2 class="mb-2">
      Align items
    </h2>
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

    <h2 class="mb-2">
      Justify Items
    </h2>

    <select v-model="justify" class="mb-4">
      <option>justify-start</option>
      <option>justify-center</option>
      <option>justify-end</option>
      <option>justify-between</option>
      <option>justify-around</option>
      <option>justify-evenly</option>
    </select>
    <div class="outlined">
      <fd-row v-bind="{ [justify]: true }">
        <fd-col col="3">
          <div class="box" />
        </fd-col>
        <fd-col col="3">
          <div class="box" />
        </fd-col>
        <fd-col col="3">
          <div class="box" />
        </fd-col>
      </fd-row>
    </div>

    <h2 class="mb-2">
      Ordering
    </h2>
    <h4 class="mb-2">
      Independent ordering
    </h4>
    <div class="outlined">
      <fd-row>
        <fd-col order="last">
          <div class="box">
            First but last
          </div>
        </fd-col>
        <fd-col>
          <div class="box">
            First middle child
          </div>
        </fd-col>
        <fd-col>
          <div class="box">
            Second middle child
          </div>
        </fd-col>
        <fd-col order="first">
          <div class="box">
            Last but first
          </div>
        </fd-col>
      </fd-row>
    </div>

    <h4 class="mb-2">
      Row reverse
    </h4>
    <div class="outlined">
      <fd-row reverse>
        <fd-col>
          <div class="box">
            First but last
          </div>
        </fd-col>
        <fd-col>
          <div class="box">
            Middle child
          </div>
        </fd-col>
        <fd-col>
          <div class="box">
            Last but first
          </div>
        </fd-col>
      </fd-row>
    </div>

    <h4 class="mb-2">
      Offset
    </h4>
    <div class="outlined">
      <fd-row>
        <fd-col col="4" offset="4">
          <div class="box">
            Offset by 4 cols
          </div>
        </fd-col>
        <fd-col col="3" offset="1">
          <div class="box">
            Offset by 1 col
          </div>
        </fd-col>
        <fd-col col="4">
          <div class="box">
            No offset
          </div>
        </fd-col>
        <fd-col col="4" offset="4">
          <div class="box">
            Offset by 4 cols
          </div>
        </fd-col>
      </fd-row>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, shallowRef } from 'vue';
import FdCol from '../../../src/components/Col';
import FdRow from '../../../src/components/Row';

export default defineComponent({
  name: 'GridPage',
  components: { FdCol, FdRow },
  setup() {
    const justify = shallowRef('justify-start');

    return { justify };
  }
})
</script>

<style lang="scss" scoped>
.box {
  background-color: rgba(var(--fora-neutral-4));
  border: 2px solid rgba(var(--fora-white));
  min-height: 200px;
  padding: 1.5rem;
  width: 100%;
}

.tall {
  min-height: 400px;
}

.outlined {
  border: 1px solid rgba(var(--fora-white));
  margin-bottom: 2rem;
}
</style>
