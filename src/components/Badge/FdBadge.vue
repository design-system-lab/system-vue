<script lang="ts" setup>
import FdIcon from '../Icon'
import type { BadgeProps } from '../../types'
import { computed } from 'vue';

const props = withDefaults(defineProps<BadgeProps>(), {
  kind: 'default',
  mode: 'filled',
  showIndicator: false,
  truncate: true,
  maxWidth: '160px',
  size: 'md',
});

const getIconSize = computed(() => {
  if (props.size == 'sm') return 12;
  if (props.size == 'lg') return 16;
  return 14;
});

</script>

<template>
  <span
    class="fd-badge"
    :class="[
      `fd-badge--${kind}`,
      `fd-badge--${mode}`,
      `fd-badge--${size}`,
      {
        'fd-badge--icon': icon,
        'fd-badge--truncate': truncate,
      },
    ]"
    :style="{ maxWidth: truncate ? maxWidth : 'none' }"
  >
    <span
      v-if="showIndicator && !icon"
      class="fd-badge__indicator"
    />
    <fd-icon
      v-if="prependIcon && !icon"
      :icon="prependIcon"
      :size="getIconSize"
    />
    <fd-icon
      v-if="icon"
      :icon="icon"
      :size="getIconSize"
    />
    <span class="fd-badge__content">
      <slot v-if="!icon" />
    </span>
    <fd-icon
      v-if="appendIcon && !icon"
      :icon="appendIcon"
      :size="getIconSize"
    />
  </span>
</template>

<style lang="scss" scoped>
@import "@/styles/required";

.fd-badge {
  align-items: center;
  background-color: rgb(var(--fora_badge_default_bg));
  border: 1px solid transparent;
  border-radius: $badge_border-radius;
  color: rgb(var(--fora_badge_color));
  display: inline-flex;
  font-size: $badge_font-size;
  gap: $badge_gap;
  height: $badge_height;
  justify-content: flex-start;
  line-height: $badge_line-height;
  padding: $badge_padding;

  &.fd-badge--outline {
    border-color: rgb(var(--fora_badge_default_border-color));
  }

  .fd-icon {
    color: rgb(var(--fora_badge_default_icon_color));
  }

  &--success {
    background-color: rgb(var(--fora_badge_success_bg));

    &.fd-badge--outline {
      border-color: rgb(var(--fora_badge_success_border-color));
    }

    .fd-badge__indicator {
      background-color: rgb(var(--fora_badge_success_indicator_bg));
    }

    .fd-icon {
      color: rgb(var(--fora_badge_success_icon_color));
    }
  }

  &--warning {
    background-color: rgb(var(--fora_badge_warning_bg));

    &.fd-badge--outline {
      border-color: rgb(var(--fora_badge_warning_border-color));
    }

    .fd-badge__indicator {
      background-color: rgb(var(--fora_badge_warning_indicator_bg));
    }

    .fd-icon {
      color: rgb(var(--fora_badge_warning_icon_color));
    }
  }

  &--danger {
    background-color: rgb(var(--fora_badge_danger_bg));

    &.fd-badge--outline {
      border-color: rgb(var(--fora_badge_danger_border-color));
    }

    .fd-badge__indicator {
      background-color: rgb(var(--fora_badge_danger_indicator_bg));
    }

    .fd-icon {
      color: rgb(var(--fora_badge_danger_icon_color));
    }
  }
  
  &--info {
    background-color: rgb(var(--fora_badge_info_bg));

    &.fd-badge--outline {
      border-color: rgb(var(--fora_badge_info_border-color));
    }

    .fd-badge__indicator {
      background-color: rgb(var(--fora_badge_info_indicator_bg));
    }

    .fd-icon {
      color: rgb(var(--fora_badge_info_icon_color));
    }
  }

  &--neutral {
    background-color: rgb(var(--fora_badge_neutral_bg));

    &.fd-badge--outline {
      border-color: rgb(var(--fora_badge_neutral_border-color));
    }

    .fd-badge__indicator {
      background-color: rgb(var(--fora_badge_neutral_indicator_bg));
    }

    .fd-icon {
      color: rgb(var(--fora_badge_neutral_icon_color));
    }
  }

  &--truncate {
    .fd-badge__content {
      min-width: 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }

  &--icon {
    gap: 0;
    height: $badge_height;
    justify-content: center;
    padding: 0;
    width: $badge_height;
  }

  &__indicator {
    background-color: rgb(var(--fora_badge_default_indicator_bg));
    border-radius: $badge_indicator_border-radius;
    height: $badge_indicator_size;
    width: $badge_indicator_size;
  }

  &--sm {
    font-size: $badge_sm_font-size;
    height: $badge_sm_height;
    padding: $badge_sm_padding;

    &.fd-badge--icon {
      height: $badge_sm_height;
      padding: 0;
      width: $badge_sm_height;
    }
  }

  &--lg {
    border-radius: $badge_lg_border-radius;
    font-size: $badge_lg_font-size;
    height: $badge_lg_height;
    padding: $badge_lg_padding;

    &.fd-badge--icon {
      height: $badge_lg_height;
      width: $badge_lg_height;
    }
  }
}
</style>
