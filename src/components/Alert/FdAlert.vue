<template>
  <div class="fd-alert" :class="[`fd-alert--${kind}`]">
    <div class="fd-alert__icon">
      <fd-icon :icon="getIcon" />
    </div>
    <div class="fd-alert__content">
      <p class="fd-alert__heading"><slot name="heading"></slot></p>
      <p class="fd-alert__text"><slot></slot></p>
      <button v-if="showLink" class="fd-alert__link fd-link" @click="$emit('click:link')">Link</button>
    </div>
    <div v-if="dismissible" class="fd-alert__close">
      <fd-close-button size="lg" @click="$emit('dismiss')" />
    </div>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, PropType } from 'vue'
import {
  CheckCircleIcon,
  ExclamationCircleIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
} from '@heroicons/vue/24/solid';
import FdCloseButton from '../CloseButton/FdCloseButton.vue';
import FdIcon from '../Icon';
import { Icon } from '../../types';

export default defineComponent({
  name: 'FdAlert',
  components: { FdCloseButton, FdIcon },
  props: {
    dismissible: {
      type: Boolean,
      default: false,
    },
    icon: {
      type: Function as PropType<Icon>,
    },
    kind: {
      type: String as PropType<'info' | 'success' | 'warning' | 'danger' | 'neutral'>,
      default: 'info',
    },
    showLink: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const getIcon = computed(() => {
      if (props.icon) return props.icon;

      switch (props.kind) {
        case 'info':
          return InformationCircleIcon;
        case 'success':
          return CheckCircleIcon;
        case 'warning':
          return ExclamationTriangleIcon;
        case 'danger':
          return ExclamationCircleIcon;
        default:
          return InformationCircleIcon;
      }
    });

    return { getIcon };
  }
});
</script>
<style lang="scss" scoped>
@import "@/styles/required";

.fd-alert {
  align-items: flex-start;
  background-color: rgba(var(--fora_secondary-1), 1);
  border: 1px solid rgba(var(--fora_secondary-3), 1);
  border-radius: 0;
  color: rgba(var(--fora_secondary-6), 1);
  display: flex;
  gap: 0.75rem;
  padding: 0.75rem;

  &__icon {
    align-items: center;
    display: flex;
    justify-content: center;
  }

  &__content {
    flex: 1 1 0;
    padding: 0.125rem 0;
  }

  &__heading {
    color: rgba(var(--fora_neutral-13), 1);
    font-size: $font-sm;
    font-weight: $font-medium;
    line-height: 1.25rem;
  }

  &__text {
    color: rgba(var(--fora_neutral-8), 1);
    font-size: $font-sm;
    font-weight: $font-regular;
    line-height: 1.25rem;
  }

  &--neutral {
    background-color: rgba(var(--fora_neutral-1), 1);
    border-color: rgba(var(--fora_neutral-3), 1);
    color: rgba(var(--fora_neutral-6), 1);
  }

  &--success {
    background-color: rgba(var(--fora_success-1), 1);
    border-color: rgba(var(--fora_success-3), 1);
    color: rgba(var(--fora_success-6), 1);
  }

  &--warning {
    background-color: rgba(var(--fora_warning-1), 1);
    border-color: rgba(var(--fora_warning-3), 1);
    color: rgba(var(--fora_warning-6), 1);
  }

  &--danger {
    background-color: rgba(var(--fora_danger-1), 1);
    border-color: rgba(var(--fora_danger-3), 1);
    color: rgba(var(--fora_danger-6), 1);
  }
}
</style>
