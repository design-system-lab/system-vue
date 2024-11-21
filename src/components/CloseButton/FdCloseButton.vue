<template>
  <button
    class="fd-close-button"
    :class="[
      {
        'fd-close-button--disabled': disabled,
        'fd-close-button--round': round,
        'fd-close-button--lg': size === 'lg',
        'fd-close-button--sm': size === 'sm',
      }
    ]"
    :aria-label="t('close')"
    :disabled="disabled"
  >
    <fd-icon
      :icon="icon"
      :size="getSize"
      :data-testid="`fd-close-button__icon--${getSize}`"
    />
  </button>
</template>

<script lang="ts">
import { computed, defineComponent, inject, PropType } from 'vue';
import { XMarkIcon as XMarkIconLg } from '@heroicons/vue/24/solid'
import { XMarkIcon } from '@heroicons/vue/20/solid';
import { XMarkIcon as XMarkIconSm } from '@heroicons/vue/16/solid';
import FdIcon from '../Icon';
import { TranslationSupport } from '../../utils';

export default defineComponent({
  name: 'FdCloseButton',
  components: { FdIcon },
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
    round: {
      type: Boolean,
      default: false,
    },
    size: {
      type: String as PropType<'lg' | 'md' | 'sm'>,
      default: 'md',
    }
  },
  setup(props) {
    const { t } = inject('i18n') as TranslationSupport;

    const icon = computed(() => {
      switch (props.size) {
        case 'lg':
          return XMarkIconLg;
        case 'sm':
          return XMarkIconSm;
        default:
          return XMarkIcon;
      }
    });

    const getSize = computed((): number => {
      switch (props.size) {
        case 'lg':
          return 24;
        case 'sm':
          return 16;
        default:
          return 20;
      }
    });

    return { getSize, icon, t };
  }
});
</script>

<style lang="scss" scoped>
@import "@/styles/required";

.fd-close-button {
  background-color: rgba(var(--fora_close-button_bg));
  border: $close-button_border;
  border-radius: $close-button_border-radius;
  box-sizing: content-box;
  color: rgba(var(--fora_close-button_color));
  cursor: pointer;
  display: flex;
  flex: 0 0 auto;
  height: 1.25rem;
  justify-content: center;
  line-height: 1.25rem;
  align-items: center;
  padding: 0;
  transition: background-color 0.2s;

  @include focus-primary;

  &:focus-visible {
    background-color: rgba(var(--fora_close-button_bg--focus));
  }

  &:hover {
    background-color: rgba(var(--fora_close-button_bg--hover));
  }

  &:active {
    background-color: rgba(var(--fora_close-button_bg--pressed));
  }

  &--lg {
    height: 1.5rem;
    line-height: 1.5rem;
  }

  &--sm {
    height: 1rem;
    line-height: 1rem;
  }

  &--round {
    border-radius: $close-button_border-radius--round;
    padding: 0.125rem;
  }

  &--disabled,
  &:disabled {
    color: rgba(var(--fora_close-button_color--disabled));
    pointer-events: none;
  }
}
</style>