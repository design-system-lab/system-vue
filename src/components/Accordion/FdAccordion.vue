<template>
  <div
    :id="id"
    class="fd-accordion"
  >
    <div class="fd-accordion__header">
      <button
        :id="`${id}__button`"
        class="fd-accordion__button"
        :aria-expanded="modelValue"
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
            :model-value="modelValue"
          >
            <div class="fd-accordion__controller-group">
              <fd-icon :icon="MinusIcon" />
              <fd-icon class="fd-accordion__control-arm" :icon="MinusIcon" />
            </div>
          </slot>
        </div>
      </button>
    </div>
    <div
      :id="`${id}__content`"
      class="fd-accordion__content"
      :aria-labelledby="`${id}__button`"
      :hidden="contentHidden"
      role="region"
    >
      <slot />
    </div>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, PropType } from 'vue';
import { MinusIcon } from '@heroicons/vue/24/solid';
import FdIcon from '../Icon';
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
    modelValue: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, { emit }) {
    const contentHidden = computed(() => !props.modelValue);

    function toggleAccordion() {
      emit('update:modelValue', !props.modelValue);
    }
    
    return {
      contentHidden,
      toggleAccordion,
      MinusIcon,
    };
  },
  emits: ['update:modelValue'],
});
</script>
<style lang="scss" scoped>
@import '@/styles/required';

.fd-accordion {
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
}
</style>