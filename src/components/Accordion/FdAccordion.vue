<template>
  <div
    :id="id"
    class="fd-accordion"
  >
    <div class="fd-accordion__header">
      <button
        :id="`${id}__button`"
        class="fd-accordion__button"
        :aria-expanded="isOpen"
        :aria-controls="`${id}__content`"
        type="button"
        @click="toggleAccordion"
      >
        <div v-if="$slots.icon || icon" class="fd-accordion__icon">
          <slot name="icon">
            <fd-icon
              v-if="icon"
              class="fd-button__prepend-icon"
              :icon="icon"
            />
          </slot>
        </div>
        <div class="fd-accordion__heading">
          <slot name="heading" />
        </div>
        <div class="fd-accordion_controller">
          <slot
            name="controller"
            :open="isOpen"
          >
            <div class="fd-accordion__controller-group">
              <fd-icon :icon="MinusIcon" />
              <fd-icon
                class="fd-accordion__control-arm"
                :class="{ 'fd-accordion__control-arm--open': isOpen }"
                :icon="MinusIcon"
              />
            </div>
          </slot>
        </div>
      </button>
    </div>
    <transition
      @before-enter="(el) => onBeforeEnter(el as HTMLElement)"
      @enter="(el) => onEnter(el as HTMLElement)"
      @after-enter="(el) => onAfterEnter(el as HTMLElement)"
      @before-leave="(el) => onBeforeLeave(el as HTMLElement)"
      @leave="(el) => onLeave(el as HTMLElement)"
      @after-leave="(el) => onAfterLeave(el as HTMLElement)"
    >
      <div
        v-show="isOpen"
        :id="`${id}__content`"
        class="fd-accordion__content"
        :aria-labelledby="`${id}__button`"
        role="region"
      >
        <slot />
      </div>
    </transition>
  </div>
</template>
<script lang="ts">
import { shallowRef, defineComponent, PropType } from 'vue';
import { MinusIcon } from '@heroicons/vue/24/solid';
import FdIcon from '../Icon';
import { slideInOutContent } from '../../utils';
import { Icon } from '../../types';

export default defineComponent({
  name: 'FdAccordion',
  components: {
    FdIcon,
  },
  props: {
    icon: {
      type: Function as PropType<Icon>,
      default: undefined,
    },
    id: {
      type: String,
      required: true,
    },
    open: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, { emit }) {
    const isOpen = shallowRef(props.open);
    const postText = shallowRef<HTMLDivElement | null>(null);

    function toggleAccordion() {
      emit('toggled', !isOpen.value);
      isOpen.value = !isOpen.value;
    }

    function onBeforeEnter(el: HTMLElement) {
      slideInOutContent('before-enter', el);
    }

    function onEnter(el: HTMLElement) {
      slideInOutContent('enter', el);
    }

    function onAfterEnter(el: HTMLElement) {
      slideInOutContent('after-enter', el);
    }

    function onBeforeLeave(el: HTMLElement) {
      slideInOutContent('before-leave', el);
    }

    function onLeave(el: HTMLElement) {
      slideInOutContent('leave', el);
    }

    function onAfterLeave(el: HTMLElement) {
      slideInOutContent('after-leave', el);
    }
    
    return {
      isOpen,
      onBeforeEnter,
      onEnter,
      onAfterEnter,
      onBeforeLeave,
      onLeave,
      onAfterLeave,
      toggleAccordion,
      MinusIcon,
    };
  },
  emits: ['toggled'],
});
</script>
<style lang="scss" scoped>
@import '@/styles/required';

.fd-accordion {
  &:last-of-type {
    border-bottom: 1px solid rgb(var(--fora_neutral), 1);
  }

  &__button {
    @include focus-primary;

    display: flex;
    gap: 0.5rem;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding: 0.75rem;
    border: none;
    background-color: #fff;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
      background-color: rgba(var(--fora_neutral_reduced--hover), 1);
    }
  }

  &__header {
    border-top: 1px solid rgb(var(--fora_neutral), 1);
  }

  &__icon {
    flex: 0 0 auto;
    height: 1.5rem;
    width: 1.5rem;
  }

  &__heading {
    flex: 1 1 100%;
    font-weight: $font-medium;
    text-align: left;
  }

  &__controller {
    flex: 0 0 auto;

    &-group {
      position: relative;
      height: 1.5rem;
      width: 1.5rem;

      & .fd-icon {
        position: absolute;
        left: 0;
        top: 0;
      }
    }
  }

  &__control-arm {
    transition: transform 0.3s ease;

    &--open {
      transform: rotate(90deg);
    }
  }

  &__content {
    padding: 0.25rem 0.75rem 1.5rem;
  }
}
</style>