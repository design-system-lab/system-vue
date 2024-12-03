<template>
  <div
    class="fd-toast"
    :class="[`fd-toast--${kind}`]"
  >
    <div class="fd-toast__icon">
      <fd-icon :icon="getIcon" />
    </div>
    <div class="fd-toast__content">
      <p class="fd-toast__heading">
        <slot name="heading" />
      </p>
      <p class="fd-toast__text">
        <slot />
      </p>
      <slot name="link">
        <button
          v-if="linkText"
          class="fd-toast__link fd-link"
          @click="$emit('click:link')"
        >
          {{ linkText }}
        </button>
      </slot>
    </div>
    <div
      v-if="dismissible"
      class="fd-toast__close"
    >
      <fd-close-button
        size="lg"
        @click="$emit('dismiss')"
      />
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
  name: 'Fdtoast',
  components: { FdCloseButton, FdIcon },
  props: {
    dismissible: {
      type: Boolean,
      default: false,
    },
    icon: {
      type: Function as PropType<Icon>,
      default: undefined,
    },
    kind: {
      type: String as PropType<'info' | 'success' | 'warning' | 'danger' | 'neutral'>,
      default: 'info',
    },
    linkText: {
      type: String,
      default: undefined,
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

.fd-toast {
  align-items: flex-start;
  background-color: rgba(var(--fora_toast_bg));
  border: $toast_border rgba(var(--fora_toast_border-color));
  border-radius: $toast_border-radius;
  color: rgba(var(--fora_toast_color));
  display: flex;
  gap: $toast_gap;
  padding: $toast_padding;

  &__icon {
    align-items: center;
    display: flex;
    justify-content: center;
  }

  &__content {
    flex: 1 1 0;
    padding: 0.125rem 0;
    display: flex;
    flex-direction: column;
    gap: $toast_content_gap;
  }

  &__heading {
    color: rgba(var(--fora_toast_heading_color));
    font-size: $toast_heading_font-size;
    font-weight: $toast_heading_font-weight;
    line-height: $toast_heading_line-height;
  }

  &__text {
    color: rgba(var(--fora_toast_text_color));
    font-size: $toast_text_font-size;
    font-weight: $toast_text_font-weight;
    line-height: $toast_text_line-height;
  }

  &--neutral {
    background-color: rgba(var(--fora_toast_neutral_bg));
    border-color: rgba(var(--fora_toast_neutral_border-color));
    color: rgba(var(--fora_toast_neutral_color));
  }

  &--success {
    background-color: rgba(var(--fora_toast_success_bg));
    border-color: rgba(var(--fora_toast_success_border-color));
    color: rgba(var(--fora_toast_success_color));
  }

  &--warning {
    background-color: rgba(var(--fora_toast_warning_bg));
    border-color: rgba(var(--fora_toast_warning_border-color));
    color: rgba(var(--fora_toast_warning_color));
  }

  &--danger {
    background-color: rgba(var(--fora_toast_danger_bg));
    border-color: rgba(var(--fora_toast_danger_border-color));
    color: rgba(var(--fora_toast_danger_color));
  }

  &__link {
    display: inline-block;
    border: none;
    background: none;
    color: rgba(var(--fora_toast_link_color));
    font-size: $toast_link_font-size;
    font-weight: $toast_link_font-weight;
    line-height: $toast_link_line-height;
    padding: $toast_link_padding;
    margin: $toast_link_margin;
    text-align: left;
  }
}
</style>
