<script lang="ts" setup>
import { computed } from 'vue'
import FdCloseButton from '../CloseButton/FdCloseButton.vue';
import FdIcon from '../Icon';
import { getStatusIcon, hasSlotContent } from '../../utils';
import type { ToastProps } from '../../types';

/**
 * Toast component
 * 
 * @param {string} content - The content of the toast
 * @param {string} description - The description of the toast
 * @param {boolean} dismissible - Whether the toast is dismissible
 * @param {Icon} icon - The icon to display in the toast
 * @param {string} kind - The kind of toast (info, success, warning, danger, neutral)
 * @param {string} linkText - The text of the link
 * @param {boolean} showTimestamp - Whether to show the timestamp
 */

const props = withDefaults(defineProps<ToastProps>(), {
  content: undefined,
  description: undefined,
  dismissible: false,
  icon: undefined,
  kind: 'info',
  linkText: undefined,
  showTimestamp: false,
});

defineEmits<{
  (e: 'click:link'): void;
  (e: 'dismiss'): void;
}>();

const getIcon = computed(() => {
  if (props.icon) return props.icon;

  return getStatusIcon(props.kind);
});
</script>

<template>
  <div
    class="fd-toast"
    :class="[`fd-toast--${kind}`]"
  >
    <div class="fd-toast__icon">
      <fd-icon :icon="getIcon" />
    </div>
    <div class="fd-toast__content">
      <div class="fd-toast__heading-container">
        <p class="fd-toast__heading">
          <slot>{{ content }}</slot>
        </p>
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
      <p
        v-if="description || hasSlotContent($slots.description)"
        class="fd-toast__description"
      >
        <slot name="description">
          {{ description }}
        </slot>
      </p>
      <p
        v-if="showTimestamp || hasSlotContent($slots.timestamp)"
        class="fd-toast__timestamp"
      >
        <slot name="timestamp">
          <time>{{ new Date().toLocaleTimeString() }}</time>
        </slot>
      </p>
      <slot name="link">
        <button
          v-if="linkText || hasSlotContent($slots.link)"
          class="fd-toast__link fd-link"
          @click="$emit('click:link')"
        >
          <slot name="link">
            {{ linkText }}
          </slot>
        </button>
      </slot>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "@/styles/required";

.fd-toast {
  align-items: flex-start;
  background-color: rgb(var(--fora_toast_informational_bg));
  box-shadow: $shadow-sm;
  border: $toast_border rgb(var(--fora_toast_informational_border-color));
  border-radius: $toast_border-radius;
  border-left-width: $toast_tab_width;
  color: rgb(var(--fora_toast_informational_color));
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
    display: flex;
    flex-direction: column;
    gap: $toast_content_gap;
  }

  &__heading-container {
    align-items: center;
    display: flex;
    gap: $toast_heading-container_gap;
    justify-content: space-between;
  }

  &__heading {
    color: rgb(var(--fora_toast_heading_color));
    font-size: $toast_heading_font-size;
    font-weight: $toast_heading_font-weight;
    line-height: $toast_heading_line-height;
    padding: 0.125rem 0 0;
  }

  &__close {
    margin-bottom: -0.125rem;
  }

  &__description {
    color: rgb(var(--fora_toast_text_color));
    font-size: $toast_text_font-size;
    font-weight: $toast_text_font-weight;
    line-height: $toast_text_line-height;
  }

  &__timestamp {
    color: rgb(var(--fora_toast_timestamp_color));
    font-size: $toast_timestamp_font-size;
    font-weight: $toast_timestamp_font-weight;
    line-height: $toast_timestamp_line-height;
    margin-top: 0;
  }

  &--neutral {
    background-color: rgb(var(--fora_toast_neutral_bg));
    border-color: rgb(var(--fora_toast_neutral_border-color));
    color: rgb(var(--fora_toast_neutral_color));
  }

  &--success {
    background-color: rgb(var(--fora_toast_success_bg));
    border-color: rgb(var(--fora_toast_success_border-color));
    color: rgb(var(--fora_toast_success_color));
  }

  &--warning {
    background-color: rgb(var(--fora_toast_warning_bg));
    border-color: rgb(var(--fora_toast_warning_border-color));
    color: rgb(var(--fora_toast_warning_color));
  }

  &--danger {
    background-color: rgb(var(--fora_toast_danger_bg));
    border-color: rgb(var(--fora_toast_danger_border-color));
    color: rgb(var(--fora_toast_danger_color));
  }

  &__link {
    display: inline-block;
    border: none;
    background: none;
    color: rgb(var(--fora_toast_link_color));
    font-size: $toast_link_font-size;
    font-weight: $toast_link_font-weight;
    line-height: $toast_link_line-height;
    padding: $toast_link_padding;
    margin: $toast_link_margin;
    text-align: left;
  }
}
</style>
