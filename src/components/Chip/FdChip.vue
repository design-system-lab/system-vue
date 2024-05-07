<template>
  <component
    :is="chipType"
    class="fd-chip"
    :class="[
      `fd-chip--${size}`,
      `${status ? `fd-chip--${status}` : ''}`,
      {
        'fd-chip--dismissible': dismissible,
        'fd-chip--interactive': interactive,
        'fd-chip--outlined': outlined,
        'fd-chip--selected': isSelected,
      }
    ]"
    @click="handleClick"
  >
    <span
      v-if="avatarImg || $slots['avatar-img']"
      class="fd-chip__avatar-container"
      :class="[`fd-chip__avatar-container--${size}`]"
      data-testid="fd-chip__avatar-container"
    >
      <div
        class="fd-chip__avatar"
        :class="[`fd-chip__avatar--${size}`]"
      >
        <slot name="avatar-img">
          <img
            :src="avatarImg"
            aria-hidden="true"
          />
        </slot>
      </div>
    </span>
    <span
      v-if="icon || $slots['icon'] || status"
      class="fd-chip__icon"
      :class="[
        `fd-chip__icon--${size}`,
        `${status ? `fd-chip__icon--status` : ''}`,
        `${status ? `fd-chip__icon--${status}` : ''}`,
      ]"
      data-testid="fd-chip__icon"
    >
      <slot
        v-if="status"
        name="status-icon"
      >
        <fd-icon
          :icon="getStatusIcon"
          :size="20"
        />
      </slot>
      <slot
        v-else  
        name="icon"
      >
        <fd-icon
          :icon="icon"
          :size="size === 'lg' ? 20 : 16"
        />
      </slot>
    </span>
    <slot>
      {{ text }}
    </slot>
    <span
      v-if="isSelected"
      class="fd-chip__selected"
      :class="[`fd-chip__selected--${size}`]"
    >
      <fd-icon
        :icon="CheckIcon"
        :size="size === 'lg' ? 20 : 16"
      />
    </span>
    <button
      v-if="dismissible"
      class="fd-chip__close"
      :class="[`fd-chip__close--${size}`]"
      data-testid="fd-chip__close"
      @click.stop="onDismiss"
    >
      <fd-icon
        :icon="XMarkIcon"
        :size="size === 'lg' ? 20 : 16"
      />
    </button>
  </component>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue';
import { CheckCircleIcon, CheckIcon, ExclamationCircleIcon, InformationCircleIcon, XCircleIcon, XMarkIcon } from '@heroicons/vue/20/solid';
import FdIcon from '../Icon/FdIcon.vue';
import { Icon, StopLight } from '../../types';

export default defineComponent({
  name: 'FdChip',
  components: { FdIcon },
  props: {
    avatarImg: {
      type: String,
      default: undefined,
    },
    dismissible: {
      type: Boolean,
      default: false
    },
    icon: {
      type: Function as PropType<Icon>,
      default: undefined,
    },
    interactive: {
      type: Boolean,
      default: false
    },
    modelValue: {
      type: [Boolean, String, Array],
      default: false
    },
    outlined: {
      type: Boolean,
      default: false
    },
    size: {
      type: String as PropType<'sm' | 'md' | 'lg'>,
      default: false
    },
    status: {
      type: String as PropType<StopLight | undefined>,
      default: undefined,
    },
    tag: {
      type: String,
      default: undefined,
    },
    text: {
      type: String,
      default: undefined,
    },
    value: {
      type: String,
      default: undefined,
    }
  },
  emits: ['click', 'dismiss', 'update:modelValue'],
  setup(props, { emit }) {
    const chipType = computed((): string => {
      if (props.tag) {
        return props.tag;
      }

      if (props.interactive) {
        return 'button';
      }

      return 'div';
    });

    const getStatusIcon = computed((): Icon => {
      switch (props.status) {
        case 'danger':
          return XCircleIcon;
        case 'success':
          return CheckCircleIcon;
        case 'warning':
          return ExclamationCircleIcon;
        default:
          return InformationCircleIcon;
      }
    });

    const isSelected = computed((): boolean => {
      if (typeof props.modelValue === 'object') {
        return props.modelValue.includes(props.value);
      }

      return props.modelValue === props.value || props.modelValue === true;
    });

    function onDismiss() {
      emit('dismiss');
    };

    function handleClick() {
      if (props.interactive) {
        let emitVal;

        if (typeof props.modelValue === 'object') {
          emitVal = [...props.modelValue, props.value];
        } else {
          emitVal = props.value || !props.modelValue;
        }

        emit('click');
        emit('update:modelValue', emitVal);
      }
    }

    return {
      chipType,
      getStatusIcon,
      handleClick,
      isSelected,
      onDismiss,
      CheckIcon,
      XMarkIcon,
    };
  }
});
</script>

