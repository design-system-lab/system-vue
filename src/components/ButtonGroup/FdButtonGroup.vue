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
import { defineComponent, PropType } from 'vue';
import FdButton from '../Button/FdButton.vue';
import { tshirt } from '../../utils';
import { ButtonGroupButton, ButtonKind, TshirtSize } from '../../types';

export default defineComponent({
  name: 'FdButtonGroup',
  components: { FdButton },
  props: {
    buttons: {
      type: Array as PropType<ButtonGroupButton[]>,
      default: () => [],
    },
    kind:  {
      type: String as PropType<ButtonKind>,
      default: 'primary',
    },
    modelValue: {
      type: Number,
      default: -1,
    },
    // radio functions like a true radio, where once it's on it doesn't turn off
    // alternately you could handle it with all the buttons set to toggle
    radio: {
      type: Boolean,
      default: false,
    },
    size: {
      type: String as PropType<TshirtSize>,
      default: 'md',
      validator: (opt: string) => tshirt(opt),
    },
  },
  emits: ['click', 'update:modelValue'],
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
