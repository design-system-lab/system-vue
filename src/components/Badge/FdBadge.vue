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
        'fd-badge--truncate': truncate,
        'fd-badge--icon': icon,
      },
    ]"
    :style="{ maxWidth: maxWidth }"
  >
    <span v-if="showIndicator" class="fd-badge__indicator"/>
    <fd-icon v-if="prependIcon" :icon="prependIcon" :size="getIconSize" />
    <fd-icon v-if="icon" :icon="icon" :size="getIconSize" />
    <slot v-if="!icon" />
    <fd-icon v-if="appendIcon" :icon="appendIcon" :size="getIconSize" />
  </span>
</template>

<style lang="scss" scoped>
@import "@/styles/required";

.fd-badge {
  align-items: center;
  border: 1px solid transparent;
  color: rgb(var(--fora_text--default));
  display: inline-flex;
  gap: 0.375rem;
  height: 1.5rem;
  justify-content: flex-start;
  line-height: 1.25rem;
  padding: 0 0.5rem;
  font-size: $font-xs;
  background-color: rgb(var(--fora_primary_reduced));
  border-radius: $border-radius_md;

  &.fd-badge--outline {
    border-color: rgb(var(--fora_primary));
  }

  &--success {
    background-color: rgb(var(--fora_success_reduced));

    &.fd-badge--outline {
      border-color: rgb(var(--fora_success));
    }

    .fd-badge__indicator {
      background-color: rgb(var(--fora_success));
    }

    .fd-icon {
      color: rgb(var(--fora_success));
    }
  }

  &--warning {
    background-color: rgb(var(--fora_warning_reduced));

    &.fd-badge--outline {
      border-color: rgb(var(--fora_warning));
    }

    .fd-badge__indicator {
      background-color: rgb(var(--fora_warning));
    }

    .fd-icon {
      color: rgb(var(--fora_warning));
    }
  }

  &--danger {
    background-color: rgb(var(--fora_danger_reduced));

    &.fd-badge--outline {
      border-color: rgb(var(--fora_danger));
    }

    .fd-badge__indicator {
      background-color: rgb(var(--fora_danger));
    }

    .fd-icon {
      color: rgb(var(--fora_danger));
    }
  }
  
  &--info {
    background-color: rgb(var(--fora_informational_reduced));

    &.fd-badge--outline {
      border-color: rgb(var(--fora_informational));
    }

    .fd-badge__indicator {
      background-color: rgb(var(--fora_informational));
    }

    .fd-icon {
      color: rgb(var(--fora_informational));
    }
  }

  &--neutral {
    background-color: rgb(var(--fora_neutral_reduced));

    &.fd-badge--outline {
      border-color: rgb(var(--fora_neutral));
    }

    .fd-badge__indicator {
      background-color: rgb(var(--fora_neutral));
    }

    .fd-icon {
      color: rgb(var(--fora_neutral));
    }
  }

  &--truncate {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  &--icon {
    justify-content: center;
    gap: 0;
    height: 1.5rem;
    width: 1.5rem;
    padding: 0;
  }

  &__indicator {
    background-color: rgb(var(--fora_primary));
    border-radius: 50%;
    height: 0.5rem;
    width: 0.5rem;
  }

  &--sm {
    font-size: 10px;
    height: 1.25rem;
    padding: 0 6px;

    &.fd-badge--icon {
      padding: 0;
      width: 1.25rem;
      height: 1.25rem;
    }
  }

  &--lg {
    font-size: $font-sm;
    height: 1.75rem;
    border-radius: $border-radius_lg;

    &.fd-badge--icon {
      width: 1.75rem;
      height: 1.75rem;
    }
  }
}
</style>
