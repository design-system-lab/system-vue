<template>
  <div>
    <h1>Home</h1>
    <p>Foundations:</p>
    <ul>
      <li><router-link :to="{ name: 'Colors' }">Colors</router-link></li>
      <li><router-link :to="{ name: 'Icons'} ">Icons</router-link></li>
      <li><router-link :to="{ name: 'Typography'} ">Typography</router-link></li>
    </ul>

    <p>Components:</p>
    <ul>
      <li><router-link :to="{ name: 'Buttons' }">Buttons</router-link></li>
      <li><router-link :to="{ name: 'Grid' }">Grid</router-link></li>
      <li><router-link :to="{ name: 'Group' }">Groups</router-link></li>
      <li><router-link :to="{ name: 'InputField' }">Input Fields</router-link></li>
      <li><router-link :to="{ name: 'Select' }">Select</router-link></li>
      <li><router-link :to="{ name: 'Toggle' }">Toggle</router-link></li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import FdButton from '../../../src/components/Button';

export default defineComponent({
  components: { FdButton },
})
</script>