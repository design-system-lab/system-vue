<script lang="ts" setup>
import { shallowRef, watch } from 'vue';
import FdToast from './FdToast.vue';
import { useToaster } from '../../utils';
import type { ToasterProps } from '../../types';

/**
 * Toaster component
 * The toaster component is responsible for displaying toasts in the correct position
 * 
 * @param {string} position - The position of the toaster
 * @param {Toast[]} toasts - The toasts to display
 */

const props = withDefaults(defineProps<ToasterProps>(), {
  position: 'top-right',
  toasts: () => [],
});
  
const { mapToasts } = useToaster();
const posToasts = shallowRef(mapToasts(props.toasts));

watch(() => props.toasts, (newToasts) => {
  posToasts.value = mapToasts(newToasts);
}, { deep: true });
</script>

<template>
  <div class="fd-toaster">
    <div
      v-if="posToasts['top-left'].length"  
      class="fd-toaster__top-left"
    >
      <FdToast
        v-for="toast in posToasts['top-left']"
        :key="toast.id"
        v-bind="toast.props"
        @dismiss="toast.onDismiss"
        @click:link="toast.onClickLink"
      />
    </div>
    <div
      v-if="posToasts['top-right'].length"
      class="fd-toaster__top-right"
    >
      <FdToast
        v-for="toast in posToasts['top-right']"
        :key="toast.id"
        v-bind="toast.props"
        @dismiss="toast.onDismiss"
        @click:link="toast.onClickLink"
      />
    </div>
    <div
      v-if="posToasts['bottom-right'].length"
      class="fd-toaster__bottom-right"
    >
      <FdToast
        v-for="toast in posToasts['bottom-right']"
        :key="toast.id"
        v-bind="toast.props"
        @dismiss="toast.onDismiss"
        @click:link="toast.onClickLink"
      />
    </div>
    <div
      v-if="posToasts['bottom-left'].length"
      class="fd-toaster__bottom-left"
    >
      <FdToast
        v-for="toast in posToasts['bottom-left']"
        :key="toast.id"
        v-bind="toast.props"
        @dismiss="toast.onDismiss"
        @click:link="toast.onClickLink"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "@/styles/required";

.fd-toaster {
  &__top-left,
  &__top-right,
  &__bottom-left,
  &__bottom-right {
    display: flex;
    flex-direction: column;
    gap: $toaster_gap;
    position: fixed;
    max-width: $toaster_max-width;
    z-index: 9999;
  }

  &__top-left {
    top: $toaster_edge-spacing;
    left: $toaster_edge-spacing;
  }

  &__top-right {
    top: $toaster_edge-spacing;
    right: $toaster_edge-spacing;
  }

  &__bottom-left {
    bottom: $toaster_edge-spacing;
    left: $toaster_edge-spacing;
  }

  &__bottom-right {
    bottom: $toaster_edge-spacing;
    right: $toaster_edge-spacing;
  }
}
</style>