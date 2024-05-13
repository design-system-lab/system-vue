<template>
  <component
    :is="getChipType"
    class="fd-chip"
    :class="[
      `fd-chip--${size}`,
      {
        'fd-chip--dismissible': dismissible,
        'fd-chip--interactive': interactive,
      }
    ]"
    @click.stop.prevent="handleClick"
  >
    <div
      v-if="icon || $slots.icon"
      class="fd-chip__icon"
      :class="[`fd-chip__icon--${size}`]"
    >
      <slot name="icon">
        <fd-icon
          :icon="icon"
          :size="getIconSize"
        />
      </slot>
    </div>
    <slot>
      {{ text }}
    </slot>
    <transition name="fade-in-left">
      <div
        v-if="isSelected"
        class="fd-chip__selected"
      >
        <slot name="selected-icon">
          <fd-icon
            :icon="CheckIcon"
            :size="getIconSize"
          />
        </slot>
      </div>
    </transition>
    <button
      v-if="dismissible"
      class="fd-chip__dismiss"
      :class="[`fd-chip__dismiss--${size}`]"
      @click.stop.prevent="$emit('dismiss')"
    >
      <slot name="dismiss-icon">
        <fd-icon
          :icon="XMarkIcon"
          :size="getIconSize"
        />
      </slot>
    </button>
  </component>
</template>
<script lang="ts">
import { computed, defineComponent, inject, shallowRef, PropType } from 'vue';
import { CheckIcon, XMarkIcon } from '@heroicons/vue/20/solid';
import FdIcon from '../Icon/FdIcon.vue';
import { Icon } from '../../types';


export default defineComponent({
  name: 'FdChip',
  components: {
    FdIcon,
  },
  props: {
    dismissible: {
      type: Boolean,
      default: false,
    },
    icon: {
      type: Object as PropType<Icon>,
      default: undefined,
    },
    interactive: {
      type: Boolean,
      default: false,
    },
    modelValue: {
      type: [String, Array, Boolean] as PropType<string | string[] | boolean>,
      default: false,
    },
    size: {
      type: String as PropType<'sm' | 'md' | 'lg'>,
      default: 'lg',
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
    },
  },
  setup(props, { emit }) {
    const groupModelValue = inject('groupModelValue', shallowRef(null));
    const groupHandleModelValue = inject<(val: string | string[]) => void>('groupHandleModelValue');

    const chipModelValue = computed<boolean | string | string[]>(() => {
      return groupModelValue.value ?? props.modelValue;
    });

    const getChipType = computed(() => {
      if (props.tag) return props.tag;
      if (props.interactive) return 'button';
      return 'div';
    });

    const getIconSize = computed(() => {
      return props.size === 'lg' ? 20 : 16;
    });

    const getReturnValue = computed(() => {
      if (typeof chipModelValue.value === 'boolean') return !props.modelValue;
      if (props.value) {
        if (typeof chipModelValue.value === 'string') return props.value;

        if (Array.isArray(chipModelValue.value)) {
          return chipModelValue.value.includes(props.value)
            ? chipModelValue.value.filter((v: string) => v !== props.value)
            : [...chipModelValue.value, props.value];
        }
      }

      return chipModelValue.value;
    });

    const isSelected = computed(() => {
      if (typeof chipModelValue.value === 'boolean') return chipModelValue.value;
      if (props.value) {
        if (typeof chipModelValue.value === 'string') return props.value === chipModelValue.value;
        if (Array.isArray(chipModelValue.value)) {
          return chipModelValue.value.includes(props.value);
        }
      }

      return false;
    });

    function handleClick() {
      if (props.interactive) {
        emit('update:modelValue', getReturnValue.value);

        // if used within a group and group model value exists, we can assume the type
        if (groupModelValue !== null && groupHandleModelValue) groupHandleModelValue((getReturnValue.value as string | string[]));
      }
    }

    return {
      chipModelValue,
      getChipType,
      getIconSize,
      getReturnValue,
      handleClick,
      isSelected,
      CheckIcon,
      XMarkIcon,
    };
  },
});
</script>
<style lang="scss" scoped>
@import '../../styles/required';

.fd-chip {
  align-items: center;
  background-color: rgba(var(--fora_neutral-3), 1);
  border: 1px solid rgba(#000, 0.1);
  border-radius: 1000px;
  box-sizing: border-box;
  color: rgba(var(--fora_neutral-13), 1);
  display: inline-flex;
  font-size: $font-sm;
  gap: 0.25rem;
  height: 1.75rem;
  justify-content: center;
  line-height: 1.25rem;
  padding: 0.25rem calc(0.75rem - 1px);
  transition: $transition-timing background-color, $transition-timing border-color;

  &--md {
    height: 1.5rem;
    padding: 0.125rem calc(0.625rem - 1px);
  }

  &--sm {
    font-size: $font-xs;
    height: 1.25rem;
    padding: 0 calc(0.5rem - 1px);
  }

  &--dismissible {
    padding-right: calc(0.25rem - 1px);
  }

  &--interactive {
    background-color: rgba(var(--fora_neutral-2), 1);
    border-color: rgba(#000, 0.5);

    &:hover {
      background-color: rgba(var(--fora_neutral-3), 1);
    }

    &:active {
      background-color: rgba(var(--fora_neutral-4), 1);
    }
  }

  &--selected {
    background-color: (rgba(var(--fora_neutral-4), 1));
  }

  &__icon {
    color: rgba(var(--fora_neutral-8), 1);
    display: flex;
    flex: 0 0 auto;
    height: 1rem;
    width: 1rem;

    &--lg {
      height: 1.25rem;
      width: 1.25rem;
    }
  }

  &__selected {
    flex: 0 0 auto;
  }

  &__dismiss {
    background: none;
    border: none;
    border-radius: 1000px;
    cursor: pointer;
    display: flex;
    flex: 0 0 auto;
    height: 1rem;
    padding: 0;
    transition: $transition-timing background-color;
    width: 1rem;

    &:hover {
      background-color: rgba(#000, 0.1);
    }

    &:active {
      background-color: rgba(#000, 0.2);
    }

    &--lg {
      height: 1.25rem;
      width: 1.25rem;
    }

    &--sm {
      margin-right: -0.125rem;
    }
  }
}

</style>
