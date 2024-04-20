<template>
  <div
    class="fd-chip"
    :class="{
      'fd-chip--dismissible': dismissible,
      'fd-chip--danger': status === 'danger',
      'fd-chip--info': status === 'info',
      'fd-chip--interactive': interactive,
      'fd-chip--outlined': outlined,
      'fd-chip--selected': selected,
      'fd-chip--success': status === 'success',
      'fd-chip--warning': status === 'warning',
    }"
  >
    <span
      v-if="icon || $slots['icon']"
      class="fd-chip__icon"
    >
      {{ icon }}
    </span>
    <slot />
    <span
      v-if="dismissible"
      class="fd-chip__close"
      @click="onClose"
    >
      
    </span>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { StopLight } from '../../types';

export default defineComponent({
  name: 'FdChip',
  props: {
    dismissible: {
      type: Boolean,
      default: false
    },
    icon: {
      type: String,
      default: ''
    },
    interactive: {
      type: Boolean,
      default: false
    },
    label: {
      type: String,
      default: ''
    },
    outlined: {
      type: Boolean,
      default: false
    },
    selected: {
      type: Boolean,
      default: false
    },
    status: {
      type: String as PropType<StopLight | undefined>,
      default: undefined,
    },
  },
    setup(props, { emit }) {
        const onClose = () => {
            emit('close');
        };

        return {
            onClose
        };
    }
});
</script>

<style lang="scss" scoped>
@import '../../styles/required';

.fd-chip {
  background-color: rgba(var(--fora_neutral-3), 1);
  border-radius: 1000px;
  display: inline-flex;
  font-size: $font-sm;
  line-height: 1.25rem;
  padding: 0.25rem 0.75rem;
}
</style>
