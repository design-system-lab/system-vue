<script lang="ts" setup>
import { computed } from 'vue'
import {
  FlagIcon,
  CheckCircleIcon,
  ExclamationCircleIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
} from '@heroicons/vue/24/outline';
import FdCloseButton from '../CloseButton/FdCloseButton.vue';
import FdIcon from '../Icon';
import { hasSlotContent } from '../../utils';
import type { AlertProps } from '../../types';

const props = withDefaults(defineProps<AlertProps>(), {
  dismissible: false,
  kind: 'default',
});

defineEmits<{
  (e: 'click:link' | 'dismiss'): void;
}>();

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
    case 'default':
      return FlagIcon;
    default:
      return InformationCircleIcon;
  }
});
</script>

<template>
  <div
    class="fd-alert"
    :class="[`fd-alert--${kind}`]"
  >
    <div class="fd-alert__icon">
      <fd-icon :icon="getIcon" />
    </div>
    <div class="fd-alert__content">
      <div class="fd-alert__heading-container">
        <p class="fd-alert__heading">
          <slot />
        </p>
        <div
          v-if="dismissible"
          class="fd-alert__close"
        >
          <fd-close-button
            size="lg"
            @click="$emit('dismiss')"
          />
        </div>
      </div>
      <p
        v-if="hasSlotContent($slots.description)"
        class="fd-alert__description"
      >
        <slot name="description" />
      </p>
      <slot name="link">
        <button
          v-if="linkText"
          class="fd-alert__link fd-link"
          @click="$emit('click:link')"
        >
          {{ linkText }}
        </button>
      </slot>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "@/styles/required";

.fd-alert {
  align-items: flex-start;
  background-color: rgb(var(--fora_alert_default_bg));
  border: $alert_border rgb(var(--fora_alert_default_border-color));
  border-radius: $alert_border-radius;
  color: rgb(var(--fora_alert_default_color));
  display: flex;
  gap: $alert_gap;
  padding: $alert_padding;

  &__icon {
    align-items: center;
    display: flex;
    justify-content: center;
  }

  &__content {
    flex: 1 1 0;
    display: flex;
    flex-direction: column;
    gap: $alert_content_gap;
  }

  &__heading-container {
    align-items: center;
    display: flex;
    gap: $alert_heading-container_gap;
    justify-content: space-between;
  }

  &__heading {
    color: rgb(var(--fora_alert_heading_color));
    font-size: $alert_heading_font-size;
    font-weight: $alert_heading_font-weight;
    line-height: $alert_heading_line-height;
    padding: 0.125rem 0 0;
  }

  &__close {
    margin-bottom: -0.125rem;
  }

  &__description {
    color: rgb(var(--fora_alert_text_color));
    font-size: $alert_text_font-size;
    font-weight: $alert_text_font-weight;
    line-height: $alert_text_line-height;
  }

  &--info {
    background-color: rgb(var(--fora_alert_info_bg));
    border-color: rgb(var(--fora_alert_info_border-color));
    color: rgb(var(--fora_alert_info_color));
  }
  
  &--neutral {
    background-color: rgb(var(--fora_alert_neutral_bg));
    border-color: rgb(var(--fora_alert_neutral_border-color));
    color: rgb(var(--fora_alert_neutral_color));
  }

  &--success {
    background-color: rgb(var(--fora_alert_success_bg));
    border-color: rgb(var(--fora_alert_success_border-color));
    color: rgb(var(--fora_alert_success_color));
  }

  &--warning {
    background-color: rgb(var(--fora_alert_warning_bg));
    border-color: rgb(var(--fora_alert_warning_border-color));
    color: rgb(var(--fora_alert_warning_color));
  }

  &--danger {
    background-color: rgb(var(--fora_alert_danger_bg));
    border-color: rgb(var(--fora_alert_danger_border-color));
    color: rgb(var(--fora_alert_danger_color));
  }

  &__link {
    display: inline-block;
    border: none;
    background: none;
    color: rgb(var(--fora_alert_link_color));
    font-size: $alert_link_font-size;
    font-weight: $alert_link_font-weight;
    line-height: $alert_link_line-height;
    padding: $alert_link_padding;
    margin: $alert_link_margin;
    text-align: left;
  }
}
</style>
