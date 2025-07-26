<template>
  <div
    :id="id"
    class="fd-accordion"
    :class="{
      'fd-accordion--disabled': disabled,
      'fd-accordion--open': isOpen
    }"
  >
    <div class="fd-accordion__header">
      <button
        :id="`${id}__button`"
        class="fd-accordion__button"
        :aria-expanded="isOpen"
        :aria-controls="`${id}__content`"
        :disabled="disabled"
        type="button"
        @click.stop="toggleAccordion"
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
    <transition v-on="{ ...expandCollapse }">
      <div
        v-show="isOpen"
        :id="`${id}__content`"
        class="fd-accordion__content"
        :aria-labelledby="`${id}__button`"
        role="region"
      >
        <div
          ref="contentInner"
          class="fd-accordion__content-inner"
        >
          <slot />
        </div>
      </div>
    </transition>
  </div>
</template>
<script lang="ts">
import { shallowRef, defineComponent, PropType } from 'vue';
import { MinusIcon } from '@heroicons/vue/24/solid';
import FdIcon from '../Icon';
import { expandCollapse } from '../../utils';
import { Icon } from '../../types';

export default defineComponent({
  name: 'FdAccordion',
  components: {
    FdIcon,
  },
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
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
    const contentInner = shallowRef<HTMLDivElement | null>(null);

    function toggleAccordion() {
      if (props.disabled) return;

      emit('toggled', !isOpen.value);
      isOpen.value = !isOpen.value;
    }
    
    return {
      contentInner,
      expandCollapse,
      isOpen,
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
  background-color: rgba(var(--fora_accordion_bg), 1);
  
  &:last-of-type {
    border-bottom:  $accordion_border rgba(var(--fora_accordion_border-color));
  }

  &__button {
    @include focus-primary;

    display: flex;
    gap: $accordion_button_gap;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding: $accordion_button_padding;
    border: none;
    background-color: rgba(var(--fora_accordion_bg));
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
      background-color: rgba(var(--fora_accordion-header_bg--hover));
    }

    @include focus-primary;
  }

  &__header {
    border-top: $accordion_border rgb(var(--fora_accordion_border-color));
  }

  &__icon {
    color: rgba(var(--fora_accordion-header_icon_color));
    flex: 0 0 auto;
    height: $accordion_icon_size;
    width: $accordion_icon_size;
  }

  &__heading {
    color: rgba(var(--fora_accordion-header_title_color));
    flex: 1 1 100%;
    font-weight: $accordion_heading_font_weight;
    text-align: left;
  }

  &__controller {
    flex: 0 0 auto;

    &-group {
      color: rgba(var(--fora_accordion-header_toggle_color));
      position: relative;
      height: $accordion_controller_size;
      width: $accordion_controller_size;

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
    color: rgba(var(--fora_accordion_content_color));
    transition: height $accordion_transition_time ease;
  }

  &__content-inner {
    padding: $accordion_content_padding;
  }

  &--disabled {
    .fd-accordion__button {
      background-color: rgba(var(--fora_accordion-header_bg--disabled));
      pointer-events: none;
    }

    .fd-accordion__icon {
      color: rgba(var(--fora_accordion-header_icon_color--disabled));
    }

    .fd-accordion__heading {
      color: rgba(var(--fora_accordion-header_title_color--disabled));
    }

    .fd-accordion__controller-group {
      color: rgba(var(--fora_accordion-header_toggle_color--disabled));
    }

    .fd-accordion__content {
      color: rgba(var(--fora_accordion_content_color--disabled));
    }
  }
}
</style>