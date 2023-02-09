<template>
  <div>
    <h1 class="mb-4">Default Color Pallete</h1>
    <h4 class="mb-2">Primary</h4>
    <div class="color-group">
      <div
        v-for="(c, i) in primaryColors"
        :key="i"
        class="color"
        :style="{ backgroundColor: c.hex }"
      >
        <p
          class="color__text"
          :class="`color__text--${c.dark ? 'white' : 'black'}`"
        >
          <span class="color__var">{{ c.var }}</span><br>
          <span class="color__css-var">{{ c.cssVar }}</span><br>
          <span class="color__hex">{{ c.hex }}</span>
        </p>
      </div>
    </div>
    
    <h4 class="mb-2 mt-6">Secondary</h4>
    <div class="color-group">
      <div
        v-for="(c, i) in secondaryColors"
        :key="i"
        class="color"
        :style="{ backgroundColor: c.hex }"
      >
        <p
          class="color__text"
          :class="`color__text--${c.dark ? 'white' : 'black'}`"
        >
          <span class="color__var">{{ c.var }}</span><br>
          <span class="color__css-var">{{ c.cssVar }}</span><br>
          <span class="color__hex">{{ c.hex }}</span>
        </p>
      </div>
    </div>

    <h4 class="mb-2 mt-6">Success</h4>
    <div class="color-group">
      <div
        v-for="(c, i) in successColors"
        :key="i"
        class="color"
        :style="{ backgroundColor: c.hex }"
      >
        <p
          class="color__text"
          :class="`color__text--${c.dark ? 'white' : 'black'}`"
        >
          <span class="color__var">{{ c.var }}</span><br>
          <span class="color__css-var">{{ c.cssVar }}</span><br>
          <span class="color__hex">{{ c.hex }}</span>
        </p>
      </div>
    </div>

    <h4 class="mb-2 mt-6">Warning</h4>
    <div class="color-group">
      <div
        v-for="(c, i) in warningColors"
        :key="i"
        class="color"
        :style="{ backgroundColor: c.hex }"
      >
        <p
          class="color__text"
          :class="`color__text--${c.dark ? 'white' : 'black'}`"
        >
          <span class="color__var">{{ c.var }}</span><br>
          <span class="color__css-var">{{ c.cssVar }}</span><br>
          <span class="color__hex">{{ c.hex }}</span>
        </p>
      </div>
    </div>

    <h4 class="mb-2 mt-6">Danger</h4>
    <div class="color-group">
      <div
        v-for="(c, i) in dangerColors"
        :key="i"
        class="color"
        :style="{ backgroundColor: c.hex }"
      >
        <p
          class="color__text"
          :class="`color__text--${c.dark ? 'white' : 'black'}`"
        >
          <span class="color__var">{{ c.var }}</span><br>
          <span class="color__css-var">{{ c.cssVar }}</span><br>
          <span class="color__hex">{{ c.hex }}</span>
        </p>
      </div>
    </div>

    <h4 class="mb-2 mt-6">Neutral</h4>
    <div class="color-group">
      <div
        v-for="(c, i) in neutralColors"
        :key="i"
        class="color"
        :style="{ backgroundColor: c.hex }"
      >
        <p
          class="color__text"
          :class="`color__text--${c.dark ? 'white' : 'black'}`"
        >
          <span class="color__var">{{ c.var }}</span><br>
          <span class="color__css-var">{{ c.cssVar }}</span><br>
          <span class="color__hex">{{ c.hex }}</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { primaryColors, secondaryColors, successColors, warningColors, dangerColors, neutralColors } from '../utils';

export default defineComponent({
  name: 'ColorsPage',
  setup () {
    

    return { primaryColors, secondaryColors, successColors, warningColors, dangerColors, neutralColors };
  },
})
</script>

<style lang="scss" scoped>
.color-group {
  width: 100%;
  display: flex;
  margin: -4px;
}

.color {
  width: 10%;
  height: 100%;
  padding: 8px;
  font-size: .75rem;
  margin: 4px;
  border-radius: 5px;

  &__css-var {
    white-space: nowrap;
  }

  &__text--white {
    color: #fff;
  }
}
</style>