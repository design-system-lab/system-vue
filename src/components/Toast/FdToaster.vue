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
<script lang="ts">
import { defineComponent, shallowRef, watch, PropType } from 'vue';
import { useToaster, Toast } from '../../utils';
import FdToast from './FdToast.vue';

export default defineComponent({
  name: 'FdToaster',
  components: { FdToast },
  props: {
    position: {
      type: String,
      default: 'top-right',
      validator: (value: string) => ['top-right', 'top-left', 'bottom-right', 'bottom-left'].includes(value),
    },
    toasts: {
      type: Array as PropType<Toast[]>,
      default: () => [],
    }
  },

  setup(props) {
    const { mapToasts } = useToaster();
    const posToasts = shallowRef(mapToasts(props.toasts));

    watch(() => props.toasts, (newToasts) => {
      posToasts.value = mapToasts(newToasts);
    }, { deep: true });

    return {
      posToasts,
    };
  },
});
</script>
<style lang="scss" scoped>
.fd-toaster {
  &__top-left,
  &__top-right,
  &__bottom-left,
  &__bottom-right {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    position: fixed;
    max-width: min(calc(100% - 2rem), calc(30rem - 1.5rem));
    z-index: 9999;
  }

  &__top-left {
    top: 1rem;
    left: 1rem;
  }

  &__top-right {
    top: 1rem;
    right: 1rem;
  }

  &__bottom-left {
    bottom: 1rem;
    left: 1rem;
  }

  &__bottom-right {
    bottom: 1rem;
    right: 1rem;
  }
}
</style>