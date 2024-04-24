<template>
  <component
    :is="chipType"
    class="fd-chip"
    :class="{
      'fd-chip--dismissible': dismissible,
      'fd-chip--danger': status === 'danger',
      'fd-chip--info': status === 'info',
      'fd-chip--interactive': interactive,
      'fd-chip--outlined': outlined,
      'fd-chip--selected': isSelected,
      'fd-chip--success': status === 'success',
      'fd-chip--warning': status === 'warning',
    }"
    @click="handleClick"
  >
    <span
      v-if="avatarImg || $slots['avatarImg']"
      class="fd-chip__avatar"
      data-testid="fd-chip__avatar"
    >
      <slot name="avatarImg">
        <img
          :src="avatarImg"
          aria-hidden="true"
        />
      </slot>
    </span>
    <span
      v-if="icon || $slots['icon']"
      class="fd-chip__icon"
      data-testid="fd-chip__icon"
    >
      {{ icon }}
    </span>
    <slot>
      {{ text }}
    </slot>
    <span
      v-if="isSelected"
      class="fd-chip__selected"
    >
      <fd-icon
        :icon="CheckIcon"
        :size="small ? 16 : 20"
      />
    </span>
    <button
      v-if="dismissible"
      class="fd-chip__close"
      data-testid="fd-chip__close"
      @click.stop="onDismiss"
    >
      <fd-icon
        :icon="XMarkIcon"
        :size="small ? 16 : 20"
      />
    </button>
  </component>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue';
import { CheckIcon, XMarkIcon } from '@heroicons/vue/20/solid';
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
    small: {
      type: Boolean,
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
  background-color: rgba(var(--fora_neutral-3), 1);
  border: 0;
  border-radius: 1000px;
  display: inline-flex;
  font-size: $font-sm;
  gap: 0.25rem;
  line-height: 1.25rem;
  padding: 0.25rem 0.75rem;
  transition: $transition-timing background-color;


  &--outlined {
    background-color: transparent;
    border: 1px solid rgba(var(--fora_neutral-5), 1);

    .fd-chip__close {
      &:hover {
        background-color: rgba(var(--fora_neutral-4), 1);
      }

      &:active {
        background-color: rgba(var(--fora_neutral-5), 1);
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
    padding-right: 0.5rem;
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
  }

  &__close {
    &:hover {
      background-color: rgba(var(--fora_neutral-4), 1);
      cursor: pointer;
    }

    &:active {
      background-color: rgba(var(--fora_neutral-5), 1);
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
}
</style>