<style lang="scss" scoped>
@import '../../styles/required';

.fd-chip {
  align-items: center;
  background-color: rgba(var(--fora_neutral-3), 1);
  border: 1px solid rgba(var(--fora_neutral-6), 1);
  border-radius: 1000px;
  color: rgba(var(--fora_neutral-13), 1);
  display: inline-flex;
  font-size: $font-sm;
  gap: 0.25rem;
  line-height: 1.25rem;
  padding: calc(0.25rem - 1px) calc(0.75rem - 1px);
  transition: $transition-timing background-color;

  &:focus-visible {
    @include focus-primary-styles;
  }

  &--outlined {
    background-color: transparent;
    border: 1px solid rgba(var(--fora_neutral-8), 1);

    .fd-chip__close {
      &:hover {
        background-color: rgba(var(--fora_neutral-3), 1);
      }

      &:active {
        background-color: rgba(var(--fora_neutral-4), 1);
      }
    }
  }

  &--interactive {
    cursor: pointer;

    &:hover {
      background-color: rgba(var(--fora_neutral-4), 1);
    }

    &:active,
    &--selected {
      background-color: rgba(var(--fora_neutral-5), 1);
    }
  }

  &--interactive#{&}--outlined {
    &:hover {
      background-color: rgba(var(--fora_neutral-3), 1);
    }

    &:active,
    &--selected {
      background-color: rgba(var(--fora_neutral-4), 1);
    }

    .fd-chip__close {
      &:hover {
        background-color: rgba(var(--fora_neutral-4), 1);
      }

      &:active {
        background-color: rgba(var(--fora_neutral-5), 1);
      
      }
    }
  }

  &--dismissible {
    padding-right: calc(0.5rem - 1px);
  }

  &__close,
  &__selected {
    background: none;
    border: none;
    border-radius: 1000px;
    display: block;
    height: 1.25rem;
    margin-right: -0.25rem;
    padding: 0;
    transition: $transition-timing background-color;
    width: 1.25rem;

    .fd-icon {
      display: block;
    }

    &--sm,
    &--md {
      height: 1rem;
      width: 1rem;
    }
  }

  &__close {
    &:hover {
      background-color: rgba(var(--fora_neutral-4), 1);
      cursor: pointer;
    }

    &:active {
      background-color: rgba(var(--fora_neutral-5), 1);
    }

    &:focus-visible {
      @include focus-primary-styles;
    }

    &--sm {
      margin-right: -0.375rem;
    }

    &--md {
      margin-right: -0.375rem;
    }
  }

  &--interactive &__close {
    &:hover {
      background-color: rgba(var(--fora_neutral-3), 1);
    }

    &:active {
      background-color: rgba(var(--fora_neutral-2), 1);
    }
  }

  &__icon {
    color: rgba(var(--fora_neutral-8), 1);
    display: block;
    margin-left: -0.5rem;

    &:deep(.fd-icon) {
      display: block;
    }

    &--sm {
      height: 1rem;
      margin-left: -0.25rem;
      width: 1rem;
    }

    &--md {
      margin-left: -0.375rem;
    }

    &--danger {
      color: rgba(var(--fora_danger-6), 1);
    }

    &--info {
      color: rgba(var(--fora_secondary-6), 1);
    }

    &--success {
      color: rgba(var(--fora_success-6), 1);
    }

    &--warning {
      color: rgba(var(--fora_warning-7), 1);
    }
  }

  &__icon--status#{&}__icon--sm {
    height: 1.25rem;
    margin-left: -0.5rem;
    width: 1.25rem;
  }

  &__icon--status#{&}__icon--md {
    margin-left: -0.5rem;
  }

  &__avatar-container {
    align-items: center;
    display: flex;
    height: 1.25rem;
    justify-content: center;
    margin-left: -0.5rem;
    margin-right: 0.125rem;
    width: 1.25rem;

    &--sm {
      height: 1rem;
      margin-left: -0.375rem;
      margin-right: 0;
      width: 1rem;
    }

    &--md {
      height: 1.25rem;
      margin-left: -0.5rem;
      margin-right: 0;
      width: 1.25rem;
    }
  }

  &__avatar {
    border-radius: 1000px;
    flex: 0 0 auto;
    height: 1.5rem;
    overflow: hidden;
    width: 1.5rem;

    &--sm {
      height: 1rem;
      width: 1rem;
    }

    &--md {
      height: 1.25rem;
      width: 1.25rem;
    }

    img {
      display: block;
      height: 100%;
      object-fit: cover;
      width: 100%;
    }
  }

  // status
  &--danger {
    background-color: rgba(var(--fora_danger-1), 1);
    border-color: rgba(var(--fora_danger-6), 1);

    .fd-chip__close {
      &:hover {
        background-color: rgba(var(--fora_danger-2), 1);
      }

      &:active {
        background-color: rgba(var(--fora_danger-3), 1);
      }
    }
  }

  &--danger#{&}--interactive {
    &:hover {
      background-color: rgba(var(--fora_danger-2), 1);
    }

    &:active {
      background-color: rgba(var(--fora_danger-3), 1);
    }

    .fd-chip__close {
      &:hover {
        background-color: rgba(var(--fora_danger-1), 1);
      }

      &:active {
        background-color: rgba(var(--fora_white), 1);
      }
    }
  }

  &--success {
    background-color: rgba(var(--fora_success-1), 1);
    border-color: rgba(var(--fora_success-6), 1);

    .fd-chip__close {
      &:hover {
        background-color: rgba(var(--fora_success-2), 1);
      }

      &:active {
        background-color: rgba(var(--fora_success-3), 1);
      }
    }
  }

  &--success#{&}--interactive {
    &:hover {
      background-color: rgba(var(--fora_success-2), 1);
    }

    &:active {
      background-color: rgba(var(--fora_success-3), 1);
    }

    .fd-chip__close {
      &:hover {
        background-color: rgba(var(--fora_success-1), 1);
      }

      &:active {
        background-color: rgba(var(--fora_white), 1);
      }
    }
  }

  &--warning {
    background-color: rgba(var(--fora_warning-1), 1);
    border-color: rgba(var(--fora_warning-8), 1);

    .fd-chip__close {
      &:hover {
        background-color: rgba(var(--fora_warning-2), 1);
      }

      &:active {
        background-color: rgba(var(--fora_warning-3), 1);
      }
    }
  }

  &--warning#{&}--interactive {
    &:hover {
      background-color: rgba(var(--fora_warning-2), 1);
    }

    &:active {
      background-color: rgba(var(--fora_warning-3), 1);
    }

    .fd-chip__close {
      &:hover {
        background-color: rgba(var(--fora_warning-1), 1);
      }

      &:active {
        background-color: rgba(var(--fora_white), 1);
      }
    }
  }

  &--info {
    background-color: rgba(var(--fora_secondary-1), 1);
    border-color: rgba(var(--fora_secondary-6), 1);

    .fd-chip__close {
      &:hover {
        background-color: rgba(var(--fora_secondary-2), 1);
      }

      &:active {
        background-color: rgba(var(--fora_secondary-3), 1);
      }
    }
  }

  &--info#{&}--interactive {
    &:hover {
      background-color: rgba(var(--fora_secondary-2), 1);
    }

    &:active {
      background-color: rgba(var(--fora_secondary-3), 1);
    }

    .fd-chip__close {
      &:hover {
        background-color: rgba(var(--fora_secondary-1), 1);
      }

      &:active {
        background-color: rgba(var(--fora_white), 1);
      }
    }
  }

  &--sm {
    font-size: $font-xs;
    font-weight: $font-regular;
    height: 1.25rem;
    padding: 0 calc(0.5rem - 1px);
  }

  &--md {
    font-size: $font-sm;
    font-weight: $font-regular;
    height: 1.5rem;
    padding: calc(0.125rem - 1px) calc(0.625rem - 1px);
  }
}
</style>
