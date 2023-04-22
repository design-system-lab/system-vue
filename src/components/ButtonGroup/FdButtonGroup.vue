<template>
  <div class="fd-button-group">
    <slot>
      <fd-button
        v-for="(button, i) in buttons"
        :key="i"
        :append-icon="button.appendIcon"
        :disabled="button.disabled"
        :href="button.href"
        :icon="button.icon"
        :kind="kind"
        :model-value="i === modelValue"
        :prepend-icon="button.prependIcon"
        :size="size"
        :to="button.to"
        :toggle="radio || button.toggle"
        @click="handleClick(i, $event)"
      >
        <slot :name="button.slot">
          {{ button.label }}
        </slot>
      </fd-button>
    </slot>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import FdButton from '../Button/FdButton.vue';
import { buttonGroupProps } from '../../composables/group';

export default defineComponent({
  name: 'FdButtonGroup',
  components: { FdButton },
  props: {
    ...buttonGroupProps,
  },
  setup(props, { emit }) {
    const handleClick = (i: number, e: MouseEvent) => {
      if (props.radio) {
        emit('update:modelValue', i);
      }

      emit('click', e)
    }

    return { handleClick };
  }
});
</script>
