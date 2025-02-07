<template>
  <div
    class="fd-banner"
    :class="[`fd-banner--${kind}`]"
  >
    <div class="fd-banner__container">
      <div class="fd-banner__icon">
        <fd-icon :icon="getIcon" />
      </div>
      <div class="fd-banner__content">
        <p class="fd-banner__heading">
          <slot />
        </p>
        <p
          v-if="hasSlotContent($slots.description)"
          class="fd-banner__description"
        >
          <slot name="description" />
        </p>
      </div>
      <div class="fd-banner__actions">
        <slot name="actions" />
      </div>
      <div
        v-if="dismissible"
        class="fd-banner__close"
      >
        <fd-close-button
          size="lg"
          @click="$emit('dismiss')"
        />
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, PropType } from 'vue'
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
import { Icon } from '../../types';

export default defineComponent({
  name: 'FdBanner',
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
      type: String as PropType<'default' | 'info' | 'success' | 'warning' | 'danger' | 'neutral'>,
      default: 'default',
    },
    linkText: {
      type: String,
      default: undefined,
    },
  },
  emits: ['click:link', 'dismiss'],
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
        case 'default':
          return FlagIcon;
        default:
          return InformationCircleIcon;
      }
    });

    return { getIcon, hasSlotContent };
  }
});
</script>
<style lang="scss" scoped>
@import "@/styles/required";

.fd-banner {
  background-color: rgba(var(--fora_banner_default_bg));
  border-radius: $banner_border-radius;
  color: rgba(var(--fora_banner_default_color));
  container-type: inline-size;
  container-name: banner;
  padding: $banner_padding;
  position: relative;

  &__container{
    align-items: center;
    display: flex;
    gap: $banner_gap;
  }

  &__icon {
    align-items: center;
    display: flex;
    justify-content: center;
    padding: $banner_icon_padding;
  }

  &__content {
    flex: 1 1 0;
    display: flex;
    flex-direction: column;
    gap: $banner_content_gap;
  }

  &__heading {
    color: rgba(var(--fora_banner_heading_color));
    font-size: $banner_heading_font-size;
    font-weight: $banner_heading_font-weight;
    line-height: $banner_heading_line-height;
  }

  &__close {
    margin-bottom: -0.125rem;
  }

  &__description {
    color: rgba(var(--fora_banner_text_color));
    font-size: $banner_text_font-size;
    font-weight: $banner_text_font-weight;
    line-height: $banner_text_line-height;
    margin-top: 0;
  }

  &--info {
    background-color: rgba(var(--fora_banner_info_bg));
    border-color: rgba(var(--fora_banner_info_border-color));
    color: rgba(var(--fora_banner_info_color));
  }
  
  &--neutral {
    background-color: rgba(var(--fora_banner_neutral_bg));
    border-color: rgba(var(--fora_banner_neutral_border-color));
    color: rgba(var(--fora_banner_neutral_color));
  }

  &--success {
    background-color: rgba(var(--fora_banner_success_bg));
    border-color: rgba(var(--fora_banner_success_border-color));
    color: rgba(var(--fora_banner_success_color));
  }

  &--warning {
    background-color: rgba(var(--fora_banner_warning_bg));
    border-color: rgba(var(--fora_banner_warning_border-color));
    color: rgba(var(--fora_banner_warning_color));
  }

  &--danger {
    background-color: rgba(var(--fora_banner_danger_bg));
    border-color: rgba(var(--fora_banner_danger_border-color));
    color: rgba(var(--fora_banner_danger_color));
  }

  &__actions {
    display: flex;
    flex: 0 0 auto;
    gap: $banner_actions_gap;
  }
}

@container banner (width < #{$banner_breakpoint}) {
  .fd-banner {
    &__container {
      align-items: flex-end;
      flex-direction: column;
    }

    &__content {
      padding-right: 2.25rem;
      width: 100%;
    }

    &__icon {
      display: none;
    }

    &__close {
      position: absolute;
      right: 0.75rem;
      top: 0.75rem;
    }
  }
}
</style>
