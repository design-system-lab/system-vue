<script lang="ts" setup>
import FdButton from '../Button/FdButton.vue';
import type { ButtonGroupProps } from '../../types';

const props = withDefaults(defineProps<ButtonGroupProps>(), {
  buttons: () => [],
  kind: 'primary',
  modelValue: -1,
  radio: false,
  size: 'md',
});

const emit = defineEmits<{
  (e: 'click', event: MouseEvent): void;
  (e: 'update:modelValue', value: number): void;
}>();

function handleClick(i: number, e: MouseEvent) {
  if (props.radio) {
    emit('update:modelValue', i);
  }

  emit('click', e)
}
</script>

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
